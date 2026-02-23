import { Clock, DollarSign } from 'lucide-react';

const priorityColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500',
};

export default function TaskCard({ task, provided }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-slate-700 rounded-lg p-3 border-l-4 ${priorityColors[task.priority]} hover:bg-slate-650 cursor-grab active:cursor-grabbing`}
    >
      <h4 className="font-medium text-sm mb-2">{task.title}</h4>
      
      <div className="text-xs text-slate-400 space-y-1">
        <div>Agent: <span className="text-cyan-400">{task.agent}</span></div>
        
        {task.progress > 0 && task.progress < 100 && (
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-600">
          {task.eta !== null && task.eta > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{task.eta}m</span>
            </div>
          )}
          {task.scheduledTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{task.scheduledTime}</span>
            </div>
          )}
          {task.cost > 0 && (
            <div className="flex items-center gap-1 text-green-400">
              <DollarSign className="w-3 h-3" />
              <span>{task.cost.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
