import { Calendar, ExternalLink } from 'lucide-react';

export default function TaskCard({ task, provided, onClick }) {
  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      onClick={() => onClick?.(task)}
      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 shadow-sm hover:shadow transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h4>
        <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div 
          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-medium"
          style={{ backgroundColor: task.agentColor }}
        >
          {task.agent[0]}
        </div>
        <span>{task.agent}</span>
        
        {task.scheduledTime && (
          <>
            <Calendar className="w-3 h-3 ml-1" />
            <span>{task.scheduledTime}</span>
          </>
        )}
      </div>
    </div>
  );
}
