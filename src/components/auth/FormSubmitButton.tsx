
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormSubmitButtonProps {
  isLoading: boolean;
  label: string;
}

export default function FormSubmitButton({ isLoading, label }: FormSubmitButtonProps) {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {label}
    </Button>
  );
}
