import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FundingFormValues } from "./types";

interface ConfirmationDialogProps {
  showConfirmDialog: boolean;
  setShowConfirmDialog: (show: boolean) => void;
  form: UseFormReturn<FundingFormValues>;
  paymentMethod: string | null;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  showConfirmDialog,
  setShowConfirmDialog,
  form,
  paymentMethod,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            You are about to fund your wallet with ₦{form.getValues().amount || '0.00'}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold">₦{form.getValues().amount || '0.00'}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-semibold capitalize">{paymentMethod}</span>
          </div>
          
          {form.getValues().note && (
            <div>
              <span className="text-muted-foreground block mb-1">Note</span>
              <p className="text-sm">{form.getValues().note}</p>
            </div>
          )}
          
          <div className="rounded-md bg-amber-50 p-3 border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800">Important</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Funding your wallet is subject to our terms and conditions. By proceeding, 
                  you agree to these terms.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 