"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const workerCategories = [
    {
      name: "Construction",
      icon: "👷‍♂️",
      description: "Skilled laborers for construction sites",
    },
    {
      name: "Farming",
      icon: "🌾",
      description: "Agricultural workers for farms and fields",
    },
    {
      name: "Security",
      icon: "💂‍♂️",
      description: "Guards and security personnel",
    },
    {
      name: "Cleaning",
      icon: "🧹",
      description: "Housekeeping and sanitation workers",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-90" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight"
            >
              Connect with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Local Workers
              </span>{" "}
              in Real-Time
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Mazdur Setu connects employers with nearby daily-wage workers
              through location tracking, enabling instant hiring and seamless
              payments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/sign-up?type=employer"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Hire Workers
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/sign-up?type=worker"
                className="inline-flex items-center px-8 py-4 text-gray-200 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
              >
                Register as Worker
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Location-based matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Instant hiring</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Verified workers</span>
              </div>
            </motion.div>
          </div>

          {/* Worker Categories */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold text-center mb-10">
              Worker Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workerCategories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
                  onClick={() => router.push("/sign-up?type=employer")}
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-400">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
