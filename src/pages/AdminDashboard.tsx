
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from '@/components/layout/Container';
import Sidebar from '@/components/layout/Sidebar';
import AdminServices from '@/components/admin/AdminServices';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminCategories from '@/components/admin/categories/AdminCategories';
import AdminProviders from '@/components/admin/providers/AdminProviders';
import AdminValidity from '@/components/admin/validity/AdminValidity';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLogs from '@/components/admin/syslogs/AdminLogs';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
    // In a real app, you would also check if the user has admin role
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Sidebar />
      <Container
        title="Admin Dashboard"
        description="Manage your VTU platform services, users, and settings"
        className="pt-16 md:pt-0"
      >
        <div className="mt-8">
          <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="validity">Validity</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="logs">System Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-6">
              <AdminServices />
            </TabsContent>

            <TabsContent value="categories" className="mt-6">
              <AdminCategories />
            </TabsContent>

            <TabsContent value="providers" className="mt-6">
              <AdminProviders />
            </TabsContent>

            <TabsContent value="validity" className="mt-6">
              <AdminValidity />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <AdminUsers />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <AdminSettings />
            </TabsContent>

            <TabsContent value="logs" className="mt-6">
              <AdminLogs />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
