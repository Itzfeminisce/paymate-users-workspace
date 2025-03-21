
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ControllerRenderProps } from 'react-hook-form';

interface PasswordToggleProps {
  field: ControllerRenderProps<any, any>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export default function PasswordToggle({ 
  field, 
  showPassword, 
  togglePasswordVisibility 
}: PasswordToggleProps) {
  return (
    <div className="relative">
      <Input 
        type={showPassword ? "text" : "password"} 
        placeholder="••••••••" 
        {...field} 
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={togglePasswordVisibility}
        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  );
}
