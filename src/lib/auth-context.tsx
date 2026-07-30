"use client";

/**
 * Auth Context — Manages user session and authentication state.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initial session check
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      
      if (session) {
        setSession(session);
        setUser(session.user);
        setIsAdmin(session.user.user_metadata?.role === "admin");
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAdmin(session?.user?.user_metadata?.role === "admin");
        setIsLoading(false);
        
        if (_event === "SIGNED_OUT") {
          router.refresh();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
