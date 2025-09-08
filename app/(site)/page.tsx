// app/(site)/page.tsx
import HomeProjectsGridSimple from "@/components/HomeProjectsGridSimple";

import ContactSimple from "@/components/ContactSimple";
import ThemeIconToggle from "@/components/ThemeIconToggle";
import BackToTop from "@/components/BackToTop";


import { allProjects /* atau featuredProjects */ } from "@/lib/projects";

import TimelineSkills from "@/components/TimelineSkills";
import type { TimelineItem } from "@/components/TimelineInteractive";
import type { SkillDatum } from "@/components/SkillsBars";

import ScrollSpy from "@/components/ScrollSpy";
import { personJsonLd } from "@/lib/seo";

import MethodologyCycleSVG from "@/components/MethodologyCycleSVG";

import {LinkedInGlyph, GitHubGlyph} from "@/components/social/icon";
import ClockGauge from '@/components/echarts/ClockGauge';
import Link from "next/link";
import Image from "next/image";
import { CV_DOWNLOAD, CV_VIEW } from "@/lib/links";

import Footer from "@/components/Footer";
import { Suspense } from "react";


export const dynamic = "force-static";


const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];


const TL: TimelineItem[] = [
  { time: "Jan 2022 – Dec 2024",company: "PMO Prakerja",city: "Jakarta, Indonesia", title: "Head of Data & Analytics"
    , desc: "Led the team and analytics strategy while working with Ops & Engineering to clean up tracking, enforce SLA-based pipelines, and roll out self-serve dashboards. The result: less manual work, lower latency, and fewer fire drills.", href: "/projects" },
  { time: "Jul 2020 – Dec 2021",company: "PMO Prakerja",city: "Jakarta, Indonesia",    title: "Manager Data Analyst"
    , desc: "Managed the organization’s end-to-end data function—built the data team from zero, set strategy and roadmaps for platform, analytics, and governance, and aligned KPIs across divisions. Scaled experimentation and decision support, improving reliability, time-to-insight, and cost." },
  { time: "Feb 2019 – Jun 2020",company: "PT. Global Pay Indonesia - Cashbac, Instant Rewards App",city: "Jakarta, Indonesia",    title: "Product Data Analyst"
    , desc: "Owned product analytics end-to-end: defined the event taxonomy and tracking plan, partnered with Engineering to instrument reliable events, and built funnels and KPI readouts for PMs. Led the migration to a unified CDP and ran A/B tests plus cohort analyses to diagnose drop-offs, improve activation, and lift retention." },
  { time: "Sep 2017 – Feb 2019",company: "KATA.AI - Conversational AI",city: "Jakarta, Indonesia",    title: "Data Analyst"
    , desc: "Delivered customer segmentation, funnel and retention dashboards, and operational insights for conversational AI products. Automated recurring reports—weekly packs, cohort refreshes, and KPI digests—reducing manual work and speeding decision cycles across product and ops." },
  { time: "Dec 2016 – Aug 2017",company: "UNIMATRIX UG - Student service",city: "Berlin, Germany",    title: "Business Development"
    , desc: "Handled accounting and day-to-day operations, coordinated student events end-to-end, and managed the website development cycle (requirements, vendor coordination, content updates)—keeping budgets and timelines on track." },
  { time: "Aug 2015 – Nov 2016",company: "Lamudi GmBH - Internet & Real Estate",city: "Berlin, Germany",    title: "IT Developer and Feed Management  (Internship & working student)"
    , desc: "Managed feed listings from global partners—mapping formats, scheduling imports, and resolving mismatches. Automated ingestion, validation, and alerts to keep marketplace data accurate and up-to-date at scale." },
  { time: "Mei 2016 – Dec 2015",company: "Yesbossnow - SMS Virtual Assistance",city: "Berlin, Germany",    title: "Business Intelligence Analyst (Remote)"
    , desc: "Set up KPIs and automated reporting for a virtual assistant service. Delivered weekly insights for operations and growth teams." },
];

// semua skill (default)
const ALL_SKILLS: SkillDatum[] = [
  { name: "Python", value: 90 },
  { name: "NoSQL", value: 70 },
  { name: "Airflow", value: 75 },
  { name: "SQL", value: 90 },
  { name: "A/B Testing", value: 86 },
  { name: "Geospatial", value: 75 },
  { name: "Data Analytics", value: 90 },
  { name: "Data Engineering", value: 85 },
  { name: "Data Analysis", value: 90 },
  { name: "Data Science", value: 80 },
];

