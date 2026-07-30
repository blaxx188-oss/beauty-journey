/**
 * Auth Service — Supabase authentication wrapper.
 * Handles login, register, OTP, and session management.
 */

import { supabaseClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// ============================================
// TYPES
// ============================================

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface AuthResult {
  user: User | null;
  error: string | null;
}

// ============================================
// FUNCTIONS
// ============================================

/**
 * Sign in with email and password.
 */
export async function signInWithEmail(
  input: LoginInput
): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
}

/**
 * Sign up with email, password, and optional metadata.
 */
export async function signUpWithEmail(
  input: RegisterInput
): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        phone_number: input.phoneNumber,
      },
    },
  });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
}

/**
 * Sign in with OAuth provider.
 */
export async function signInWithOAuth(
  provider: "google" | "apple"
): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
    },
  });

  return {
    user: null,
    error: error?.message ?? null,
  };
}

/**
 * Sign out.
 */
export async function signOut(): Promise<void> {
  await supabaseClient.auth.signOut();
}

/**
 * Get current user session.
 */
export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  return user;
}

/**
 * Request OTP for phone verification.
 */
export async function requestOTP(phoneNumber: string): Promise<AuthResult> {
  const { error } = await supabaseClient.auth.signInWithOtp({
    phone: phoneNumber,
  });

  return {
    user: null,
    error: error?.message ?? null,
  };
}

/**
 * Verify OTP code.
 */
export async function verifyOTP(
  phoneNumber: string,
  token: string
): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.verifyOtp({
    phone: phoneNumber,
    token,
    type: "sms",
  });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
}

/**
 * Reset password - send recovery email.
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  return {
    user: null,
    error: error?.message ?? null,
  };
}

/**
 * Update password with new token.
 */
export async function updatePassword(
  newPassword: string
): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.updateUser({
    password: newPassword,
  });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
}
