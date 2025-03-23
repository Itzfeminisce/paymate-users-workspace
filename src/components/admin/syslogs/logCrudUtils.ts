import { LogEntry } from './types';
import { mockLogs } from './mock';

// Create a new log
export const createLog = (log: Omit<LogEntry, 'id' | 'timestamp'>): LogEntry => {
  const newLog: LogEntry = {
    id: String(Math.random().toString(36).substr(2, 9)), // Generate a unique ID
    timestamp: new Date().toISOString(),
    ...log,
  };
  mockLogs.unshift(newLog); // Add to the beginning of the array
  return newLog;
};

// Update an existing log
export const updateLog = (id: string, updatedLog: Partial<LogEntry>): LogEntry | null => {
  const index = mockLogs.findIndex((log) => log.id === id);
  if (index !== -1) {
    mockLogs[index] = { ...mockLogs[index], ...updatedLog };
    return mockLogs[index];
  }
  return null;
};

// Delete a log
export const deleteLog = (id: string): boolean => {
  const index = mockLogs.findIndex((log) => log.id === id);
  if (index !== -1) {
    mockLogs.splice(index, 1);
    return true;
  }
  return false;
};