"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/design-system/core/Button";
import { Container } from "@/components/design-system/layout/Container";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Here you would typically log to an external service like Sentry
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-surface">
          <Container className="max-w-md text-center">
            <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              عذرًا، حدث خطأ ما
            </h1>
            <p className="text-text-secondary mb-8 leading-relaxed">
              لقد واجهنا مشكلة غير متوقعة. لا تقلق، فريقنا التقني يعمل على حلها. يمكنك محاولة تحديث الصفحة أو العودة للرئيسية.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={this.handleReset}
                className="gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                تحديث الصفحة
              </Button>
              <Button 
                variant="outline"
                onClick={this.handleGoHome}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                العودة للرئيسية
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 p-4 bg-neutral-secondary rounded-sm text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-error">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
