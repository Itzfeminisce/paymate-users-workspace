import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogEntry } from './types';
import { getLevelColor, getStatusColor } from './logUtils';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface LogTableProps {
    logs: LogEntry[];
    loading: boolean;
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    handleSort: (column: string) => void;
    onEditLog: (log: LogEntry) => void;
    onDeleteLog: (id: string) => void;
  }

  export const LogTable = ({
    logs,
    loading,
    sortColumn,
    sortDirection,
    handleSort,
    onEditLog,
    onDeleteLog,
  }: LogTableProps) => {
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
            <TableHead>Module</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Actions</TableHead> {/* New column for edit/delete */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.level}</TableCell>
              <TableCell>{log.module}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.status}</TableCell>
              <TableCell>{log.userId || '-'}</TableCell>
              <TableCell>{log.action || '-'}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onEditLog(log)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDeleteLog(log.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };