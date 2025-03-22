
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { Validity, Category } from '../settings/types';

interface ValidityTableProps {
  validities: Validity[];
  categories: Category[];
  onEdit: (validity: Validity) => void;
  onDelete: (validity: Validity) => void;
}

export function ValidityTable({ validities, categories, onEdit, onDelete }: ValidityTableProps) {
  if (!validities.length) {
    return <div className="text-center py-4 text-gray-500">No validities found</div>;
  }

  const getCategoryNames = (categoryIds: string[]): string => {
    return categoryIds.map(id => {
      const category = categories.find(c => c.id === id);
      return category ? category.name : '';
    }).filter(Boolean).join(', ');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Applicable Categories</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {validities.map((validity) => (
          <TableRow key={validity.id}>
            <TableCell className="font-medium">{validity.name}</TableCell>
            <TableCell>
              {validity.duration} {validity.durationType}
            </TableCell>
            <TableCell>
              {getCategoryNames(validity.applicableToCategories)}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(validity)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(validity)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
