import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function JobPostDetailPage({
  params,
}: {
  params: { id: string };
}) {
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

  // Fetch job post details
  const { data: jobPost } = await supabase
    .from("job_posts")
    .select("*")
    .eq("id", params.id)
    .single();

  // If job post doesn't exist, use sample data
  const displayJobPost = jobPost || {
    id: params.id,
    title: "Construction Workers Needed",
    location: "Bangalore, Karnataka",
    category: "Construction",
    rate: "₹600/day",
    duration: "1 week",
    status: "active",
    created_at: new Date().toISOString(),
    description:
      "Looking for experienced construction workers for a residential project. The work involves masonry, painting, and basic construction tasks.",
    requirements:
      "Experience in masonry, painting, and basic construction work. Must be able to work full days and have own basic tools.",
  };

  // Fetch applications count for this job post
  const { count } = await supabase
    .from("applications")
    .select("*", { count: "exact" })
    .eq("job_post_id", params.id);

  const applicationsCount = count || 0;

  // Check if the current user (if worker) has already applied
  let hasApplied = false;
  if (profile?.user_type === "worker") {
    const { data: application } = await supabase
      .from("applications")
      .select("*")
      .eq("job_post_id", params.id)
      .eq("worker_id", user.id)
      .single();

    hasApplied = !!application;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <div className="mb-6">
            <Link
              href={
                profile?.user_type === "employer"
                  ? "/dashboard/job-posts"
                  : "/dashboard"
              }
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {profile?.user_type === "employer"
                ? "Back to Job Posts"
                : "Back to Dashboard"}
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {displayJobPost.title}
                  </h1>
                  <div className="flex flex-wrap items-center mt-2 text-gray-500 dark:text-gray-400 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{displayJobPost.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{displayJobPost.category}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{displayJobPost.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {displayJobPost.rate}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${displayJobPost.status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}
                    >
                      {displayJobPost.status === "active" ? "Active" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Job Description
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {displayJobPost.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Requirements
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {displayJobPost.requirements}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Job Details
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Posted On
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(
                              displayJobPost.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Duration
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {displayJobPost.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Location
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {displayJobPost.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Category
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {displayJobPost.category}
                          </p>
                        </div>
                      </div>

                      {profile?.user_type === "employer" && (
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Applications
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {applicationsCount} received
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {profile?.user_type === "worker" && (
                      <div className="mt-6">
                        {hasApplied ? (
                          <Button disabled className="w-full bg-green-600">
                            Application Submitted
                          </Button>
                        ) : (
                          <Link
                            href={`/dashboard/job-posts/${params.id}/apply`}
                          >
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              Apply for this Job
                            </Button>
                          </Link>
                        )}
                      </div>
                    )}

                    {profile?.user_type === "employer" && (
                      <div className="mt-6 space-y-3">
                        <Link
                          href={`/dashboard/job-posts/${params.id}/applications`}
                        >
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            <FileText className="h-4 w-4 mr-2" />
                            View Applications
                          </Button>
                        </Link>
                        <Link href={`/dashboard/job-posts/${params.id}/edit`}>
                          <Button variant="outline" className="w-full">
                            Edit Job Post
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
