import { Button } from '@/components/ui/button';
import { File, FileSpreadsheet } from 'lucide-react';
import { exportData } from './exportUtils';
import { LogEntry } from './types';

interface LogExportProps {
  logs: LogEntry[];
}

export const LogExport = ({ logs }: LogExportProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => exportData(logs, 'xlsx')}>
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        XLSX
      </Button>
      <Button variant="outline" onClick={() => exportData(logs, 'csv')}>
        <File className="h-4 w-4 mr-2" />
        CSV
      </Button>
    </div>
  );
};