import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function WorkerDetailPage({
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    category: "Construction",
    skills: ["Masonry", "Painting", "Carpentry"],
    rate: "₹600/day",
    rating: 4.8,
    distance: "1.2 km",
    available: true,
    phone: "+91 98765 43210",
    email: "rahul.s@example.com",
    address: "Koramangala, Bangalore",
    experience: "5 years",
    languages: ["Hindi", "English", "Kannada"],
    description:
      "Experienced construction worker specializing in masonry, painting, and carpentry. Available for daily wage work in Bangalore area.",
    reviews: [
      {
        name: "Amit Kumar",
        rating: 5,
        comment: "Excellent work, very professional",
        date: "2 weeks ago",
      },
      {
        name: "Priya Patel",
        rating: 4,
        comment: "Good work, completed on time",
        date: "1 month ago",
      },
    ],
    workHistory: [
      {
        employer: "ABC Construction",
        duration: "3 months",
        role: "Mason",
        year: "2023",
      },
      {
        employer: "XYZ Builders",
        duration: "6 months",
        role: "Carpenter",
        year: "2022",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <div className="mb-6">
            <Link
              href="/dashboard/workers"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
            >
              ← Back to Workers
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Worker header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={worker.avatar}
                      alt={worker.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  {worker.available && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {worker.name}
                  </h1>
                  <p className="text-blue-600 dark:text-blue-400">
                    {worker.category}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium mr-3">{worker.rating}</span>
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-500">{worker.distance}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {worker.rate}
                  </div>
                  <div className="text-sm text-gray-500">
                    {worker.experience} experience
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - About and Skills */}
                <div className="md:col-span-2 space-y-6">
                  {/* About section */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      About
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {worker.description}
                    </p>
                  </div>

                  {/* Skills section */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Languages
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {worker.languages.map((language, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Work history */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Work History
                    </h2>
                    <div className="space-y-4">
                      {worker.workHistory.map((work, i) => (
                        <div
                          key={i}
                          className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-2"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {work.employer}
                          </div>
                          <div className="text-gray-500">
                            {work.role} • {work.duration} • {work.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Reviews
                    </h2>
                    <div className="space-y-6">
                      {worker.reviews.map((review, i) => (
                        <div
                          key={i}
                          className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                        >
                          <div className="flex justify-between">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {review.name}
                            </div>
                            <div className="text-gray-500">{review.date}</div>
                          </div>
                          <div className="flex items-center my-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                fill={
                                  i < review.rating ? "currentColor" : "none"
                                }
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column - Contact and Booking */}
                <div>
                  {/* Contact card */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {worker.phone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {worker.email}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {worker.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking card */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Book This Worker
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {worker.name} is currently{" "}
                      {worker.available ? "available" : "unavailable"} for work.
                    </p>

                    <Link href={`/dashboard/workers/${worker.id}/book`}>
                      <Button className="w-full mb-3">Book Now</Button>
                    </Link>

                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
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
