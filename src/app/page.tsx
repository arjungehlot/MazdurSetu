import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  MapPin,
  Clock,
  Shield,
  Star,
  Users,
  Briefcase,
  Wallet,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const workerProfiles = [
    {
      name: "Rahul Singh",
      avatar: "https://plus.unsplash.com/premium_photo-1680787309486-b7e082157712?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvcmtlciUyMGltYWdlfGVufDB8fDB8fHww",
      category: "Construction",
      skills: ["Masonry", "Painting", "Carpentry"],
      rate: "₹600/day",
      rating: 4.8,
      distance: "1.2 km",
      available: true,
    },
    {
      name: "Priya Sharma",
      avatar: "https://plus.unsplash.com/premium_photo-1664392253943-c11a430a29f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d29ya2VyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
      category: "Cleaning",
      skills: ["House Cleaning", "Office Cleaning"],
      rate: "₹450/day",
      rating: 4.6,
      distance: "0.8 km",
      available: true,
    },
    {
      name: "Mohammed Khan",
      avatar: "https://plus.unsplash.com/premium_photo-1682882535034-e5cd343742d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHdvcmtlciUyMGltYWdlfGVufDB8fDB8fHww",
      category: "Security",
      skills: ["Guard", "Patrolling"],
      rate: "₹550/day",
      rating: 4.7,
      distance: "2.5 km",
      available: true,
    },
    {
      name: "Lakshmi Devi",
      avatar: "https://plus.unsplash.com/premium_photo-1661900503280-36c1b4be3a66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybWluZyUyMGltYWdlfGVufDB8fDB8fHww",
      category: "Farming",
      skills: ["Harvesting", "Planting"],
      rate: "₹500/day",
      rating: 4.9,
      distance: "3.1 km",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <Hero />
      <section className="py-24 bg-white text-gray-800">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">How Mazdur Setu Works</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        A simple three-step process to connect employers with skilled workers in your area.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: <MapPin className="w-10 h-10 text-black" />,
          title: "Find Nearby Workers",
          description: "Browse workers in your vicinity with our location-based system",
        },
        {
          icon: <Briefcase className="w-10 h-10 text-black" />,
          title: "Hire Instantly",
          description: "Contact and hire workers directly through our platform",
        },
        {
          icon: <Wallet className="w-10 h-10 text-black" />,
          title: "Easy Payments",
          description: "Pay securely using UPI or other digital payment methods",
        },
      ].map((step, index) => (
        <div
          key={index}
          className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all"
        >
          <div className="mb-4">{step.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-700">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-24 bg-white text-gray-800">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Available Workers Near You</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Preview of skilled workers currently available in your area.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {workerProfiles.map((worker, index) => (
        <div
          key={index}
          className={`p-6 bg-white border ${
            worker.available ? "border-gray-900" : "border-gray-300"
          } rounded-xl shadow hover:shadow-xl transition-all`}
        >
          <div className="flex items-center mb-4">
            <div className="relative mr-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={worker.avatar}
                  alt={worker.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              {worker.available && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{worker.name}</h3>
              <p className="text-gray-500 text-sm">{worker.category}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-1 text-gray-700">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{worker.rating}</span>
              <span className="mx-2">•</span>
              <MapPin className="w-4 h-4 text-gray-500 mr-1" />
              <span>{worker.distance}</span>
            </div>
            <div className="text-lg font-semibold mb-2">{worker.rate}</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {worker.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 text-black px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={user ? "/dashboard" : "/sign-in"}
            className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg text-sm transition-colors"
          >
            Contact Worker
          </Link>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link
        href={user ? "/dashboard/workers" : "/sign-up?type=employer"}
        className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors"
      >
        View All Workers
        <ArrowUpRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  </div>
</section>


<section className="py-24 bg-white text-gray-800">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-12 text-center">
      {[
        { iconColor: "text-yellow-400", count: "5,000+", label: "Registered Workers" },
        { iconColor: "text-green-500", count: "10,000+", label: "Jobs Completed" },
        { iconColor: "text-pink-500", count: "50+", label: "Cities Covered" },
      ].map((stat, index) => (
        <div
          key={index}
          className="p-8 bg-gray-50 border border-gray-500 rounded-2xl shadow hover:shadow-xl transition-transform transform hover:scale-105"
        >
          <div className={`flex justify-center mb-4`}>
            <div className={`w-10 h-10 ${stat.iconColor}`}>
              {/* Icon Placeholder */}
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <div className="text-5xl font-extrabold mb-2">{stat.count}</div>
          <p className="text-gray-700 text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>


<section className="py-20 bg-white text-gray-800">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl text-gray-800 font-bold mb-4">Ready to Find Workers?</h2>
    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
      Join thousands of employers who find reliable workers through our platform.
    </p>
    <Link
      href={user ? "/dashboard" : "/sign-up?type=employer"}
      className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Get Started Now
      <ArrowUpRight className="ml-2 w-4 h-4" />
    </Link>
  </div>
</section>


      <Footer />
    </div>
  );
}
