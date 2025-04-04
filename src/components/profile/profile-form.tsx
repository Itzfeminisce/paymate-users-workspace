import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./types";
import GlassCard from "@/components/ui/GlassCard";
import { ProfileAvatar } from "./profile-avatar";
import { useAuth } from "@/context/AuthContext";
import React from "react";
interface ProfileFormProps {
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => void;
  initials: string;
  isPending: boolean;
}

export function ProfileForm({ form, onSubmit, initials, isPending }: ProfileFormProps) {
  const { user } = useAuth();
  // we need to preview the image before it is uploaded
  const [previewImage, setPreviewImage] = React.useState<string | null>(
    user?.profilePicture || null
  );

  // Reset form values when user changes to prevent losing context on rerender
  React.useEffect(() => {
    if (user) {
      form.reset({
        phone_number: user.phone_number || '',
        profilePicture: form.getValues().profilePicture
      });
    }
  }, [user, form]);

  // Handle image upload and preview
  const handleImageUpload = (file: File | null) => {
    form.setValue("profilePicture", file);
    
    // Create preview URL for the uploaded image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(user?.profilePicture || null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <GlassCard className="p-8">
          <div className="flex flex-col items-center md:flex-row gap-8">
            <ProfileAvatar
              isPending={isPending}
              imageUrl={ user?.profilePicture || previewImage }
              initials={initials}
              onImageUpload={handleImageUpload}
            />

            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <FormLabel>Full Name</FormLabel>
                  <Input 
                    value={user?.name || ''} 
                    readOnly 
                    className="bg-gray-50" 
                  />
                </div>

                <div className="flex flex-col">
                  <FormLabel>Email Address</FormLabel>
                  <Input 
                    value={user?.email || ''} 
                    readOnly 
                    className="bg-gray-50" 
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Add your phone number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <Input value={user?.id} readOnly className="bg-gray-50" />
                </FormItem>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isPending}>Save Changes</Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </form>
    </Form>
  );
} 