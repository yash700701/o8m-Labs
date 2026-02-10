import HeroSlider from "@/components/hero/HeroSlider"; 
import { fetchHeroSlides } from "@/lib/api";

export default async function HomePage() {
  const slides = await fetchHeroSlides();

  return (
    <div className="w-full bg-white pt-16">
      <main className="bg-white text-gray-900">
      <HeroSlider slides={slides} />

      {/* SOLUTIONS */}
      <section
        id="solutions"
        className="mx-auto max-w-7xl pb-20"
      >
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            Solutions
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            A modern content engine for ambitious teams
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Light, fast, and SEO-ready systems built to keep momentum without
            slowing teams down.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              id: "01",
              title: "Narrative Systems",
              desc:
                "Positioning, voice, and launch narratives that stay consistent across channels.",
            },
            {
              id: "02",
              title: "SEO Content Ops",
              desc:
                "CMS-driven publishing with dynamic metadata, sitemaps, and OG coverage.",
            },
            {
              id: "03",
              title: "Launch Pages",
              desc:
                "Conversion-focused landing experiences designed to ship quickly.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-400 bg-gray-100 p-8 transition hover:border-gray-200 hover:shadow-lg"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-gray-500">
                {item.id}
              </span>
              <h3 className="mt-6 text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="bg-gray-100 py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Services
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Launch faster with lighter systems
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We design and ship modular content infrastructure that scales from
              idea to production.
            </p>

            <a
              href="/blog"
              className="mt-8 inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
            >
              Read the playbook →
            </a>
          </div>

          <div className="rounded-2xl bg-white p-10 shadow-sm">
            <h3 className="text-lg font-semibold">
              What’s included
            </h3>

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "CMS-ready hero + blog",
                  desc: "Slide updates and SEO content without code changes.",
                },
                {
                  title: "Modern UI kit",
                  desc:
                    "Clean, light, and responsive layout building blocks.",
                },
                {
                  title: "Performance focus",
                  desc:
                    "Lazy-loaded media and lean payloads for speed.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="font-medium">
                    {item.title}
                  </p>
                  <p className="mt-1 text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="mx-auto max-w-7xl pt-24"
      >
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-gray-900 p-12 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-gray-300">
              Let’s build
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Ship your next launch in weeks
            </h2>
            <p className="mt-3 text-gray-300">
              A modern, light UI paired with a CMS that your team can own.
            </p>
          </div>

          <a
            href="mailto:hello@o8mlabs.com"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
          >
            Start a project
          </a>
        </div>
      </section>
    </main>
    </div>
  );
}
