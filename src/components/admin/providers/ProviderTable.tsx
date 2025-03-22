
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { Provider } from '../settings/types';

interface ProviderTableProps {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
}

export function ProviderTable({ providers, onEdit, onDelete }: ProviderTableProps) {
  if (!providers.length) {
    return <div className="text-center py-4 text-gray-500">No providers found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Support Email</TableHead>
          <TableHead>Support Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providers.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell className="font-medium">{provider.name}</TableCell>
            <TableCell>{provider.supportEmail || 'N/A'}</TableCell>
            <TableCell>{provider.supportPhone || 'N/A'}</TableCell>
            <TableCell>
              <Badge variant={provider.status === 'active' ? 'default' : 'secondary'}>
                {provider.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(provider)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(provider)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
