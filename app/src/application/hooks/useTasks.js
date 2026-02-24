import { useCallback } from 'react';
import { useAppStore } from '../store';

/**
 * Hook for task management operations
 */
export function useTasks() {
  const tasks = useAppStore((state) => state.tasks);
  const setTasks = useAppStore((state) => state.setTasks);
  const createTask = useAppStore((state) => state.createTask);
  const updateTask = useAppStore((state) => state.updateTask);
  const moveTask = useAppStore((state) => state.moveTask);
  const selectedTask = useAppStore((state) => state.selectedTask);
  const setSelectedTask = useAppStore((state) => state.setSelectedTask);

  const totalTasks = Object.values(tasks).flat().length;
  const activeTasks = tasks.scheduled.length + tasks.queue.length + tasks.inProgress.length;

  const handleCreateTask = useCallback((taskData) => {
    const newTask = {
      id: `t${Date.now()}`,
      ...taskData,
    };
    createTask(newTask);
    return newTask;
  }, [createTask]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    const sourceTasks = [...tasks[sourceCol]];
    const [moved] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, moved);
      setTasks({ ...tasks, [sourceCol]: sourceTasks });
    } else {
      const destTasks = [...tasks[destCol]];
      destTasks.splice(destination.index, 0, moved);
      setTasks({ ...tasks, [sourceCol]: sourceTasks, [destCol]: destTasks });
    }
  }, [tasks, setTasks]);

  return {
    tasks,
    totalTasks,
    activeTasks,
    selectedTask,
    setSelectedTask,
    createTask: handleCreateTask,
    updateTask,
    moveTask,
    setTasks,
    handleDragEnd,
  };
}
