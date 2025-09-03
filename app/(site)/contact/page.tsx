// ===============================
// FILE: app/(site)/contact/page.tsx
// ===============================
import Section from "@/components/Section";

export const metadata = { title: "Contact" };




export default function ContactPage() {
  return (
    <Section className="py-12">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Let’s work together</h1>
        <p className="mt-3 text-[color:var(--muted)]">
          Reach me via email or socials. I’m open to freelance/contract and full-time roles.
        </p>
        <div className="mt-6 space-y-3">
          <a href="mailto:you@your-domain.com" className="block rounded-xl bg-white text-black px-5 py-3 font-semibold">
            you@your-domain.com
          </a>
          <div className="flex items-center justify-center gap-4 text-white/80">
            <a href="https://www.linkedin.com/in/your" target="_blank" rel="noreferrer" className="hover:text-[color:var(--fg)]">LinkedIn</a>
            <a href="https://github.com/your" target="_blank" rel="noreferrer" className="hover:text-[color:var(--fg)]">GitHub</a>
            <a href="https://twitter.com/your" target="_blank" rel="noreferrer" className="hover:text-[color:var(--fg)]">Twitter</a>
          </div>
        </div>
      </div>
    </Section>
  );
}