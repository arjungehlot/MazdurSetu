import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  User,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Clock,
} from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Profile Settings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Profile picture and basic info */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-4xl font-medium">
                      {profile?.name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profile?.name || "User"}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Full Name
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {profile?.name || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {profile?.phone || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {profile?.location || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Member Since
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {profile?.created_at
                          ? new Date(profile.created_at).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Edit profile form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  Edit Profile
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="fullName"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        defaultValue={profile?.name || ""}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        defaultValue={user.email || ""}
                        disabled
                        className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        defaultValue={profile?.phone || ""}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Location
                      </label>
                      <Input
                        id="location"
                        defaultValue={profile?.location || ""}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="bio"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Bio
                    </label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue={profile?.bio || ""}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>

                  <div className="pt-4 flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      className="border-gray-200 dark:border-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>

              {/* Password section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  Change Password
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="currentPassword"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Current Password
                      </label>
                      <Input
                        id="currentPassword"
                        type="password"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        New Password
                      </label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Confirm New Password
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      className="border-gray-200 dark:border-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
