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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section className="py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              How Mazdur Setu Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A simple three-step process to connect employers with skilled
              workers in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Find Nearby Workers",
                description:
                  "Browse workers in your vicinity with our location-based system",
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Hire Instantly",
                description:
                  "Contact and hire workers directly through our platform",
              },
              {
                icon: <Wallet className="w-8 h-8" />,
                title: "Easy Payments",
                description:
                  "Pay securely using UPI or other digital payment methods",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="p-6 bg-gray-700 rounded-xl border border-gray-600 hover:border-blue-500 transition-all"
              >
                <div className="text-blue-400 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worker Listings Preview */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Available Workers Near You
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Preview of skilled workers currently available in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workerProfiles.map((worker, index) => (
              <div
                key={index}
                className={`p-6 bg-gray-800 rounded-xl border ${worker.available ? "border-green-500/30" : "border-gray-600"} hover:border-blue-500 transition-all`}
              >
                <div className="flex items-center mb-4">
                  <div className="relative mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
                      <Image
                        src={worker.avatar}
                        alt={worker.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    {worker.available && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {worker.name}
                    </h3>
                    <p className="text-blue-400 text-sm">{worker.category}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white">{worker.rating}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <MapPin className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-gray-300">{worker.distance}</span>
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {worker.rate}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {worker.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={user ? "/dashboard" : "/sign-in"}
                  className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
                >
                  Contact Worker
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={user ? "/dashboard/workers" : "/sign-up?type=employer"}
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Workers
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Registered Workers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Jobs Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Find Workers?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of employers who find reliable workers through our
            platform.
          </p>
          <Link
            href={user ? "/dashboard" : "/sign-up?type=employer"}
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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
