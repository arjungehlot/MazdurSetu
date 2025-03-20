import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Download,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Filter,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default async function PaymentsPage() {
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

  // Sample payment data (in a real app, this would come from the database)
  const payments = [
    {
      id: "PAY-1234",
      worker: {
        name: "Rahul Singh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      },
      date: "2023-06-15",
      amount: "₹600",
      status: "completed",
      category: "Construction",
      paymentMethod: "UPI",
    },
    {
      id: "PAY-1235",
      worker: {
        name: "Priya Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      },
      date: "2023-06-12",
      amount: "₹450",
      status: "completed",
      category: "Cleaning",
      paymentMethod: "Cash",
    },
    {
      id: "PAY-1236",
      worker: {
        name: "Mohammed Khan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
      },
      date: "2023-06-10",
      amount: "₹550",
      status: "completed",
      category: "Security",
      paymentMethod: "UPI",
    },
    {
      id: "PAY-1237",
      worker: {
        name: "Lakshmi Devi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi",
      },
      date: "2023-06-05",
      amount: "₹500",
      status: "completed",
      category: "Farming",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "PAY-1238",
      worker: {
        name: "Rajesh Kumar",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
      },
      date: "2023-06-01",
      amount: "₹650",
      status: "completed",
      category: "Construction",
      paymentMethod: "UPI",
    },
  ];

  // Calculate total spent
  const totalSpent = payments.reduce((total, payment) => {
    return total + parseInt(payment.amount.replace("₹", ""));
  }, 0);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar user={user} profile={profile} />

      <div className="flex-1">
        <DashboardHeader user={user} profile={profile} />

        <main className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              Payment History
            </h1>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>

          {/* Payment summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">
                Total Spent
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{totalSpent}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Last 30 days
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">
                Payment Methods
              </h3>
              <div className="space-y-3 mt-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                      UPI
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      UPI
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Default payment method
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                    <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                      BT
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      Bank Transfer
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      HDFC Bank ****1234
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 text-blue-600 dark:text-blue-400 p-0 h-auto"
              >
                <span>Manage Payment Methods</span>
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">
                Payment Analytics
              </h3>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Most hired category
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    Construction
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Most frequent worker
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    Rahul Singh
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 dark:text-blue-400 p-0 h-auto"
                >
                  <span>View Detailed Analytics</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
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
                  placeholder="Search payments..."
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Date Range</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Payments table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Worker
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {payments.map((payment, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/80"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full mr-3">
                            <Image
                              src={payment.worker.avatar}
                              alt={payment.worker.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {payment.worker.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {payment.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 dark:text-blue-400"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  1
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {payments.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {payments.length}
                </span>{" "}
                payments
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="border-gray-200 dark:border-gray-700"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="border-gray-200 dark:border-gray-700"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
