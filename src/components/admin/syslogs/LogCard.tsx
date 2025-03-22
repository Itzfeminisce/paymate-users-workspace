import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogFilters } from './LogFilters';
import { LogTable } from './LogTable';
import { LogExport } from './LogExport';
import { Pagination } from './Pagination';
import { LogEntry } from './types';

interface LogCardProps {
  logs: LogEntry[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  logLevel: string;
  setLogLevel: (level: string) => void;
  autoRefresh: boolean;
  setAutoRefresh: (refresh: boolean) => void;
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
  fetchLogs: () => void;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  handleSort: (column: string) => void;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
}

export const LogCard = ({
  logs,
  loading,
  searchTerm,
  setSearchTerm,
  logLevel,
  setLogLevel,
  autoRefresh,
  setAutoRefresh,
  refreshInterval,
  setRefreshInterval,
  fetchLogs,
  sortColumn,
  sortDirection,
  handleSort,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalPages,
}: LogCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>View and manage system activity logs</CardDescription>
          </div>
          <LogFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            logLevel={logLevel}
            setLogLevel={setLogLevel}
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            fetchLogs={fetchLogs}
          />
          <LogExport logs={logs} />
        </div>
      </CardHeader>
      <CardContent>
        <LogTable
          logs={logs}
          loading={loading}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={totalPages}
        />
      </CardContent>
    </Card>
  );
};