// app/(site)/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { personJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const metadata = {
  title: "About",
  description: "Profil singkat, pengalaman, dan cara kerja.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About", description: "Profil dan cara kerja." },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Section className="pt-16 pb-10 mesh">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-widest text-[color:var(--muted)]">ABOUT</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold leading-tight">
            I help teams make smarter, faster decisions with data.
          </h1>
          <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
            Fokus di analytics engineering, experimentation, dan data storytelling untuk dorong metrik bisnis nyata.
          </p>
        </div>
      </Section>

      <Section className="py-8">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[320px,1fr] gap-10 items-start">
          {/* Headshot / quick card */}
          <aside className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[color:var(--border)]">
              <Image
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800&auto=format&fit=crop"
                alt="Profile"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-4">
              <h2 className="font-semibold">Contact</h2>
              <ul className="mt-2 text-sm space-y-1">
                <li>📧 <a className="hover:text-emerald-400" href="mailto:email@example.com">email@example.com</a></li>
                <li>🔗 <a className="hover:text-emerald-400" target="_blank" href="https://www.linkedin.com/in/username">LinkedIn</a></li>
                <li>💻 <a className="hover:text-emerald-400" target="_blank" href="https://github.com/username">GitHub</a></li>
              </ul>
              <a href="/Afandi-CV.pdf" className="mt-3 inline-block px-3 py-2 rounded-lg border border-[color:var(--border)] text-sm hover:bg-[color:var(--card)]">
                Download CV
              </a>
            </div>
          </aside>

          {/* Story */}
          <article className="prose max-w-none dark:prose-invert">
            <h2>Now</h2>
            <p>Mendesain metric layer, eksperimen, dan dashboard yang dipakai lintas tim untuk ambil keputusan cepat.</p>

            <h2>What I do</h2>
            <ul>
              <li><strong>Analytics Engineering</strong> — dbt/Airflow, model data, guardrail biaya.</li>
              <li><strong>Experimentation</strong> — desain uji, guardrail, analisis uplift.</li>
              <li><strong>Storytelling</strong> — insight yang actionable, bukan sekadar chart.</li>
            </ul>

            <h2>Highlights</h2>
            <ul>
              <li>+8% checkout conversion (variant B) • -23% BigQuery cost.</li>
              <li>SSOT KPI untuk 10+ tim, self-serve dashboard mingguan.</li>
            </ul>

            <h2>Stack I enjoy</h2>
            <p>Python, SQL, dbt, Airflow, BigQuery, GA4, geospatial (PostGIS/Deck.gl).</p>

            <h2>Let’s work</h2>
            <p>Butuh bantuan bikin fondasi data/eksperimen? <Link href="/contact">Contact</Link> atau kirim email langsung.</p>
          </article>
          {/* Hobbies & Off-hours */}
<section className="mt-10">
  <h2 className="text-2xl font-semibold">Hobbies & Off-hours</h2>
  <p className="mt-2 text-[color:var(--muted)] max-w-2xl">
    Di luar kerja, aku suka yang bikin fokus + gerak: 
    lari, bersepeda, fotografi jalanan, dan masak kopi manual brew.
  </p>

  {/* Chips */}
  <div className="mt-4 flex flex-wrap gap-2 text-sm">
    {["Running 10K", "Gravel ride", "Street photo", "Manual brew", "Non-fiction"].map((h) => (
      <span key={h} className="px-3 py-1 rounded-full bg-[color:var(--card)] border border-[color:var(--border)]">
        {h}
      </span>
    ))}
  </div>

  {/* Mini gallery (opsional) */}
  <div className="mt-6 grid sm:grid-cols-3 gap-4">
    {[
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop",
    ].map((src, i) => (
      <div key={i} className="overflow-hidden rounded-2xl border border-[color:var(--border)]">
        {/* pakai <Image> kalau mau: ganti <img> ↔ <Image> */}
        <img src={src} alt={`hobby ${i+1}`} className="w-full h-40 object-cover" loading="lazy" />
      </div>
    ))}
  </div>

  {/* Now reading / watching */}
  <div className="mt-8 grid md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold">Now reading</h3>
      <ul className="mt-2 list-disc list-inside text-[color:var(--muted)]">
        <li>“Designing Data-Intensive Applications”</li>
        <li>“Experimentation Works”</li>
      </ul>
    </div>
    <div>
      <h3 className="font-semibold">Now watching / listening</h3>
      <ul className="mt-2 list-disc list-inside text-[color:var(--muted)]">
        <li>Tracksmith YouTube (running)</li>
        <li>Huberman Lab (sleep, focus)</li>
      </ul>
    </div>
  </div>
</section>

        </div>
      </Section>
    </>
  );
}
