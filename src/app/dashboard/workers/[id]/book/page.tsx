import { redirect } from "next/navigation";
import { createClient } from "../../../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookingForm from "@/components/booking-form";

export default async function BookWorkerPage({
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

  // In a real implementation, this would fetch the worker data from the database
  // For now, we'll use sample data
  const worker = {
    id: params.id,
    name: "Rahul Singh",
    category: "Construction",
    skills: ["Masonry", "Painting", "Carpentry"],
    rate: "₹600/day",
    rating: 4.8,
    distance: "1.2 km",
    available: true,
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <div className="mb-6">
            <Link
              href={`/dashboard/workers/${params.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
            >
              ← Back to Worker Profile
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Book {worker.name}
                </h1>
                <p className="text-gray-500 mt-1">
                  Fill in the details below to book this worker
                </p>
              </div>

              <div className="p-6">
                <BookingForm workerId={params.id} worker={worker} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
