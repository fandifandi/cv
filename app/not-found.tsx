// ===============================
// FILE: app/not-found.tsx
// ===============================
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-2 text-[color:var(--muted)]">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
          Go Home
        </Link>
      </div>
    </main>
  );
}