// mapping subset per item timeline (index 0..)
const SKILLS_BY_INDEX: Record<number, SkillDatum[]> = {
  0: [
    { name: "Leadership", value: 85 },
    { name: "Data Analysis", value: 90 },
    { name: "Experimentation", value: 92 },
    { name: "BigQuery", value: 86 },
    { name: "Customer Data Platform", value: 86 },
  ],
  1: [
    { name: "Data Engineering", value: 88 },
    { name: "Airflow", value: 82 },
    { name: "SQL", value: 92 },
    { name: "Cloud", value: 88 },
    { name: "Automation", value: 88 },
    { name: "Data Analysis", value: 88 },
  ],
  2: [
    { name: "Python", value: 80 },
    { name: "SQL", value: 88 },
    { name: "Metabase", value: 90 },
    { name: "Customer Data Platform", value: 70 },
  ],
  3: [
    { name: "Python", value: 75 },
    { name: "Data Analytics", value: 88 },
    { name: "Automation", value: 78 },
    { name: "PowerBI", value: 72 },
  ],
  4: [
    { name: "Business Development", value: 75 },
    { name: "Accounting", value: 88 },
    { name: "Event Management", value: 78 },
    { name: "Business Strategy", value: 72 },
    { name: "Web Development", value: 72 },
  ],
  5: [
    { name: "Shell Scripting", value: 20 },
    { name: "XML/ JSON", value: 88 },
    { name: "Feed Management", value: 78 },
    { name: "Data Integration", value: 72 },
    { name: "Partner Integration (Feeds/API)", value: 72 },
  ],
  6: [
    { name: "SQL", value: 20 },
    { name: "Excel", value: 88 },
    { name: "NoSQL", value: 78 },
    { name: "holistics.io", value: 72 },
    { name: "Apache Zeppelin", value: 72 },

  ],
};


