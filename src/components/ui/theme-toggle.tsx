import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        <Sun className="inline-block mr-2" /> Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        <Moon className="inline-block mr-2" /> Dark
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-lg ${theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        <Monitor className="inline-block mr-2" /> System
      </button>
    </div>
  );
};

export default ThemeToggle;