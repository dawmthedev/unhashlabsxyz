import Container from "@/components/Container";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, MoveRight, Slack, Mail, Send } from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "@/styles/Home.module.css";
import VanillaTilt from "vanilla-tilt";
import { automations } from "@/data/automations";

const tags = [
  "AI-Driven",
  "CRM Automation",
  "Plug & Play",
  "Growth Systems",
  "Instant Setup",
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
      
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const tiltEls: HTMLElement[] = Array.from(document.querySelectorAll(".tilt"));
    VanillaTilt.init(tiltEls, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Hero */}
        <section
          id="home"
          data-scroll-section
          className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center py-20"
        >
          <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center space-y-10 px-4 text-center">
  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
    className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 shadow-2xl">

    <div data-scroll data-scroll-direction="horizontal" data-scroll-speed=".09" className="flex flex-wrap justify-center gap-3">
      {tags.map((t) => (
        <span key={t} className={`${styles.pill} mx-1`}>
          {t}
        </span>
      ))}
    </div>
    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
      Automate Your Business. Scale Faster.
    </h1>
    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
      Metaswap Labs helps businesses save time, grow revenue, and scale operations through plug-and-play automation systems.
    </p>
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
      <Link href="https://calendly.com/metaswapllc/30min" passHref>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 mt-6"
        >
          Get Automated <ChevronRight className="ml-1 h-4 w-4" />
        </motion.button>
      </Link>
    </div>
    <div className={cn(styles.scroll, isScrolled && styles["scroll--hidden"])}>
      Scroll to discover <TriangleDownIcon className="mt-1 animate-bounce" />
    </div>
  </motion.div>
</div>
        </section>

        {/* Automation Library Preview */}
        <section id="library" data-scroll-section className="my-32 space-y-10 text-center">
          <h2 className="text-4xl font-semibold tracking-tight xl:text-6xl">What Can You Automate?</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
            {automations.map((auto) => (
              <div
                key={auto.title}
                className="tilt flex flex-col items-start rounded-md glass p-6 text-left shadow-md fade-in"
              >
                <div className="flex items-center space-x-3">
                  {auto.icon === "tiktok" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M12.5 2c1.385 0 2.879.47 4 .969v3.157c-.882-.321-1.942-.614-3-.708v8.631a4 4 0 11-4-4h.5V7.09A8.501 8.501 0 0012.5 2z" />
                    </svg>
                  )}
                  {auto.icon === "slack" && <Slack className="h-5 w-5" />}
                  {auto.icon === "mail" && <Mail className="h-5 w-5" />}
                  {auto.icon === "send" && <Send className="h-5 w-5" />}
                  <h3 className="text-lg font-medium tracking-tight text-foreground">{auto.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{auto.subtitle}</p>
                <Link
                  href="https://calendly.com/metaswapllc/30min"
                  passHref
                  className="mt-4 inline-flex items-center text-primary hover:underline"
                >
                  Talk to Us <MoveRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" data-scroll-section className="my-32 space-y-10 text-center">
          <h2 className="text-4xl font-semibold tracking-tight xl:text-6xl">How Metaswap Works</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl font-semibold">1. You Tell Us What You Need</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl font-semibold">2. We Enable the Automation</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl font-semibold">3. You Watch Results Happen</span>
            </div>
          </div>
          <p className="mx-auto max-w-xl text-muted-foreground">No dashboards. No headaches. Just results.</p>
        </section>

        {/* Benefits */}
        <section id="benefits" data-scroll-section className="my-32 space-y-10 text-center">
          <h2 className="text-4xl font-semibold tracking-tight xl:text-6xl">Why Businesses Choose Metaswap</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-md glass p-6 fade-in">
              <span className="text-xl font-semibold">💼 100+ Hours Saved Per Month</span>
            </div>
            <div className="rounded-md glass p-6 fade-in">
              <span className="text-xl font-semibold">📈 3x Lead Response Speed</span>
            </div>
            <div className="rounded-md glass p-6 fade-in">
              <span className="text-xl font-semibold">🤖 24/7 Automation Reliability</span>
            </div>
            <div className="rounded-md glass p-6 fade-in">
              <span className="text-xl font-semibold">🛠️ Hands-Off Setup</span>
            </div>
          </div>
        </section>

        {/* Why Metaswap Labs */}
        <section id="why" data-scroll-section className="my-32 space-y-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight xl:text-6xl">More Than a Tool. A Team of Automation Strategists.</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            We’ve built automations for creators, founders, and teams who don’t have time to micromanage software. We deliver full-stack AI automations with real business impact — without the guesswork or noise.
          </p>
        </section>

        {/* Social Proof */}
        <section id="testimonials" data-scroll-section className="my-32 space-y-10 bg-gradient-to-b from-background via-transparent to-background py-20 text-center">
          <h2 className="text-4xl font-semibold tracking-tight xl:text-6xl text-foreground">What Our Clients Say</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
            <div className="rounded-md glass p-6 fade-in">
              <p className="text-sm text-muted-foreground">“My sales process is 100% automated now — I don’t even open the CRM manually.”</p>
            </div>
            <div className="rounded-md glass p-6 fade-in">
              <p className="text-sm text-muted-foreground">“It feels like I hired 3 new team members. This is the real AI revolution.”</p>
            </div>
            <div className="rounded-md glass p-6 fade-in">
              <p className="text-sm text-muted-foreground">“Metaswap saved us from spending $20k/month on cold outreach tools.”</p>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section id="cta" data-scroll-section className="my-32 glass py-20 text-center fade-in">
          <h2 className="text-3xl font-semibold text-background">Ready to See What You Can Automate?</h2>
          <Link href="https://calendly.com/metaswapllc/30min" passHref>
            <button className="mt-6 rounded-md bg-background px-6 py-3 text-primary sm:text-lg">
              Get Automated →
            </button>
          </Link>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
