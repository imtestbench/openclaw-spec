import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const columns = [
  { id: 'scheduled', title: 'Scheduled', color: '#9ca3af' },
  { id: 'queue', title: 'Queue', color: '#06b6d4' },
  { id: 'inProgress', title: 'In Progress', color: '#eab308' },
  { id: 'done', title: 'Done', color: '#22c55e' },
];

export default function KanbanBoard({ tasks, setTasks, onTaskClick }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-72">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: col.color }}
              />
              <h3 className="font-medium text-gray-700 dark:text-gray-300">{col.title}</h3>
              <span className="text-gray-400 text-sm">{tasks[col.id]?.length || 0}</span>
            </div>
            
            {/* Drop Zone Indicator */}
            <div 
              className="h-1 rounded-full mb-3"
              style={{ backgroundColor: col.color + '40' }}
            />

            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[300px] space-y-2 rounded-lg p-2 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-cyan-50 dark:bg-cyan-900/20' : ''
                  }`}
                >
                  {tasks[col.id]?.length === 0 && !snapshot.isDraggingOver && (
                    <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">No tasks</p>
                  )}
                  {tasks[col.id]?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskCard 
                          task={task} 
                          provided={provided} 
                          onClick={onTaskClick}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