export default function HomePage() {
  

  return (
    <>
      {/* SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      
      {/* Dot nav + scroll spy */}
      <div className="dotnav">
        <Suspense fallback={null}>
          <ScrollSpy items={SECTIONS} />
        </Suspense>
      </div>




      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* GitHub (bulat) */}
        <a
          href="https://github.com/fandifandi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          data-gtag-event="github_clicked"
          data-gtag-param-location="navbar"
          data-gtag-param-variant="icon"
          className="inline-flex items-center justify-center size-9 rounded-full border border-[color:var(--border)] hover:bg-[color:var(--card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition"
        >
          <GitHubGlyph className="w-4 h-4" />
        </a>

        <a
          href="https://www.linkedin.com/in/afandi-afandi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          data-gtag-event="linkedin_clicked"
          data-gtag-param-location="navbar"
          data-gtag-param-variant="icon"
          className="inline-flex items-center justify-center size-9 rounded-full border border-[color:var(--border)] hover:bg-[color:var(--card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition"
        >
          <LinkedInGlyph className="w-4 h-4" />
        </a>

        {/* Toggle Light/Dark */}
        <ThemeIconToggle />
      </div>


      {/* SCROLLER container */}
      <main id="scroller" className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth snap-y snap-proximity">
        {/* ===== HERO ===== */}
        
      <section id="hero" className="snap-start min-h-screen flex items-center mesh pt-16">
                <div className="max-w-7xl mx-auto w-full px-6">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h1 className="text-5xl font-extrabold leading-[1.1]">
                        I turn raw <span className="text-emerald-400">data</span> into stories that drive{" "}
                        <span className="text-violet-400">impact</span>.
                      </h1>
                      <p className="mt-3 text-[color:var(--muted)] max-w-2xl">
                        From signal to strategy: clear metrics, thoughtful experiments, and outcomes that matter. Alignment comes first, evidence follows, and product choices are tracked to adoption, retention, and revenue.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a href="#projects" data-gtag-event="explore_worked_viewed" data-gtag-param-location="hero" data-gtag-param-variant="primary" data-gtag-param-target="section_viewed" className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-violet-500 font-semibold">
                          Explore Work
                        </a>
                        <a href="#contact" data-gtag-event="contact_viewed" data-gtag-param-location="hero" data-gtag-param-variant="primary" data-gtag-param-target="section_viewed" className="px-4 py-2 rounded-xl frost border border-[color:var(--border)]">
                          Contact
                        </a>

                        <a
                            href={CV_VIEW}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-gtag-event="cv_viewed"
                            data-gtag-param-location="hero"
                            data-gtag-param-variant="primary"
                            data-gtag-param-target="cv_viewed"
                            className="px-4 py-2 rounded-xl border border-[color:var(--border)] hover:bg-[color:var(--card)]"
                          >
                            VIEW CV (PDF)
                          </a>
                      </div>

                      {/* FIX: grid stats 2 kolom di mobile supaya gak sempit */}
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                          <div className="text-2xl font-bold text-emerald-400">8+ Years</div>
                          <div className="text-xs opacity-80">Experience in Data Fields</div>
                        </div>
                        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                          <div className="text-2xl font-bold text-emerald-400">-23%</div>
                          <div className="text-xs opacity-80">Cost/query (BQ)</div>
                        </div>
                        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 col-span-2 sm:col-span-1">
                          <div className="text-2xl font-bold text-emerald-400">5h → 1h</div>
                          <div className="text-xs opacity-80">Insight turnaround</div>
                        </div>
                      </div>
                    </div>


                    {/* Mobile / tablet: tampil di bawah teks, ukuran lebih kecil */}
                    <div className="mt-8 flex justify-center lg:hidden pointer-events-none select-none">
                      <MethodologyCycleSVG
                        size={300} // ~280–320 cocok untuk hp
                        methodName="Signal → Strategy Cycle"
                        accent="#22c55e"
                        startAccent="#8b5cf6"
                      />
                    </div>

                    {/* Desktop: di kolom kanan dengan ukuran penuh */}
                    <div className="hidden lg:flex justify-center lg:justify-end pointer-events-none select-none">
                      <MethodologyCycleSVG
                        size={520}
                        methodName="Signal → Strategy Cycle"
                        accent="#22c55e"
                        startAccent="#8b5cf6"
                      />
                    </div>

                  </div>
                </div>

                <BackToTop targetId="scroller" />
              </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="snap-start min-h-screen flex items-start pt-20 sm:pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[320px,1fr] gap-8 items-start">
              <div className="grid md:grid-cols-[minmax(220px,280px),1fr] lg:grid-cols-[320px,1fr] gap-8 items-start">
                <img
                  loading="lazy"
                  src="https://media.licdn.com/dms/image/v2/D5603AQEtK7MvSGPaMw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731997776943?e=1759968000&v=beta&t=KwtrNYtKrquynIrjCz183aNHIOquYoRPqqDX0p0c25U"
                  alt="Profile"
                  className="
                    rounded-2xl border border-[color:var(--border)]
                    w-full
                    md:h-[280px] lg:h-[320px]
                    object-cover object-[50%_10%]
                  "
                />
              </div>

              <article className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-6">
                <h2 className="text-3xl font-bold">About Me</h2>
                <p className="mt-3 opacity-90">
                  Started in scrappy startups, building the first versions of tracking, metrics, dashboards, and automated reporting for chatbots and consumer apps. 
                  <br /><br />Then stepped up to lead analytics for a national program—rebuilding event tracking, tightening data quality, and shipping A/B tests with clear guardrails so results hold up. The work turned messy pipelines into reliable, decision-ready data. 
                  <br /><br />Today the focus is where data, product, and operations meet: crisp shared metrics, disciplined experiments, and lean, cost-aware data ops—so teams can move fast with confidence.
                </p>

                <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">Metric Frameworks & Clarity</div>
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">Experimentation & Causal Analysis</div>
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">Analytics Engineering</div>
                </div>
                <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">Decision Storytelling</div>
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">Product Strategy & Prioritization</div>
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">Cost & Process Efficiency</div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="timeline" className="snap-start min-h-screen flex items-start pt-20 sm:pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <TimelineSkills items={TL} allSkills={ALL_SKILLS} skillsByIndex={SKILLS_BY_INDEX} />
          </div>
        </section>

        <section id="projects" className="snap-start min-h-screen flex items-start pt-20 sm:pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <HomeProjectsGridSimple projects={allProjects} />
          </div>
        </section>

        <section id="contact" className="snap-start min-h-screen flex items-start pt-20 sm:pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <ContactSimple
              email="ichbinfnd@gmail.com"
              links={[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/afandi-afandi/" },
                { label: "GitHub", href: "https://github.com/fandifandi" },
                { label: "X", href: "https://x.com/hifandii" },
                { label: "Instagram", href: "https://www.instagram.com/fandifandii" },
                { label: "CV", href: CV_DOWNLOAD },
                // Tambah WhatsApp (override event & param GA)
                /* {
                  label: "WhatsApp",
                  href: "https://wa.me/62?text=Hi%20Afandi%2C%20saya%20lihat%20portfolio%20Anda...",
                  gtagEvent: "outbound_click",
                  gtagParamLocation: "contact_page",
                  gtagParamVariant: "link",
                }, */
                // // Tambah Calendly (override event & param GA)
                /*
                {
                  label: "Calendly",
                  href: "https://calendly.com/afandi/30min",
                  gtagEvent: "outbound_click",
                  gtagParamLocation: "contact_page",
                  gtagParamVariant: "primary",
                },
                */
                
              ]}
            />
            

            {/* <footer className="mt-10 text-xs text-[color:var(--muted)]">
              © {new Date().getFullYear()} Afandi | <a href="https://hits.sh/fandifandi.github.io/cv/"><img alt="Hits" src="https://hits.sh/fandifandi.github.io/cv.svg?color=00fffa&labelColor=5ec09d"/></a>
            </footer> */}
          </div>
        </section>

      <section className="pt-2">
        <Footer />
      </section>
      </main>
      
    </>
    
  );
}
