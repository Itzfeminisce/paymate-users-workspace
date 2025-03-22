import { useEffect, useState, useCallback, useRef } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { LogCard } from './LogCard';
import { fetchLogs } from './fetchLogs';
import { DEFAULT_PAGE_SIZE, LogEntry, REFRESH_INTERVALS } from './types';

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [logLevel, setLogLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortColumn, setSortColumn] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(REFRESH_INTERVALS[0].value);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const refreshTimerRef = useRef<number>();
  const { toast } = useToast();

  const handleFetchLogs = useCallback(() => {
    fetchLogs(logLevel, searchTerm, sortColumn, sortDirection, setLogs, setLoading, toast);
    setLastRefresh(new Date());
  }, [logLevel, searchTerm, sortColumn, sortDirection, toast]);

  useEffect(() => {
    handleFetchLogs();
  }, [handleFetchLogs]);

  useEffect(() => {
    if (autoRefresh) {
      refreshTimerRef.current = window.setInterval(handleFetchLogs, refreshInterval * 1000);
    }
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, handleFetchLogs]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(logs.length / pageSize);

  return (
    <LogCard
      logs={paginatedLogs}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      logLevel={logLevel}
      setLogLevel={setLogLevel}
      autoRefresh={autoRefresh}
      setAutoRefresh={setAutoRefresh}
      refreshInterval={refreshInterval}
      setRefreshInterval={setRefreshInterval}
      fetchLogs={handleFetchLogs}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      handleSort={handleSort}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      totalPages={totalPages}
    />
  );
}