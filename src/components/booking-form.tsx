"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  workerId: string;
  worker: {
    name: string;
    rate: string;
    category: string;
  };
}

export default function BookingForm({ workerId, worker }: BookingFormProps) {
  const router = useRouter();
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingDuration, setBookingDuration] = useState<string>("1");
  const [bookingLocation, setBookingLocation] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real implementation, this would send the booking data to the server
    console.log("Booking submitted", {
      workerId,
      date: bookingDate,
      time: bookingTime,
      duration: bookingDuration,
      location: bookingLocation,
      notes: bookingNotes,
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Booking request sent successfully!");
      router.push("/dashboard/workers");
    }, 1000);
  };

  // Extract the numeric part from the rate string (e.g., "₹600/day" -> 600)
  const rateValue = parseInt(worker.rate.replace(/[^0-9]/g, ""));
  const totalAmount = rateValue * parseInt(bookingDuration);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="date"
              className="pl-10"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <div className="relative">
            <Clock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="time"
              className="pl-10"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            />
          </div>
        </div>
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
        <label className="block text-sm font-medium mb-1">Work Location</label>
        <div className="relative">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            className="pl-10"
            placeholder="Enter the work location address"
            value={bookingLocation}
            onChange={(e) => setBookingLocation(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Job Description
        </label>
        <Textarea
          placeholder="Describe the job requirements, specific tasks, etc."
          value={bookingNotes}
          onChange={(e) => setBookingNotes(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium mb-3">Booking Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Worker:</span>
            <span className="font-medium">{worker.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Category:</span>
            <span>{worker.category}</span>
          </div>
          <div className="flex justify-between">
            <span>Daily Rate:</span>
            <span>{worker.rate}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>
              {bookingDuration}{" "}
              {parseInt(bookingDuration) === 1 ? "day" : "days"}
            </span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Total Amount:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}
