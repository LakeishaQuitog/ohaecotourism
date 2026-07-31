import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import heroKoolau from "@/assets/hero-koolau.jpg.asset.json";
import ohaLogo from "@/assets/oha-logo.png.asset.json";
import kokuaFarmAsset from "@/assets/kokua-learning-farm.jpeg.asset.json";
import kakooOiwiAsset from "@/assets/kakoo-oiwi-taro.jpeg.asset.json";
import waiheeDunesAsset from "@/assets/waihee-dunes.jpg.asset.json";
import kahiliBeachAsset from "@/assets/kahili-beach.jpeg.asset.json";

const kokuaFarm = kokuaFarmAsset.url;
const kakooOiwi = kakooOiwiAsset.url;
const waiheeDunes = waiheeDunesAsset.url;
const kahiliBeach = kahiliBeachAsset.url;

const TITLE = "\u2018Oha Ecotourism \u2014 Travel Hawai\u02BBi with Intention";
const DESCRIPTION =
  "A free directory of verified, community-led sustainability initiatives across Hawai\u02BBi. Save your own impact plan \u2014 no login, no fees.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "oha_impact_plan";
const FORM_URL = "https://forms.gle/y2eaPc9ptY1UDL37A";

const items = [
  {
    id: "item-1",
    name: "K\u014Dkua Learning Farm",
    meta: "Hale\u02BBiwa, O\u02BBahu \u2022 Verified Local",
    img: kokuaFarm,
    alt: "Volunteers planting crops at K\u014Dkua Learning Farm in Hale\u02BBiwa, O\u02BBahu",
    shape: "blob-tr",
  },
  {
    id: "item-2",
    name: "K\u0101ko\u02BBo \u02BB\u014Ciwi",
    meta: "He\u02BBeia, O\u02BBahu \u2022 Native-Led Taro Restoration",
    img: kakooOiwi,
    alt: "Community volunteers in a taro lo\u02BBi patch at K\u0101ko\u02BBo \u02BB\u014Ciwi in He\u02BBeia, O\u02BBahu",
    shape: "blob-bl",
  },
  {
    id: "item-3",
    name: "Waihe\u02BBe Coastal Dunes",
    meta: "Waihe\u02BBe, Maui \u2022 Wildlife Protection",
    img: waiheeDunes,
    alt: "Volunteers working at Waihe\u02BBe Coastal Dunes & Wetland Refuge in Maui",
    shape: "blob-tl",
  },
  {
    id: "item-4",
    name: "K\u0101hili Beach Preserve",
    meta: "K\u012Blauea, Kaua\u02BBi \u2022 Coastal Preservation",
    img: kahiliBeach,
    alt: "Volunteers working at K\u0101hili Beach Preserve in K\u012Blauea, Kaua\u02BBi",
    shape: "blob-br",
  },
];

const steps = [
  {
    n: "1",
    title: "We Vet",
    body: "We personally interviewed work to make sure every listing is verified local and island-operated.",
  },
  {
    n: "2",
    title: "You Discover",
    body: "Browse authentic farms, cultural projects and workdays across O\u02BBahu, Maui, Kaua\u02BBi and Hawai\u02BBi Island.",
  },
  {
    n: "3",
    title: "They Thrive",
    body: "Tick the initiatives you want to support. Your Impact Plan saves straight to your browser \u2014 no login, no app download.",
  },
];

const faqs = [
  {
    q: "Is this directory really 100% free? What\u2019s the catch?",
    a: "Yes, it costs $0. We do not charge travelers to access the directory, nor do we take commissions from small local vendors to be listed. Our sole mission is keeping tourist dollars in local hands.",
  },
  {
    q: "Will these recommendations work for my specific vacation area?",
    a: "Yes. The directory includes verified choices across all major islands (O\u02BBahu, Maui, Kaua\u02BBi and Hawai\u02BBi Island), organized by category so you can easily fit them into your travel schedule.",
  },
];

