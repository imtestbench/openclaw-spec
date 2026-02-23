import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const columns = [
  { id: 'scheduled', title: '📅 Scheduled', color: 'border-t-purple-500' },
  { id: 'ready', title: '✅ Ready', color: 'border-t-green-500' },
  { id: 'queue', title: '📋 Queue', color: 'border-t-slate-500' },
  { id: 'inProgress', title: '🔄 In Progress', color: 'border-t-blue-500' },
  { id: 'review', title: '👀 Review', color: 'border-t-yellow-500' },
  { id: 'blocked', title: '🚫 Blocked', color: 'border-t-red-500' },
  { id: 'done', title: '✓ Done', color: 'border-t-emerald-500' },
];

export default function KanbanBoard({ tasks, setTasks }) {
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
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className={`flex-shrink-0 w-72 bg-slate-800/50 rounded-xl border-t-4 ${col.color}`}>
            <div className="p-3 border-b border-slate-700">
              <h3 className="font-semibold text-sm flex items-center justify-between">
                {col.title}
                <span className="bg-slate-700 px-2 py-0.5 rounded-full text-xs">{tasks[col.id]?.length || 0}</span>
              </h3>
            </div>
            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 min-h-[200px] space-y-2 ${snapshot.isDraggingOver ? 'bg-slate-700/30' : ''}`}
                >
                  {tasks[col.id]?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => <TaskCard task={task} provided={provided} />}
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
