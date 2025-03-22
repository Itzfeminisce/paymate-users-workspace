
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Category } from '../settings/types';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  if (!categories.length) {
    return <div className="text-center py-4 text-gray-500">No categories found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead>Transaction Fee (%)</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.icon || 'None'}</TableCell>
            <TableCell>{category.transactionFee}%</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(category)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(category)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
