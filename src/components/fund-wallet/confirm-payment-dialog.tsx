import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FundingFormValues } from "./types";
import { formatCurrency } from "@/utils/utils";

interface VerificationDialogProps {
    isOpen: boolean;
    status: 'verifying' | 'success' | 'error';
    reference?: string;
    form: UseFormReturn<FundingFormValues>;
    onClose?: () => void;
}

export function ConfirmPaymentDialog({ 
    isOpen, 
    status, 
    reference, 
    form,
    onClose 
}: VerificationDialogProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    useEffect(() => {
        if (status !== 'verifying' && progress === 100) {
            const timer = setTimeout(() => {
                onClose?.();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [status, progress, onClose]);

    const getIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="h-14 w-14 text-green-500" />;
            case 'error':
                return <XCircle className="h-14 w-14 text-red-500" />;
            default:
                return (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader2 className="h-14 w-14 text-primary" />
                    </motion.div>
                );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose?.()}>
            <DialogContent className="sm:max-w-md">
                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="relative"
                    >
                        {getIcon()}
                    </motion.div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold">
                            {status === 'success' ? 'Payment Successful!' : 
                             status === 'error' ? 'Verification Failed' : 
                             'Verifying Payment...'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {status === 'success' ? 'Your wallet has been funded' :
                             status === 'error' ? 'Please contact support' :
                             'Please wait while we confirm your payment'}
                        </p>
                    </div>

                    {/* Transaction Details */}
                    {reference && form.getValues("amount") && (
                        <div className="w-full p-3 bg-muted/50 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Reference:</span>
                                <span className="font-medium">{reference}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Amount:</span>
                                <span className="font-medium">{ formatCurrency(form.getValues("amount")) }</span>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}