import { LogEntry } from './types';
import { mockLogs } from './mock';

export const fetchLogs = async (
  logLevel: string,
  searchTerm: string,
  sortColumn: string,
  sortDirection: 'asc' | 'desc',
  setLogs: (logs: LogEntry[]) => void,
  setLoading: (loading: boolean) => void,
  toast: any
) => {
  setLoading(true);
  try {
    const filtered = mockLogs
      .filter(
        (log) =>
          (logLevel === 'all' || log.level === logLevel) &&
          (searchTerm === '' ||
            Object.values(log).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          ))
      .sort((a, b) => {
        const aValue = a[sortColumn as keyof LogEntry];
        const bValue = b[sortColumn as keyof LogEntry];
        const direction = sortDirection === 'asc' ? 1 : -1;
        return String(aValue).localeCompare(String(bValue)) * direction;
      });

    setLogs(filtered);
    toast({
      title: 'Logs refreshed',
      description: `Successfully fetched ${filtered.length} logs`,
    });
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch logs',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
};