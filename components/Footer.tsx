// ===============================
// FILE: components/Footer.tsx
// ===============================
export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-white/60 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Afandi</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="/Afandi-CV.pdf">CV</a>
          <a className="hover:text-white" href="https://github.com/your" target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-white" href="https://www.linkedin.com/in/your" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}