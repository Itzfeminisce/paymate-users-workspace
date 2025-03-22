
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from '@/components/layout/Container';
import Sidebar from '@/components/layout/Sidebar';
import AdminServices from '@/components/admin/AdminServices';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-6">
              <AdminServices />
            </TabsContent>
            
            <TabsContent value="users" className="mt-6">
              <AdminUsers />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
