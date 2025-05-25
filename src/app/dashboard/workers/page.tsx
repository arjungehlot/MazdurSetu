import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import WorkerCard from "@/components/worker-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Filter, Search, Briefcase, Clock, Star } from "lucide-react";
import Link from "next/link";

export default async function WorkersPage() {
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
  const workers = [
    {
      name: "Rahul Singh",
      avatar: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      category: "Construction",
      skills: ["Masonry", "Painting", "Carpentry"],
      rate: "₹600/day",
      rating: 4.8,
      distance: "1.2 km",
      available: true,
    },
    {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBjbGVhbmluZ3xlbnwwfHwwfHx8MA%3D%3D",
      category: "Cleaning",
      skills: ["House Cleaning", "Office Cleaning"],
      rate: "₹450/day",
      rating: 4.6,
      distance: "0.8 km",
      available: true,
    },
    {
      name: "Mohammed Khan",
      avatar: "https://images.unsplash.com/photo-1581568736305-49a04e012c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VhcmR8ZW58MHx8MHx8fDA%3D",
      category: "Security",
      skills: ["Guard", "Patrolling"],
      rate: "₹550/day",
      rating: 4.7,
      distance: "2.5 km",
      available: false,
    },
    {
      name: "Lakshmi Devi",
      avatar: "https://images.unsplash.com/photo-1614977645968-6db1d7798ac7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhcnZlc3Rpbmd8ZW58MHx8MHx8fDA%3D",
      category: "Farming",
      skills: ["Harvesting", "Planting"],
      rate: "₹500/day",
      rating: 4.9,
      distance: "3.1 km",
      available: true,
    },
    {
      name: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3RyaWNhbHxlbnwwfHwwfHx8MA%3D%3D",
      category: "Construction",
      skills: ["Electrical", "Plumbing"],
      rate: "₹650/day",
      rating: 4.5,
      distance: "1.8 km",
      available: true,
    },
    {
      name: "Anita Patel",
      avatar: "https://images.unsplash.com/photo-1601160458000-2b11f9fa1a0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVlcCUyMGNsZWFuaW5nfGVufDB8fDB8fHww",
      category: "Cleaning",
      skills: ["Deep Cleaning", "Sanitization"],
      rate: "₹500/day",
      rating: 4.7,
      distance: "2.2 km",
      available: true,
    },
    {
      name: "Suresh Reddy",
      avatar: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2N0diUyMG1vbml0b3Jpbmd8ZW58MHx8MHx8fDA%3D",
      category: "Security",
      skills: ["CCTV Monitoring", "Night Guard"],
      rate: "₹600/day",
      rating: 4.6,
      distance: "3.5 km",
      available: false,
    },
    {
      name: "Meena Kumari",
      avatar: "https://images.unsplash.com/photo-1589876568181-a1508b8ef473?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Farming",
      skills: ["Crop Management", "Irrigation"],
      rate: "₹450/day",
      rating: 4.8,
      distance: "4.0 km",
      available: true,
    },
  ];

  // Categories for filtering
  const categories = [
    { name: "All", count: workers.length },
    {
      name: "Construction",
      count: workers.filter((w) => w.category === "Construction").length,
    },
    {
      name: "Cleaning",
      count: workers.filter((w) => w.category === "Cleaning").length,
    },
    {
      name: "Security",
      count: workers.filter((w) => w.category === "Security").length,
    },
    {
      name: "Farming",
      count: workers.filter((w) => w.category === "Farming").length,
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
              Find Workers
            </h1>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Link href="/dashboard/map">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Map View
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and location bar */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search by skill, name or category"
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

              <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category.name === "All" ? "default" : "outline"}
                className={
                  category.name === "All"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }
              >
                {category.name}
                <span className="ml-2 bg-blue-700/20 text-blue-600 dark:text-blue-400 text-xs py-0.5 px-2 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            >
              Available Now
              <span className="ml-1">×</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            >
              Within 5 km
              <span className="ml-1">×</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            >
              Rating 4+
              <span className="ml-1">×</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
            >
              Clear All
            </Button>
          </div>

          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {workers.length}
              </span>{" "}
              workers
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Sort by:
              </span>
              <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1 px-2">
                <option>Distance</option>
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Workers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {workers.map((worker, index) => (
              <WorkerCard key={index} worker={worker} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                Previous
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                ...
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                8
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
