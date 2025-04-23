import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import {
  User,
  UserCircle,
  MapPin,
  Briefcase,
  FileText,
  Home,
  Users,
} from "lucide-react";
import UserProfile from "./user-profile";
import { cookies } from "next/headers";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  // Get location data from cookies (set by LocationProvider)
  const cookieStore = cookies();
  const locationCookie = cookieStore.get("user-location");
  const locationData = locationCookie
    ? JSON.parse(decodeURIComponent(locationCookie.value))
    : null;
  const locationDisplay = locationData?.city
    ? `${locationData.city}, ${locationData.state || ""}`
    : null;

  return (
    <nav className="w-full border-b border-blue-100 bg-white py-3 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top row with logo, location and auth */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              prefetch
              className="text-2xl font-bold text-blue-600 flex items-center"
            >
              <span className="bg-blue-600 text-white p-1.5 rounded-md mr-2 shadow-sm">
                RS
              </span>
              Rozgar Setu
            </Link>

            <MapPin className="h-5 w-5 ml-9 text-blue-500" />
            <span className="text-sm  text-gray-600">Bhopal, Madhya Pradesh</span>

            {locationDisplay && (
              <div className="hidden md:flex items-center text-sm text-blue-600">
                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                {locationDisplay}
                
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center">
            {user ? (
              <>
                {user && (
                  <>
                    <Link
                      href="/dashboard/job-posts/"
                      className="flex items-center px-5 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors mx-1"
                    >
                      <Briefcase className="h-4 w-4 mr-1.5" />
                      Post Job
                    </Link>
                    <Link
                      href="/dashboard/applications"
                      className="flex items-center px-5 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors mx-1"
                    >
                      <FileText className="h-4 w-4 mr-1.5" />
                      My Applications
                    </Link>
                  </>
                )}
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    Dashboard
                  </Button>
                </Link>
                <UserProfile />
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="flex items-center px-5 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors mx-1"
                >
                  <Home className="h-4 w-4 mr-1.5" />
                  Home
                </Link>
                <Link
                  href="/dashboard/workers"
                  className="flex items-center px-5 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors mx-1"
                >
                  <Users className="h-4 w-4 mr-1.5" />
                  Workers
                </Link>
                <Link
                  href="/employers"
                  className="flex items-center px-5 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors mx-1"
                >
                  <Briefcase className="h-4 w-4 mr-1.5" />
                  Employers
                </Link>

                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
