"use client";

import { useState } from "react";
import { Star, MapPin, Check } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import WorkerProfile from "./worker-profile";
import { useRouter } from "next/navigation";

interface WorkerCardProps {
  worker: {
    id?: string;
    name: string;
    avatar: string;
    category: string;
    skills: string[];
    rate: string;
    rating: number;
    distance: string;
    available: boolean;
  };
}

export default function WorkerCard(
  { worker }: WorkerCardProps = {
    worker: {
      name: "Rahul Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      category: "Construction",
      skills: ["Masonry", "Painting"],
      rate: "₹600/day",
      rating: 4.8,
      distance: "1.2 km",
      available: true,
    },
  },
) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Generate a unique ID if one doesn't exist
  const workerId = worker.id || worker.name.toLowerCase().replace(/\s+/g, "-");

  const handleContactClick = () => {
    router.push(`/dashboard/workers/${workerId}/book`);
  };

  const handleViewProfile = () => {
    router.push(`/dashboard/workers/${workerId}`);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        {/* Card header with availability indicator */}
        <div className="relative">
          <div className="absolute top-3 right-3 z-10">
            {worker.available ? (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Available
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded-full">
                Unavailable
              </div>
            )}
          </div>

          {/* Worker info section */}
          <div className="p-4 flex items-center">
            <div className="relative mr-3">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={worker.avatar}
                  alt={worker.name}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              {worker.available && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {worker.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                {worker.category}
              </p>
            </div>
          </div>
        </div>

        {/* Rating and distance */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-gray-900 dark:text-white font-medium">
                {worker.rating}
              </span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{worker.distance}</span>
            </div>
          </div>

          {/* Rate */}
          <div className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {worker.rate}
          </div>
        </div>

        {/* Skills */}
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-1 mb-4">
            {worker.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-4 pb-4 flex gap-2">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Contact
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-200 dark:border-gray-700"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      </div>

      {/* Worker profile dialog */}
      {isProfileOpen && (
        <WorkerProfile
          workerId={workerId}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
}
