import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, HardHat } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Join Mazdur Setu
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose how you want to use our platform
          </p>
        </div>

        <div className="grid gap-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/sign-up/employer" className="w-full">
              <div className="border rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer h-full flex flex-col items-center justify-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-medium mb-2">I'm an Employer</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Looking to hire skilled workers for my projects
                </p>
              </div>
            </Link>

            <Link href="/sign-up/worker" className="w-full">
              <div className="border rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer h-full flex flex-col items-center justify-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                  <HardHat className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-medium mb-2">I'm a Worker</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Looking for work opportunities in my area
                </p>
              </div>
            </Link>
          </div>

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
