import * as XLSX from 'xlsx';
import { LogEntry } from './types';

export const exportData = (logs: LogEntry[], format: 'csv' | 'xlsx') => {
  const exportData = logs.map((log) => ({
    Timestamp: log.timestamp,
    Level: log.level,
    Module: log.module,
    Message: log.message,
    Status: log.status,
    User: log.userId,
    Action: log.action,
    Details: JSON.stringify(log.details),
  }));

  if (format === 'xlsx') {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');
    XLSX.writeFile(wb, `logs_${new Date().toISOString()}.xlsx`);
  } else if (format === 'csv') {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `logs_${new Date().toISOString()}.csv`;
    link.click();
  }
};