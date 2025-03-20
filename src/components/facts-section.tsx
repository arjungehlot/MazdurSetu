"use client";

import { motion } from "framer-motion";
import { Award, Clock, MapPin, Shield, Star, Users } from "lucide-react";

export default function FactsSection() {
  const facts = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "5,000+ Workers",
      description: "Registered across 50+ cities in India",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "15 Minutes",
      description: "Average time to find and hire a worker",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "4.8/5 Rating",
      description: "Average worker satisfaction rating",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "100% Verified",
      description: "All workers are verified for safety",
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      title: "Location-Based",
      description: "Find workers within your vicinity",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Skilled Labor",
      description: "Workers with verified skills and experience",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose Mazdur Setu?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're revolutionizing how employers connect with daily-wage workers
            through our innovative platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md"
            >
              <div className="mb-4">{fact.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {fact.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
