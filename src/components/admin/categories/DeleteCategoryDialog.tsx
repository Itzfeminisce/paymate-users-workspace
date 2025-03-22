
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export function DeleteCategoryDialog({ isOpen, onOpenChange, onDelete }: DeleteCategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Delete Category
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be undone.
            All services associated with this category will need to be reassigned.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
