import { z } from "zod";



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
  isEditing?: boolean; // Optional field to track if a log is being edited
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



// Form schema for customers
export const logSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  level: z.string().min(1, 'Level is required'),
  module: z.string().min(1, 'Module is required'),
});


export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export type LogFormValues = z.infer<typeof logSchema>;