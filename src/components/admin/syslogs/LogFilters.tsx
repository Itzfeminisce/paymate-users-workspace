import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Play, Pause, RefreshCcw } from 'lucide-react';
import { REFRESH_INTERVALS } from './types';

interface LogFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  logLevel: string;
  setLogLevel: (level: string) => void;
  autoRefresh: boolean;
  setAutoRefresh: (refresh: boolean) => void;
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
  fetchLogs: () => void;
}

export const LogFilters = ({
  searchTerm,
  setSearchTerm,
  logLevel,
  setLogLevel,
  autoRefresh,
  setAutoRefresh,
  refreshInterval,
  setRefreshInterval,
  fetchLogs,
}: LogFiltersProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={logLevel} onValueChange={setLogLevel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select log level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="error">Error</SelectItem>
          <SelectItem value="warn">Warning</SelectItem>
          <SelectItem value="info">Info</SelectItem>
          <SelectItem value="debug">Debug</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={autoRefresh ? 'bg-blue-50' : ''}
        >
          {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        {autoRefresh && (
          <Select
            value={String(refreshInterval)}
            onValueChange={(value) => setRefreshInterval(Number(value))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Refresh interval" />
            </SelectTrigger>
            <SelectContent>
              {REFRESH_INTERVALS.map((interval) => (
                <SelectItem key={interval.value} value={String(interval.value)}>
                  {interval.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <Button variant="outline" onClick={fetchLogs}>
        <RefreshCcw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};