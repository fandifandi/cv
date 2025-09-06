// ===============================
// FILE: components/Footer.tsx
// ===============================
import { CV_DOWNLOAD, CV_VIEW } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-white/60 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Afandi</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="https://hits.sh/fandifandi.github.io/cv/"><img alt="Hits" src="https://hits.sh/fandifandi.github.io/cv.svg?color=00fffa&labelColor=5ec09d"/></a>
        </div>
      </div>
    </footer>
  );
}