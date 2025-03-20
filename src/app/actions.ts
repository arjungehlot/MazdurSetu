"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const userType = formData.get("user_type")?.toString() || "employer";
  const phone = formData.get("phone")?.toString();
  const location = formData.get("location")?.toString();
  const companyName = formData.get("company_name")?.toString();
  const category = formData.get("category")?.toString();
  const skills = formData.get("skills")?.toString();
  const rate = formData.get("rate")?.toString();
  const description = formData.get("description")?.toString();

  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      userType === "worker" ? "/sign-up/worker" : "/sign-up/employer",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
        user_type: userType,
      },
    },
  });

  console.log("After signUp", error);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect(
      "error",
      userType === "worker" ? "/sign-up/worker" : "/sign-up/employer",
      error.message,
    );
  }

  if (user) {
    try {
      // Use service role client to bypass RLS policies during initial user creation
      const supabaseAdmin = await createClient({ admin: true });

      const userData = {
        id: user.id,
        name: fullName,
        full_name: fullName,
        email: email,
        user_id: user.id,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
        user_type: userType,
        phone: phone || null,
        location: location || null,
      };

      // Add employer-specific fields
      if (userType === "employer" && companyName) {
        Object.assign(userData, { company_name: companyName });
      }

      // Add worker-specific fields
      if (userType === "worker") {
        Object.assign(userData, {
          category: category || null,
          skills: skills ? skills.split(",").map((s) => s.trim()) : [],
          rate: rate ? `₹${rate}/day` : null,
          description: description || null,
          available: true,
        });
      }

      const { error: updateError } = await supabaseAdmin
        .from("users")
        .insert(userData);

      if (updateError) {
        console.error("Error updating user profile:", updateError);
      }
    } catch (err) {
      console.error("Error in user profile creation:", err);
    }
  }

  return encodedRedirect(
    "success",
    userType === "worker" ? "/sign-up/worker" : "/sign-up/employer",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  // Check if there's an error parameter in the URL (from expired email links)
  const errorParam = formData.get("error")?.toString();

  if (errorParam === "expired_link") {
    return encodedRedirect(
      "error",
      "/sign-in",
      "Your email verification link has expired. Please sign in to receive a new verification email.",
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }
  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
