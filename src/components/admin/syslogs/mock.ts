import { format, subMinutes, subHours, subDays } from 'date-fns';
import { LogEntry } from './types';

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    level: 'info',
    module: 'auth',
    message: 'User logged in successfully',
    details: { ip: '192.168.1.1', browser: 'Chrome' },
    userId: 'user123',
    action: 'LOGIN',
    status: 'success'
  },
  {
    id: '2',
    timestamp: format(subMinutes(new Date(), 5), 'yyyy-MM-dd HH:mm:ss'),
    level: 'error',
    module: 'services',
    message: 'Failed to process transaction',
    details: { 
      transactionId: 'tx123',
      error: 'Insufficient funds'
    },
    userId: 'user456',
    action: 'PAYMENT',
    status: 'failure'
  },
  {
    id: '3',
    timestamp: format(subHours(new Date(), 1), 'yyyy-MM-dd HH:mm:ss'),
    level: 'warn',
    module: 'system',
    message: 'High CPU usage detected',
    details: { 
      cpu: '85%',
      memory: '70%'
    },
    action: 'SYSTEM_MONITOR',
    status: 'pending'
  },
  {
    id: '4',
    timestamp: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss'),
    level: 'debug',
    module: 'api',
    message: 'API request completed',
    details: { 
      endpoint: '/api/users',
      method: 'GET',
      duration: '123ms'
    },
    userId: 'user789',
    action: 'API_REQUEST',
    status: 'success'
  }
];