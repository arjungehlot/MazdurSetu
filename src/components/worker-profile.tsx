"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface WorkerProfileProps {
  workerId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkerProfile({
  workerId,
  isOpen,
  onClose,
}: WorkerProfileProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "book">("profile");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingDuration, setBookingDuration] = useState<string>("1");
  const [bookingNotes, setBookingNotes] = useState<string>("");

  // This would be fetched from the database in a real implementation
  const worker = {
    id: workerId,
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

  const handleBooking = () => {
    // In a real implementation, this would send the booking data to the server
    console.log("Booking submitted", {
      workerId,
      date: bookingDate,
      time: bookingTime,
      duration: bookingDuration,
      notes: bookingNotes,
    });
    alert("Booking request sent to worker!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Worker Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-6">
          {/* Worker header info */}
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
              <h2 className="text-xl font-bold">{worker.name}</h2>
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
              <div className="text-xl font-bold">{worker.rate}</div>
              <div className="text-sm text-gray-500">
                {worker.experience} exp.
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 font-medium ${activeTab === "profile" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Details
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "book" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("book")}
            >
              Book Worker
            </button>
          </div>

          {/* Profile tab content */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* About section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {worker.description}
                </p>
              </div>

              {/* Skills section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
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

              {/* Contact information */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{worker.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{worker.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{worker.address}</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
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
                <h3 className="text-lg font-semibold mb-2">Work History</h3>
                <div className="space-y-3">
                  {worker.workHistory.map((work, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1"
                    >
                      <div className="font-medium">{work.employer}</div>
                      <div className="text-sm text-gray-500">
                        {work.role} • {work.duration} • {work.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                <div className="space-y-4">
                  {worker.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-gray-500">
                          {review.date}
                        </div>
                      </div>
                      <div className="flex items-center my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            fill={i < review.rating ? "currentColor" : "none"}
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

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1" onClick={() => setActiveTab("book")}>
                  Book Now
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          )}

          {/* Book tab content */}
          {activeTab === "book" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Book {worker.name}
                </h3>
                <p className="text-gray-500 mb-6">
                  Fill in the details below to book this worker. You'll be able
                  to discuss specific requirements after booking.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <Input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Duration (days)
                    </label>
                    <select
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                      value={bookingDuration}
                      onChange={(e) => setBookingDuration(e.target.value)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "day" : "days"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Notes (optional)
                    </label>
                    <Textarea
                      placeholder="Describe the job requirements, location details, etc."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="pt-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Daily Rate:</span>
                        <span>{worker.rate}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Duration:</span>
                        <span>
                          {bookingDuration}{" "}
                          {parseInt(bookingDuration) === 1 ? "day" : "days"}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span>Total:</span>
                        <span>₹{parseInt(bookingDuration) * 600}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1" onClick={handleBooking}>
                        Confirm Booking
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setActiveTab("profile")}
                      >
                        Back to Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
