import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PAGE_SIZE_OPTIONS } from './types';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
}

export const Pagination = ({ page, setPage, pageSize, setPageSize, totalPages }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Select
        value={String(pageSize)}
        onValueChange={(value) => {
          setPageSize(Number(value));
          setPage(1);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Page size" />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size} rows
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span className="mx-4">
          Page {page} of {totalPages}
        </span>
        <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};