import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/utils";
import { Referral } from "@/hooks/api-hooks";

interface ReferralTableProps {
  referrals: Referral[];
  isLoading: boolean;
}

export const ReferralTable = ({ referrals, isLoading }: ReferralTableProps) => {
  if (isLoading) {
    return <ReferralTableSkeleton />;
  }

  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Reward</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {referrals.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">No referrals yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share your referral link with friends to start earning rewards!
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}

          
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {referral.profilePicture ? (
                    <img
                      src={referral.profilePicture}
                      alt={referral.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {referral.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {referral.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <ReferralStatus status={referral.status} />
              </TableCell>
              <TableCell>
                {formatDate(new Date(referral.created_at))}
              </TableCell>
              <TableCell>{"Hidden"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ReferralStatus = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
  }[status];

  return (
    <Badge variant="outline" className={styles}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const ReferralTableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
); 