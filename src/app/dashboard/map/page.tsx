import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Filter,
  Search,
  Layers,
  ZoomIn,
  ZoomOut,
  User,
  List,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MapPage() {
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
      id: 1,
      name: "Rahul Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      category: "Construction",
      skills: ["Masonry", "Painting"],
      rate: "₹600/day",
      rating: 4.8,
      distance: "1.2 km",
      available: true,
      lat: 12.9716,
      lng: 77.5946,
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      category: "Cleaning",
      skills: ["House Cleaning"],
      rate: "₹450/day",
      rating: 4.6,
      distance: "0.8 km",
      available: true,
      lat: 12.9766,
      lng: 77.5993,
    },
    {
      id: 3,
      name: "Mohammed Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
      category: "Security",
      skills: ["Guard"],
      rate: "₹550/day",
      rating: 4.7,
      distance: "2.5 km",
      available: false,
      lat: 12.9819,
      lng: 77.6078,
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
              Map View
            </h1>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Link href="/dashboard/workers">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <List className="h-4 w-4 mr-2" />
                  List View
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

              <Button className="bg-blue-600 hover:bg-blue-700">
                Search Area
              </Button>
            </div>
          </div>

          {/* Map container */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-280px)] min-h-[500px]">
            {/* Placeholder for the map - in a real app, this would be a map component */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  Map integration would be implemented here
                </p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">
                  Using Google Maps, Mapbox, or another mapping service
                </p>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <Layers className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>

            {/* Worker markers - these would be positioned on the map */}
            {nearbyWorkers.map((worker, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  // These positions are just for demonstration
                  left: `${30 + index * 15}%`,
                  top: `${40 + index * 10}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 p-1 border-2 border-blue-500 shadow-lg cursor-pointer">
                    <Image
                      src={worker.avatar}
                      alt={worker.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {worker.available && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={worker.avatar}
                          alt={worker.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {worker.name}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 text-xs">
                          {worker.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Skills: {worker.skills.join(", ")}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {worker.rate}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {worker.distance}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2 text-xs py-1 bg-blue-600 hover:bg-blue-700"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Map Legend
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Construction
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Cleaning
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Security
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Farming
                </span>
              </div>
              <div className="flex items-center ml-auto">
                <div className="w-2 h-2 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Available Now
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
