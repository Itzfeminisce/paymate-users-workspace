import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogEntry } from './types';
import { getLevelColor, getStatusColor } from './logUtils';

interface LogTableProps {
  logs: LogEntry[];
  loading: boolean;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (column: string) => void;
}

export const LogTable = ({ logs, loading, sortColumn, sortDirection, handleSort }: LogTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer" onClick={() => handleSort('timestamp')}>
            Timestamp
            {sortColumn === 'timestamp' && (
              <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
            )}
          </TableHead>
          <TableHead>Level</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('module')}>
            Module
            {sortColumn === 'module' && (
              <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
            )}
          </TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              Loading logs...
            </TableCell>
          </TableRow>
        ) : logs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              No logs found
            </TableCell>
          </TableRow>
        ) : (
          logs.map((log) => (
            <TableRow key={log.id} className="hover:bg-gray-50 transition-colors">
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                  {log.level}
                </span>
              </TableCell>
              <TableCell>{log.module}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>
                {log.status && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                )}
              </TableCell>
              <TableCell>{log.userId || '-'}</TableCell>
              <TableCell>{log.action || '-'}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};