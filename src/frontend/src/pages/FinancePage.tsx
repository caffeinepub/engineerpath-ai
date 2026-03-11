import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Banknote,
  DollarSign,
  PieChart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { ResourceCategory } from "../backend.d";
import { useGetAllResources } from "../hooks/useQueries";

const topics = [
  {
    icon: Banknote,
    title: "Bootstrapping",
    desc: "Build a product with zero investment. Use college resources, open-source tools, and pre-sales to fund your first version.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Angel & VC Funding",
    desc: "Angels invest ₹25L–₹5Cr for early equity. VCs come in for Series A (₹5Cr+). Know when to raise and from whom.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: PieChart,
    title: "Equity & Dilution",
    desc: "Understand cap tables, vesting schedules, and how funding rounds dilute your ownership. Protect your stake.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Personal Finance",
    desc: "Engineer salary ₹8–40 LPA. Invest early in mutual funds (SIPs), avoid lifestyle inflation, build 6-month emergency fund.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Stock Market Basics",
    desc: "Index funds beat most active investors long-term. Start with Nifty 50 index. Avoid F&O until you&apos;re experienced.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: DollarSign,
    title: "Freelancing Income",
    desc: "BTech students can earn ₹50k–₹3L/month freelancing on Upwork, Toptal, or direct clients. Build portfolio first.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export default function FinancePage() {
  const { data: resources, isLoading } = useGetAllResources();
  const financeResources =
    resources?.filter((r) => r.category === ResourceCategory.finance) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Financial <span className="text-gradient-amber">Intelligence</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Money is a tool. Learn to earn it, invest it, and raise it for your
          startup — while you&apos;re still in college.
        </p>
      </motion.div>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6">
          Essential Finance Concepts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((t, i) => (
            <motion.div
              key={t.title}
              data-ocid="finance.card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl border border-border bg-card card-glow"
            >
              <div
                className={`w-10 h-10 rounded-lg ${t.bg} flex items-center justify-center mb-4`}
              >
                <t.icon className={`w-5 h-5 ${t.color}`} />
              </div>
              <h3 className="font-display font-bold mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-14 p-8 rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/10 to-card">
        <h2 className="font-display text-2xl font-bold mb-6">
          💰 Engineering Salary Benchmarks (India 2025)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "IIT Fresher",
              range: "₹18–50 LPA",
              note: "Top tech companies",
            },
            {
              label: "NIT Fresher",
              range: "₹8–20 LPA",
              note: "Product + service",
            },
            {
              label: "Private College",
              range: "₹4–12 LPA",
              note: "With strong skills",
            },
            {
              label: "5yr+ Engineer",
              range: "₹30–1.5Cr",
              note: "FAANG & startups",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-4 rounded-xl bg-card border border-border"
            >
              <div className="font-display text-xl font-black text-gradient-amber mb-1">
                {s.range}
              </div>
              <div className="text-sm font-medium">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mb-6">
          Finance Resources
        </h2>

        {isLoading && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-ocid="finance.loading_state"
          >
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        )}

        {!isLoading && financeResources.length === 0 && (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="finance.empty_state"
          >
            Finance resources coming soon!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {financeResources.map((r, i) => (
            <div
              key={r.id.toString()}
              data-ocid={`finance.item.${(i + 1) as 1}`}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <h3 className="font-display font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {r.contentSummary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  By {r.author}
                </span>
                <div className="flex gap-1">
                  {r.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
