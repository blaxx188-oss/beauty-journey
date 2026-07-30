"use client";

/**
 * Auth Actions Hook — Reusable authentication logic using TanStack Query.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/services/auth-service";
import { useToast } from "@/components/design-system/core/Toast";
import { useRouter } from "next/navigation";

export function useSignIn() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signInWithEmail,
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          message: data.error,
          variant: "error",
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          message: "مرحباً بك مرة أخرى في بيوتي جورني",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/account");
      }
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        message: error.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى",
        variant: "error",
      });
    },
  });
}

export function useSignUp() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signUpWithEmail,
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "خطأ في إنشاء الحساب",
          message: data.error,
          variant: "error",
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          message: "يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب",
          variant: "success",
        });
        router.push("/verify-email");
      }
    },
  });
}

export function useResetPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "خطأ",
          message: data.error,
          variant: "error",
        });
      } else {
        toast({
          title: "تم إرسال الرابط",
          message: "يرجى التحقق من بريدك الإلكتروني لاستعادة كلمة المرور",
          variant: "success",
        });
      }
    },
  });
}

export function useUpdatePassword() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.updatePassword,
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "خطأ",
          message: data.error,
          variant: "error",
        });
      } else {
        toast({
          title: "تم تحديث كلمة المرور",
          message: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة",
          variant: "success",
        });
        router.push("/login");
      }
    },
  });
}
