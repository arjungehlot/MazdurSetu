import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ApplicationsPage() {
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

  // Fetch applications based on user type
  let applications = [];
  let jobPosts = [];

  if (profile?.user_type === "employer") {
    // Fetch job posts created by this employer
    const { data: posts } = await supabase
      .from("job_posts")
      .select("*")
      .eq("employer_id", user.id);

    jobPosts = posts || [];

    // Fetch applications for these job posts
    if (jobPosts.length > 0) {
      const jobPostIds = jobPosts.map((post) => post.id);
      const { data: apps } = await supabase
        .from("applications")
        .select("*, job_posts(*), users(*)") // Join with job_posts and users tables
        .in("job_post_id", jobPostIds);

      applications = apps || [];
    }
  } else {
    // For workers, fetch their applications
    const { data: apps } = await supabase
      .from("applications")
      .select("*, job_posts(*)") // Join with job_posts table
      .eq("worker_id", user.id);

    applications = apps || [];
  }

  // Sample applications data if none exists
  const displayApplications = applications.length
    ? applications
    : [
        {
          id: "sample-1",
          status: "pending",
          created_at: new Date().toISOString(),
          message:
            "I have 5 years of experience in construction work and am available immediately.",
          job_posts: {
            id: "job-1",
            title: "Construction Workers Needed",
            location: "Bangalore, Karnataka",
            category: "Construction",
            rate: "₹600/day",
            duration: "1 week",
          },
          users: {
            id: "worker-1",
            name: "Rahul Singh",
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
            phone: "+91 98765 43210",
            rating: 4.8,
          },
        },
        {
          id: "sample-2",
          status: "accepted",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          message:
            "I'm experienced in deep cleaning and available on the requested dates.",
          job_posts: {
            id: "job-2",
            title: "House Cleaning Staff",
            location: "Bangalore, Karnataka",
            category: "Cleaning",
            rate: "₹450/day",
            duration: "2 days",
          },
          users: {
            id: "worker-2",
            name: "Priya Sharma",
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
            phone: "+91 98765 43211",
            rating: 4.6,
          },
        },
      ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              {profile?.user_type === "employer"
                ? "Job Applications"
                : "My Applications"}
            </h1>
          </div>

          {/* Search and filter bar */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Status</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Date</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Applications list */}
          <div className="space-y-6">
            {displayApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {application.job_posts.title}
                      </h2>
                      <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="mr-4">
                          {application.job_posts.location}
                        </span>
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="mr-4">
                          {application.job_posts.category}
                        </span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{application.job_posts.duration}</span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {application.job_posts.rate}
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(application.status)}`}
                        >
                          {getStatusLabel(application.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {profile?.user_type === "employer" && (
                    <div className="mt-4 flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mr-3">
                        <Image
                          src={
                            application.users.avatar_url ||
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                          }
                          alt={application.users.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {application.users.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="mr-2">
                            {application.users.phone}
                          </span>
                          {application.users.rating && (
                            <span className="flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              {application.users.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      {application.message}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {profile?.user_type === "employer" &&
                      application.status === "pending" && (
                        <>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    <Link
                      href={
                        profile?.user_type === "employer"
                          ? `/dashboard/workers/${application.users.id}`
                          : `/dashboard/job-posts/${application.job_posts.id}`
                      }
                    >
                      <Button variant="outline">
                        {profile?.user_type === "employer"
                          ? "View Worker Profile"
                          : "View Job Details"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayApplications.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Applications Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {profile?.user_type === "employer"
                  ? "You haven't received any applications yet"
                  : "You haven't applied to any jobs yet"}
              </p>
              {profile?.user_type === "worker" && (
                <Link href="/dashboard/workers">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse Available Jobs
                  </Button>
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function getStatusStyles(status: string) {
  switch (status) {
    case "accepted":
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
    case "rejected":
      return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
    case "pending":
    default:
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "pending":
    default:
      return "Pending";
  }
}
