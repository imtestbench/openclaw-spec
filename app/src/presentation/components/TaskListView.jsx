import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/presentation/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table';

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  queue: { label: 'Queue', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  inProgress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  done: { label: 'Done', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

export default function TaskListView({ tasks, onTaskClick }) {
  // Flatten all tasks with their status
  const allTasks = Object.entries(tasks).flatMap(([status, taskList]) =>
    taskList.map(task => ({ ...task, status }))
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="dark:border-gray-700">
            <TableHead className="dark:text-gray-400">Task</TableHead>
            <TableHead className="dark:text-gray-400">Agent</TableHead>
            <TableHead className="dark:text-gray-400">Status</TableHead>
            <TableHead className="dark:text-gray-400">Scheduled</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTasks.map((task) => (
            <TableRow 
              key={task.id} 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-700"
              onClick={() => onTaskClick?.(task)}
            >
              <TableCell className="font-medium dark:text-white">{task.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: task.agentColor }}
                  >
                    {task.agent[0]}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">{task.agent}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusConfig[task.status]?.color}>
                  {statusConfig[task.status]?.label}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {task.scheduledTime || '—'}
              </TableCell>
              <TableCell>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
