import { handleAxiosError, ErrorCodes, ToastVariant } from "../utils/axios-error";
import { useToast } from "@/hooks/use-toast";
import { ToastAction, ToastActionElement } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";



interface ToastConfig {
    title: string;
    description: string;
    variant?: ToastVariant;
    action?: React.ReactNode;
  }

  
// Example usage with custom hooks:
export const useApiError = () => {
    const { toast } = useToast();
    const handleError = (error: unknown) => {
      const errorResponse = handleAxiosError(error);
  
      // Don't show toast for transaction errors as they're handled separately
      if (!errorResponse.code.startsWith('ERR_TRANSACTION')) {
        toast({
          title: errorResponse.title,
          description: errorResponse.message,
          variant: errorResponse.variant,
          action: errorResponse.action ? (
            <ToastAction altText={errorResponse.action}>
              {errorResponse.action}
            </ToastAction>
          ) : undefined
        });
      }
  
      return errorResponse;
    };
  
    return { handleError };
  };
  
  // Example usage with transaction-specific error handling:
  export const useTransactionError = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
  
    const handleTransactionError = (
      error: unknown,
      options?: {
        onAddFunds?: () => void;
        onRetry?: () => void;
        onNewTransaction?: () => void;
        onViewHistory?: () => void;
      }
    ) => {
      const errorResponse = handleAxiosError(error);
      const defaultActions = {
        onAddFunds: () => navigate('/wallet/fund'),
        onRetry: () => window.location.reload(),
        onNewTransaction: () => navigate('/transactions/new'),
        onViewHistory: () => navigate('/transactions'),
      };
  
      const actions = { ...defaultActions, ...options };
  
      const toastConfig: ToastConfig = {
        title: errorResponse.title,
        description: errorResponse.message,
        variant: errorResponse.variant,
      };
  
      switch (errorResponse.code) {
        case ErrorCodes.INSUFFICIENT_FUNDS:
          toastConfig.action = (
            <ToastAction altText="Add Funds" onClick={actions.onAddFunds}>
              Add Funds
            </ToastAction>
          );
          break;
  
        case ErrorCodes.PAYMENT_FAILED:
          toastConfig.action = (
            <ToastAction altText="Try Again" onClick={actions.onRetry}>
              Try Again
            </ToastAction>
          );
          break;
  
        case ErrorCodes.TRANSACTION_EXPIRED:
        case ErrorCodes.TRANSACTION_CANCELLED:
          toastConfig.action = (
            <ToastAction altText="New Transaction" onClick={actions.onNewTransaction}>
              New Transaction
            </ToastAction>
          );
          break;
  
        case ErrorCodes.DUPLICATE_TRANSACTION:
          toastConfig.action = (
            <ToastAction altText="View History" onClick={actions.onViewHistory}>
              View History
            </ToastAction>
          );
          break;
  
        case ErrorCodes.TRANSACTION_VERIFICATION_FAILED:
          toastConfig.action = (
            <ToastAction altText="Try Again" onClick={actions.onRetry}>
              Try Again
            </ToastAction>
          );
          break;
  
        default:
          if (errorResponse.code.startsWith('ERR_TRANSACTION')) {
            toastConfig.action = (
              <ToastAction altText="Try Again" onClick={actions.onRetry}>
                Try Again
              </ToastAction>
            );
          }
      }
  
      // Apply the toast with the configured action
      toast({
        title: toastConfig.title,
        description: toastConfig.description,
        variant: toastConfig.variant,
        action: toastConfig.action as ToastActionElement
      });
      return errorResponse;
    };
  
    return { handleTransactionError };
  };
  
  