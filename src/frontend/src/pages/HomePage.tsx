import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  DollarSign,
  GraduationCap,
  Library,
  MapIcon,
  Rocket,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const cards = [
  {
    href: "/roadmap" as const,
    icon: MapIcon,
    label: "Roadmap",
    desc: "Class 11 to MTech journey",
    color: "text-primary",
    bg: "bg-primary/20",
  },
  {
    href: "/exams" as const,
    icon: BookOpen,
    label: "Entrance Exams",
    desc: "JEE, BITSAT, state exams & more",
    color: "text-secondary",
    bg: "bg-secondary/20",
  },
  {
    href: "/colleges" as const,
    icon: GraduationCap,
    label: "Colleges",
    desc: "IITs, NITs, IIITs & private",
    color: "text-accent",
    bg: "bg-accent/20",
  },
  {
    href: "/mentors" as const,
    icon: Users,
    label: "Mentors",
    desc: "Real engineers guiding you",
    color: "text-primary",
    bg: "bg-primary/20",
  },
  {
    href: "/startup" as const,
    icon: Rocket,
    label: "Startup Hub",
    desc: "Build your own company",
    color: "text-secondary",
    bg: "bg-secondary/20",
  },
  {
    href: "/ai-learning" as const,
    icon: Brain,
    label: "AI Learning",
    desc: "Use AI tools in real life",
    color: "text-accent",
    bg: "bg-accent/20",
  },
  {
    href: "/finance" as const,
    icon: DollarSign,
    label: "Finance Intel",
    desc: "Funding, equity & personal finance",
    color: "text-primary",
    bg: "bg-primary/20",
  },
  {
    href: "/resources" as const,
    icon: Library,
    label: "Resources",
    desc: "Curated guides & articles",
    color: "text-secondary",
    bg: "bg-secondary/20",
  },
];

const stats = [
  { value: "1000+", label: "Engineering Colleges" },
  { value: "50+", label: "Entrance Exams" },
  { value: "200+", label: "Expert Mentors" },
  { value: "500+", label: "Resources" },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-engineerpath.dim_1600x800.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono tracking-widest uppercase bg-primary/30 text-primary border border-primary/60 rounded-full">
              AI-Powered Engineering Guidance Platform
            </span>
            <h1 className="font-display leading-[0.95] mb-6">
              <span className="block text-6xl md:text-8xl lg:text-9xl font-black text-gradient-cyan">
                Careera
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/90 mt-2">
                Engineer Your Future
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              From Class 11 aspirant to IIT graduate &mdash; get the complete
              roadmap, real mentor guidance, entrance exam prep, startup
              knowledge, and AI skills to build India&apos;s next generation of
              innovators.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground glow-cyan font-semibold"
                data-ocid="hero.primary_button"
              >
                <Link to="/roadmap">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary/50 text-secondary hover:bg-secondary/10"
                data-ocid="hero.secondary_button"
              >
                <Link to="/mentors">Find a Mentor</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      </section>

      {/* Stats */}
      <section
        className="py-12 border-y border-primary/30 bg-card/50"
        style={{ borderTopColor: "oklch(var(--primary) / 0.4)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl font-black text-gradient-cyan mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-black mb-3">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            One platform. Complete guidance.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={card.href}
                data-ocid={`home.card.${(i + 1) as 1}`}
                className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/40 card-glow transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center mb-4`}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {card.label}
                </h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 mx-4 mb-8 rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/20 via-card to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
            Ready to{" "}
            <span className="text-gradient-amber">Build the Future?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of engineering students already using Careera to
            crack exams, find mentors, and launch startups.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground glow-amber font-semibold"
            data-ocid="cta.primary_button"
          >
            <Link to="/roadmap">
              Explore the Roadmap <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
