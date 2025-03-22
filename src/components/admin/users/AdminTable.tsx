
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Admin } from './types';

interface AdminTableProps {
  admins: Admin[];
  onDelete: (admin: Admin) => void;
}

export function AdminTable({ admins, onDelete }: AdminTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell>{admin.name}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {admin.role}
              </span>
            </TableCell>
            <TableCell>{admin.lastLogin}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" onClick={() => onDelete(admin)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
