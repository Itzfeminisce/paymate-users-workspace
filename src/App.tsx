
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import PaymentMethods from "./pages/PaymentMethods";
import Appearance from "./pages/Appearance";
import Messages from "./pages/Messages";
import { useEffect } from "react";
import Services from "./pages/Services";
import { ThemeProvider } from "./context/ThemeContext";
import FundWallet from "./pages/FundWallet";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthGuard from "./context/AuthGuard";
import Contact from "./pages/Contact";
import Referrals from "./pages/Referrals";
import { usePlatformConfigQuery } from "./hooks/api-hooks";
import { PlatformConfigProvider } from "./context/PlatformConfigContext";

const queryClient = new QueryClient();

const App = () => {
  const title = import.meta.env.VITE_APP_TITLE;

  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlatformConfigProvider>
          <AuthProvider>
            <ThemeProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Protected Routes - wrapped in AuthGuard */}
                  <Route element={<AuthGuard />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/payment-methods" element={<PaymentMethods />} />
                    <Route path="/appearance" element={<Appearance />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/fund-wallet/:reference?" element={<FundWallet />} />
                    <Route path="/referrals" element={<Referrals />} />
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ThemeProvider>
          </AuthProvider>
        </PlatformConfigProvider>
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App;
