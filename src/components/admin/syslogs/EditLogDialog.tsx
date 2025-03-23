import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogFormFields } from './DialogFormFields';
import { LogEntry, LogFormValues, logSchema } from './types';
import { useEffect } from 'react';


interface AddServiceDialogProps {
  isOpen: boolean;
  currentLog: LogEntry | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LogEntry) => void;
}

export function EditLogDialog({ isOpen, currentLog, onOpenChange, onSubmit }: AddServiceDialogProps) {

  const form = useForm<LogFormValues>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      message: "",
      module: "",
      level: "warn",
    },
  });

  useEffect(() => {
    if (currentLog) {
      form.reset({
        level: currentLog.level,
        message: currentLog.message,
        module: currentLog.module,
      });
    }
  }, [currentLog, form]);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Edit Log
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the details to edit log.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogFormFields form={form} />
            <DialogFooter>
              <Button type="submit">Edit Log</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}