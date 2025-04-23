"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Map,
  Calendar,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  MessageSquare,
  Sun,
  Moon,
  Briefcase,
} from "lucide-react";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface DashboardSidebarProps {
  user: User;
  profile?: any;
}

export default function DashboardSidebar({
  user,
  profile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/sign-in");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Find Workers", href: "/dashboard/workers", icon: Users },
    { name: "Apply for work", href: "/dashboard/job-posts/1", icon: Users },
    { name: "Map View", href: "/dashboard/map", icon: Map },
    { name: "Schedule", href: "/dashboard", icon: Calendar, comingSoon: true },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Chat", href: "/dashboard", icon: MessageSquare, comingSoon: true },
    { name: "Settings", href: "/dashboard/profile", icon: Settings },
    {
      name: "Help & Support",
      href: "/dashboard",
      icon: HelpCircle,
      comingSoon: true,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <Link href="/" className="text-xl font-bold">
              Mazdur Setu
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? "→" : "←"}
          </Button>
        </div>

        {/* User profile section */}
        <div
          className={cn(
            "p-4 border-b border-gray-200 dark:border-gray-700",
            isCollapsed ? "text-center" : "",
          )}
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
              {profile?.name?.charAt(0) || user.email?.charAt(0) || "U"}
            </div>
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">
                  {profile?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  {item.comingSoon ? (
                    <div
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                        "text-gray-500 dark:text-gray-500 cursor-not-allowed",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isCollapsed ? "mx-auto" : "mr-3",
                        )}
                      />
                      {!isCollapsed && (
                        <>
                          <span>{item.name}</span>
                          <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
                            Soon
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isCollapsed ? "mx-auto" : "mr-3",
                        )}
                      />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme toggle and logout button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50",
              isCollapsed && "justify-center",
            )}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
            ) : (
              <Moon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
            )}
            {!isCollapsed && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50",
              isCollapsed && "justify-center",
            )}
            onClick={handleSignOut}
          >
            <LogOut className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
            {!isCollapsed && <span>Sign out</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
