export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  module: string;
  message: string;
  details?: Record<string, unknown>;
  userId?: string;
  action?: string;
  status?: 'success' | 'failure' | 'pending';
}

export interface Column {
  id: string;
  label: string;
  width?: number;
  sortable?: boolean;
  hidden?: boolean;
}

export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  columns: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  filename?: string;
}

export interface RefreshInterval {
  value: number;
  label: string;
}

export const REFRESH_INTERVALS: RefreshInterval[] = [
  { value: 15, label: '15 seconds' },
  { value: 30, label: '30 seconds' },
  { value: 60, label: '1 minute' },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];