function Index() {
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setSaved(stored);
    } catch (err) {
      console.error("Error loading saved plan:", err);
    }
    setHydrated(true);
  }, []);

  const toggle = (id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={ohaLogo.url}
            alt="&lsquo;Oha Ecotourism logo: taro leaves in a circle"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
          />
          <span className="font-display text-2xl italic leading-none">&lsquo;Oha Ecotourism</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
          <a href="#standard" className="transition-opacity hover:opacity-60">
            Our Standard
          </a>
          <a href="#directory" className="transition-opacity hover:opacity-60">
            Directory
          </a>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            Get Involved
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="z-10 lg:col-span-7">
            <span className="mb-8 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
              The Directory of Verified Impact
            </span>
            <h1 className="font-display mb-10 text-7xl leading-[0.8] tracking-tighter italic lg:text-[10rem]">
              Travel with <br />
              <span className="text-accent">Intention.</span>
            </h1>
            <p className="mb-12 max-w-md text-xl leading-relaxed opacity-90">
              &lsquo;Oha Ecotourism connects conscious travelers with verified sustainability initiatives across
              the Hawaiian Islands. Explore deeper, learn from the land, and leave a lighter footprint.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="#directory"
                className="rounded-full bg-primary px-10 py-5 font-medium text-primary-foreground transition-all hover:-translate-y-1 hover:bg-primary-deep"
              >
                Start Exploring
              </a>
              <a
                href="#standard"
                className="rounded-full border-2 border-primary px-10 py-5 font-medium transition-colors hover:bg-secondary"
              >
                Our Mission
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="aspect-[4/5] rotate-2 overflow-hidden rounded-[4rem] rounded-tl-none bg-secondary shadow-2xl">
              <img
                src={heroKoolau.url}
                alt="Misty green Hawaiian valley with tropical foliage at sunrise"
                width={800}
                height={1008}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-secondary px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:pb-12">
            <div className="flex flex-col justify-center rounded-[3rem] rounded-br-none bg-background p-12 shadow-sm">
              <h2 className="font-display mb-6 text-4xl leading-tight italic">
                &ldquo;I wanted to help, but fragmented information and corporate greenwashing made it
                impossible to know who was actually doing the work.&rdquo;
              </h2>
              <p className="text-xs font-bold tracking-widest text-accent uppercase">
                &mdash; Mindful travelers
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-[3rem] rounded-tl-none bg-primary p-12 text-primary-foreground shadow-xl md:translate-y-12">
              <h2 className="font-display mb-6 text-4xl leading-tight italic">
                &ldquo;We&rsquo;re doing real work on the land, but we struggle with digital visibility and
                finding people to help drive the mission.&rdquo;
              </h2>
              <p className="text-xs font-bold tracking-widest uppercase opacity-60">
                &mdash; Local initiatives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="standard" className="mx-auto max-w-6xl scroll-mt-12 px-6 py-32">
        <div className="mb-24 text-center">
          <h2 className="font-display text-6xl italic">The &lsquo;Oha Ecotourism Standard</h2>
        </div>
        <div className="grid gap-16 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="group text-center">
              <div className="font-display mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-4xl italic transition-transform group-hover:scale-110">
                {s.n}
              </div>
              <h3 className="mb-4 text-2xl font-semibold">{s.title}</h3>
              <p className="leading-relaxed opacity-80">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIRECTORY */}
      <section id="directory" className="scroll-mt-12 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="font-display mb-4 text-6xl italic">Explore the Directory</h2>
              <p className="text-lg opacity-70">
                Tick the places you want to support. Your plan saves right here in your browser.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 shadow-sm">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
              <span className="text-sm font-medium tracking-widest uppercase">
                {hydrated ? saved.length : 0} Initiatives Saved
              </span>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => {
              const on = saved.includes(item.id);
              return (
                <article key={item.id} className={i % 2 === 1 ? "group lg:translate-y-12" : "group"}>
                  <div
                    className={`relative mb-6 aspect-[3/4] overflow-hidden ${item.shape} bg-secondary shadow-md transition-shadow hover:shadow-xl`}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                      width={850}
                      height={650}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`${on ? "Remove" : "Add"} ${item.name} ${on ? "from" : "to"} your impact plan`}
                      onClick={() => toggle(item.id)}
                      className={`absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${
                        on
                          ? "bg-accent text-accent-foreground"
                          : "bg-card/90 opacity-70 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:opacity-100"
                      }`}
                    >
                      <Check className="h-6 w-6" strokeWidth={2.5} />
                    </button>
                  </div>
                  <h3 className="font-display mb-1 text-2xl">{item.name}</h3>
                  <p className="text-xs font-bold tracking-widest text-accent uppercase">{item.meta}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-32">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[4rem] border-4 border-primary bg-card p-12 text-center shadow-2xl md:p-16">
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent" />
          <h2 className="font-display mb-6 text-5xl italic">Always Free.</h2>
          <p className="mb-10 text-lg leading-relaxed opacity-80">
            Impact tools shouldn&rsquo;t have a price tag. We don&rsquo;t charge travelers and we take no
            commission from local vendors. No hidden fees, no paywalls.
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-primary py-5 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            Get Involved
          </a>
          <p className="mt-6 text-sm font-medium tracking-widest uppercase opacity-50">
            No account required
          </p>
        </div>
      </section>

      {/* B2B PARTNERS */}
      <section className="bg-secondary px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-background px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
              For Hotels, Resorts & Airlines
            </span>
            <h2 className="font-display mb-6 text-5xl italic md:text-6xl">A B2B Partner for Impact.</h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed opacity-80">
              &lsquo;Oha Ecotourism works behind the scenes with hospitality and travel brands to deliver
              authentic, community-led experiences that meet modern CSR and ESG goals.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[3rem] rounded-br-none bg-background p-10 shadow-sm">
              <h3 className="font-display mb-4 text-2xl italic">Turnkey CSR &amp; ESG Compliance</h3>
              <p className="leading-relaxed opacity-80">
                Hotels need quantifiable community impact metrics for corporate ESG reporting and state
                environmental alignment. We handle the proof points so you don&rsquo;t have to.
              </p>
            </div>
            <div className="rounded-[3rem] rounded-bl-none bg-primary p-10 text-primary-foreground shadow-xl">
              <h3 className="font-display mb-4 text-2xl italic">Elevated Guest Loyalty</h3>
              <p className="leading-relaxed opacity-90">
                Modern travelers seek authentic, non-touristy experiences that align with the Hawai&lsquo;i
                Tourism Authority&rsquo;s M&#257;lama Hawai&lsquo;i framework. We connect them to the real thing.
              </p>
            </div>
            <div className="rounded-[3rem] rounded-tl-none bg-background p-10 shadow-sm">
              <h3 className="font-display mb-4 text-2xl italic">Operational Simplicity</h3>
              <p className="leading-relaxed opacity-80">
                Avoid the liability, vetting overhead, and scheduling headaches of coordinating directly with
                dozens of small non-profits. One partner. One pipeline. Real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="font-display text-5xl italic">Questions &amp; Clarity</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group cursor-pointer rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary"
            >
              <summary className="flex list-none items-center justify-between text-xl font-semibold">
                <span>{f.q}</span>
                <span className="text-2xl text-accent transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-6 text-lg leading-relaxed opacity-70">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[5rem] bg-primary px-8 py-24 text-center text-primary-foreground shadow-2xl md:px-12">
          <div className="relative z-10">
            <h2 className="font-display mb-10 text-6xl leading-none italic md:text-9xl">
              E M&#257;lama I Ka &#699;&#256;ina
            </h2>
            <p className="mx-auto mb-14 max-w-xl text-2xl italic opacity-80">
              To care for the land that feeds us. Make your trip count for the places that need it.
            </p>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-accent px-16 py-6 text-xl font-bold text-accent-foreground shadow-xl transition-all hover:bg-background hover:text-accent"
            >
              Join the Movement
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <img
            src={ohaLogo.url}
            alt="&lsquo;Oha Ecotourism logo"
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-16 object-contain"
          />
          <p className="font-display text-3xl italic">&lsquo;Oha Ecotourism</p>
          <p className="max-w-md text-sm leading-relaxed opacity-70">
            A free directory of verified, community-led sustainability initiatives across Hawai&lsquo;i.
          </p>
        </div>
      </footer>
    </main>
  );
}
