"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../../../supabase/client";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Briefcase, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function ApplyJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [jobPost, setJobPost] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Check if user is logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
        return;
      }
      setUser(user);

      // Fetch user profile
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profile);

      // Redirect employers to job posts page
      if (profile?.user_type === "employer") {
        router.push("/dashboard/job-posts");
        return;
      }

      // Fetch job post details
      const { data: jobPost } = await supabase
        .from("job_posts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (jobPost) {
        setJobPost(jobPost);
      } else {
        // Use sample data if job post doesn't exist
        setJobPost({
          id: params.id,
          title: "Construction Workers Needed",
          location: "Bangalore, Karnataka",
          category: "Construction",
          rate: "₹600/day",
          duration: "1 week",
          status: "active",
          created_at: new Date().toISOString(),
          description:
            "Looking for experienced construction workers for a residential project.",
          requirements:
            "Experience in masonry, painting, and basic construction work.",
        });
      }

      // Check if user has already applied
      const { data: application } = await supabase
        .from("applications")
        .select("*")
        .eq("job_post_id", params.id)
        .eq("worker_id", user.id)
        .single();

      if (application) {
        setHasApplied(true);
        setMessage(application.message || "");
      }
    };

    fetchData();
  }, [params.id, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.from("applications").insert([
        {
          job_post_id: params.id,
          worker_id: user.id,
          message,
          status: "pending",
        },
      ]);

      if (error) throw error;

      router.push(`/dashboard/job-posts/${params.id}?success=true`);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !jobPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <div className="mb-6">
            <Link
              href={`/dashboard/job-posts/${params.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Job Details
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Apply for: {jobPost.title}
                </h1>
                <div className="flex flex-wrap items-center mt-2 text-gray-500 dark:text-gray-400 gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{jobPost.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{jobPost.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{jobPost.duration}</span>
                  </div>
                </div>
              </div>

              {hasApplied ? (
                <div className="p-6 text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                    <h2 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
                      Application Already Submitted
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      You have already applied for this job. You can view your
                      application status in the Applications section.
                    </p>
                  </div>
                  <Link href="/dashboard/applications">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      View My Applications
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Your Application Message
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Introduce yourself and explain why you're a good fit for
                      this job. Include your relevant experience and
                      availability.
                    </p>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="I'm interested in this job because..."
                      rows={8}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Job Requirements</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {jobPost.requirements}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Link href={`/dashboard/job-posts/${params.id}`}>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
