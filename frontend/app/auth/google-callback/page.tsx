"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function GoogleCallbackContent() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("studyflow_token", token);
    }

    if (user) {
      try {
        localStorage.setItem("studyflow_user", decodeURIComponent(user));
      } catch {
        localStorage.setItem("studyflow_user", user);
      }
    }

    router.replace("/dashboard");
  }, [params, router]);

  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
      <p className="text-lg font-semibold">Signing you in with Google…</p>
      <p className="mt-2 text-sm text-muted-foreground">One moment while we finish login and redirect you to your dashboard.</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <Suspense fallback={
        <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
          <p className="text-lg font-semibold">Signing you in with Google…</p>
        </div>
      }>
        <GoogleCallbackContent />
      </Suspense>
    </main>
  );
}
