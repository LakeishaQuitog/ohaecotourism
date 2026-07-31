import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import kokuaFarm from "@/assets/kokua-learning-farm.jpg";
import kakooOiwi from "@/assets/kakoo-oiwi-taro.jpg";
import waiheeDunes from "@/assets/waihee-dunes.jpg";
import kahiliBeach from "@/assets/kahili-beach.jpg";

const TITLE = "\u2018Oha | Mindful Travel in Hawai\u02BBi";
const DESCRIPTION =
  "Verified local sustainability initiatives in Hawai\u02BBi. Browse vetted spots and save a free personalized impact plan in your browser.";

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

const sampleItems = [
  {
    id: "item-1",
    name: "K\u014Dkua Learning Farm",
    location: "Hale\u02BBiwa, O\u02BBahu",
    badge: "Verified Local",
    imgUrl: kokuaFarm,
    altText: "Volunteers planting crops at K\u014Dkua Learning Farm in Hale\u02BBiwa, O\u02BBahu",
  },
  {
    id: "item-2",
    name: "K\u0101ko\u02BBo \u02BB\u014Ciwi: Traditional Taro Farm Restoration",
    location: "He\u02BBeia, O\u02BBahu",
    badge: "Native-Led",
    imgUrl: kakooOiwi,
    altText:
      "Community volunteers in taro lo\u02BBi patch at K\u0101ko\u02BBo \u02BB\u014Ciwi in He\u02BBeia, O\u02BBahu",
  },
  {
    id: "item-3",
    name: "Waihe\u02BBe Coastal Dunes & Wetland Refuge",
    location: "Waihe\u02BBe, Maui",
    badge: "Wildlife Protection",
    imgUrl: waiheeDunes,
    altText: "Volunteers working at Waihe\u02BBe Coastal Dunes & Wetland Refuge in Maui",
  },
  {
    id: "item-4",
    name: "K\u0101hili Beach Preserve",
    location: "K\u012Blauea, Kaua\u02BBi",
    badge: "Coastal Preservation",
    imgUrl: kahiliBeach,
    altText: "Volunteers working at K\u0101hili Beach Preserve in K\u012Blauea, Kaua\u02BBi",
  },
];

function Index() {
  const [savedPlan, setSavedPlan] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setSavedPlan(stored);
    } catch (err) {
      console.error("Error loading saved plan:", err);
    }
    setHydrated(true);
  }, []);

  const toggle = (id: string, checked: boolean) => {
    setSavedPlan((prev) => {
      const next = checked ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="oha-page">
      {/* SECTION 1: HEADLINE */}
      <section className="hero">
        <div className="container">
          <div className="brand-title">&lsquo;Oha</div>
          <h1>
            Verifying authentic local sustainability initiatives and giving them direct visibility to
            mindful travelers.
          </h1>
          <p className="subhead">
            Select local spots from our vetted list and save a personalized itinerary directly in your
            browser.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="problem-section">
        <div className="container">
          <h2>The Problem</h2>
          <p className="subhead" style={{ marginBottom: "1rem" }}>
            Hard to find for travelers. Hard to grow for locals.
          </p>

          <div className="problem-grid">
            <div className="quote-box">
              <p>
                <strong>For Mindful Travelers:</strong> Eco-conscious visitors to Hawai&#699;i struggle to
                find authentic, vetted sustainable businesses, voluntourism workdays (M&#257;lama
                Hawai&#699;i projects), and zero-waste initiatives due to fragmented information, lack of
                centralized discovery, and widespread corporate greenwashing.
              </p>
            </div>

            <div className="quote-box green">
              <p>
                <strong>For Local Initiatives:</strong> Meanwhile, sustainability initiatives across
                Hawai&#699;i struggle with digital visibility, marketing reach, and finding enough
                dedicated people to help drive their mission forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT THEY GET & COST */}
      <section className="solution-section">
        <div className="container">
          <h2>How &lsquo;Oha Works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Browse Vetted Spots</h3>
              <p>Read our curated list of authentic, island-owned businesses, farms, and cultural projects.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Build Your Plan</h3>
              <p>Check the box on initiatives or businesses you want to support during your stay.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Save to Browser</h3>
              <p>
                Your &quot;Impact Plan&quot; stays saved right here in your browser&mdash;no login or app
                download needed.
              </p>
            </div>
          </div>

          {/* INTERACTIVE DIRECTORY DEMO */}
          <div className="app-preview">
            <h3>Try It Now: Build Your Impact Plan</h3>
            <p>
              <small>Click the top-right checkbox on any card to save it to your browser plan.</small>
            </p>

            <div className="cards-grid">
              {sampleItems.map((item) => (
                <div className="tour-card" key={item.id}>
                  <div className="card-image-wrapper">
                    <img
                      className="card-img"
                      src={item.imgUrl}
                      alt={item.altText}
                      loading="lazy"
                      width={850}
                      height={650}
                    />
                    <span className="card-badge">{item.badge}</span>
                    <label className="card-checkbox-btn" htmlFor={item.id} title="Save to Impact Plan">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={savedPlan.includes(item.id)}
                        onChange={(e) => toggle(item.id, e.target.checked)}
                      />
                    </label>
                  </div>
                  <div className="tour-card-body">
                    <div className="tour-card-title">{item.name}</div>
                    <div className="tour-card-location">
                      <span>&#128205; {item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="saved-summary">
              <strong>Your Saved Plan Items: </strong>
              <span className="saved-count">{hydrated ? savedPlan.length : 0}</span>
            </div>
          </div>

          <div className="price-box">
            <h3>Simple Pricing</h3>
            <div className="price-number">$0 / Free</div>
            <p>Access the core impact directory completely free of charge. No hidden fees or paywalls.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROOF */}
      <section className="proof-section">
        <div className="container">
          <h2>Proof</h2>
          <div className="stat-badge">Real Field Research</div>
          <div className="graphic-container">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2D5A27"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p>
            We personally interviewed over 25 Hawaii small business owners and native-led nonprofits to
            build this directory. Every single business on our list is verified local, island-operated, and
            directly supports community projects.
          </p>
        </div>
      </section>

      {/* SECTION 5: OBJECTIONS ANSWERED */}
      <section className="faq-section">
        <div className="container">
          <h2>Common Questions</h2>

          <div className="faq-item">
            <h3>1. Is this directory really 100% free? What&apos;s the catch?</h3>
            <p>
              Yes, it costs $0. We do not charge travelers to access the directory, nor do we take
              commissions from small local vendors to be listed. Our sole mission is keeping tourist dollars
              in local hands.
            </p>
          </div>

          <div className="faq-item">
            <h3>2. Will these recommendations actually work for my specific vacation area?</h3>
            <p>
              Yes. The directory includes verified choices across all major islands (O&#699;ahu, Maui,
              Kaua&#699;i, and Hawai&#699;i Island), organized by category so you can easily fit them into
              your travel schedule.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: SIGN-UP CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Make Your Trip Count?</h2>
          <p>Get instant access to the full directory.</p>
          <br />
          <a
            id="cta-button"
            href="https://forms.gle/y2eaPc9ptY1UDL37A"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Get involved
          </a>
        </div>
      </section>
    </div>
  );
}
