import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import WorkerCard from "@/components/worker-card";
import FactsSection from "@/components/facts-section";
import {
  MapPin,
  Filter,
  Search,
  Clock,
  Calendar,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Dashboard() {
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

  // Sample worker data (in a real app, this would come from the database)
  const nearbyWorkers = [
    {
      id: "1",
      name: "Rahul Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      category: "Construction",
      skills: ["Masonry", "Painting", "Carpentry"],
      rate: "₹600/day",
      rating: 4.8,
      distance: "1.2 km",
      available: true,
    },
    {
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      category: "Cleaning",
      skills: ["House Cleaning", "Office Cleaning"],
      rate: "₹450/day",
      rating: 4.6,
      distance: "0.8 km",
      available: true,
    },
    {
      name: "Mohammed Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
      category: "Security",
      skills: ["Guard", "Patrolling"],
      rate: "₹550/day",
      rating: 4.7,
      distance: "2.5 km",
      available: false,
    },
    {
      name: "Lakshmi Devi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi",
      category: "Farming",
      skills: ["Harvesting", "Planting"],
      rate: "₹500/day",
      rating: 4.9,
      distance: "3.1 km",
      available: true,
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      type: "hire",
      worker: "Rahul Singh",
      date: "Today, 10:30 AM",
      category: "Construction",
    },
    {
      type: "payment",
      worker: "Priya Sharma",
      date: "Yesterday",
      amount: "₹450",
    },
    {
      type: "rating",
      worker: "Mohammed Khan",
      date: "2 days ago",
      rating: 4.5,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">
                  Active Hires
                </h3>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                3
              </p>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+2</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  from last week
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">
                  Total Spent
                </h3>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹4,250
              </p>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  from last month
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 font-medium">
                  Upcoming Jobs
                </h3>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                2
              </p>
              <div className="flex items-center mt-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-500 dark:text-gray-400">
                  Next: Tomorrow, 9:00 AM
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Find Workers Nearby
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search by skill or category"
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>

              <div className="relative flex-1">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Current location"
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  defaultValue="Bangalore, Karnataka"
                />
              </div>

              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Filter size={18} />
                <span>Filters</span>
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              >
                Within 5 km
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              >
                Available Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              >
                Rating 4+
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
              >
                + Add Filter
              </Button>
            </div>
          </div>

          {/* Workers Grid */}
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
            Workers Near You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {nearbyWorkers.map((worker, index) => (
              <WorkerCard key={index} worker={worker} />
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    {activity.type === "hire" && (
                      <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                    {activity.type === "payment" && (
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                    {activity.type === "rating" && (
                      <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activity.type === "hire" &&
                        `Hired ${activity.worker} for ${activity.category}`}
                      {activity.type === "payment" &&
                        `Paid ${activity.worker} ${activity.amount}`}
                      {activity.type === "rating" &&
                        `Rated ${activity.worker} ${activity.rating}★`}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {activity.date}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <FactsSection />
      </div>
    </div>
  );
}
