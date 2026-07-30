"use client";

import { useEffect } from "react";
import { Button } from "@/components/design-system/core/Button";
import { Container } from "@/components/design-system/layout/Container";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-pearl">
      <Container className="max-w-lg text-center py-12">
        <div className="w-24 h-24 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <AlertCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-bold text-text-primary mb-4 font-heading">
          شيء ما تعطل في رحلتنا
        </h1>
        
        <p className="text-lg text-text-secondary mb-10 leading-relaxed">
          نواجه صعوبة في تحميل هذه الصفحة حاليًا. يرجى المحاولة مرة أخرى أو العودة لاحقًا.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => reset()}
            className="gap-3 h-14 px-10 text-lg"
          >
            <RotateCcw className="w-5 h-5" />
            حاول مرة أخرى
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => window.location.href = "/"}
            className="h-14 px-10 text-lg"
          >
            العودة للرئيسية
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-12 p-6 bg-white border border-border rounded-lg text-left overflow-auto max-h-60 shadow-inner">
            <h3 className="text-sm font-bold text-error mb-2 uppercase tracking-wider">Debug Info:</h3>
            <pre className="text-xs font-mono text-text-primary whitespace-pre-wrap">
              {error.message}
              {"\n\n"}
              {error.stack}
            </pre>
          </div>
        )}
      </Container>
    </div>
  );
}
