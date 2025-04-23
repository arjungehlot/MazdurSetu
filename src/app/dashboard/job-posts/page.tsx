import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  Users,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default async function JobPostsPage() {
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

  // Redirect workers to applications page
  if (profile?.user_type === "worker") {
    return redirect("/dashboard/applications");
  }

  // Fetch job posts created by this employer
  const { data: jobPosts } = await supabase
    .from("job_posts")
    .select("*")
    .eq("employer_id", user.id)
    .order("created_at", { ascending: false });

  // Sample job posts data if none exists
  const displayJobPosts = jobPosts?.length
    ? jobPosts
    : [
        {
          id: "sample-1",
          title: "Construction Workers Needed",
          location: "Bangalore, Karnataka",
          category: "Construction",
          rate: "₹600/day",
          duration: "1 week",
          status: "active",
          applications: 5,
          created_at: new Date().toISOString(),
          description:
            "Looking for experienced construction workers for a residential project.",
          requirements:
            "Experience in masonry, painting, and basic construction work.",
        },
        {
          id: "sample-2",
          title: "House Cleaning Staff",
          location: "Bangalore, Karnataka",
          category: "Cleaning",
          rate: "₹450/day",
          duration: "2 days",
          status: "active",
          applications: 3,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          description: "Need cleaning staff for a 3BHK apartment.",
          requirements: "Experience in deep cleaning and sanitization.",
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
              Job Posts
            </h1>

            <div className="flex gap-3">
              <Link href="/dashboard/job-posts/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Job Post
                </Button>
              </Link>
            </div>
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
                  placeholder="Search job posts..."
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

          {/* Job posts list */}
          <div className="space-y-6">
            {displayJobPosts.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {job.title}
                      </h2>
                      <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="mr-4">{job.location}</span>
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="mr-4">{job.category}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="mr-6">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {job.rate}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{job.applications} applications</span>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${job.status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                        >
                          {job.status === "active" ? "Active" : "Closed"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {job.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/dashboard/job-posts/${job.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                    <Link href={`/dashboard/job-posts/${job.id}/edit`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Link href={`/dashboard/job-posts/${job.id}/applications`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Applications
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayJobPosts.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Job Posts Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first job post to start hiring workers
              </p>
              <Link href="/dashboard/job-posts/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Job Post
                </Button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
