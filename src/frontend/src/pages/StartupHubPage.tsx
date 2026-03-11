import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  FlaskConical,
  Lightbulb,
  Package,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FC } from "react";
import { StartupStage } from "../backend.d";
import { useGetAllStartupTips } from "../hooks/useQueries";

type StageFilter = StartupStage | "all";

interface StageOption {
  value: StageFilter;
  label: string;
  icon: FC<{ className?: string }>;
  color: string;
  desc: string;
}

const stages: StageOption[] = [
  {
    value: "all",
    label: "All",
    icon: BarChart3,
    color: "text-muted-foreground",
    desc: "All startup tips",
  },
  {
    value: StartupStage.idea,
    label: "Idea",
    icon: Lightbulb,
    color: "text-primary",
    desc: "Validate before you build",
  },
  {
    value: StartupStage.validation,
    label: "Validate",
    icon: FlaskConical,
    color: "text-secondary",
    desc: "Test market fit",
  },
  {
    value: StartupStage.build,
    label: "Build",
    icon: Package,
    color: "text-accent",
    desc: "Ship your MVP",
  },
  {
    value: StartupStage.launch,
    label: "Launch",
    icon: Rocket,
    color: "text-primary",
    desc: "Go to market",
  },
  {
    value: StartupStage.scale,
    label: "Scale",
    icon: TrendingUp,
    color: "text-secondary",
    desc: "Grow & fundraise",
  },
];

const stageColors: Record<string, string> = {
  idea: "border-primary/40 text-primary",
  validation: "border-secondary/40 text-secondary",
  build: "border-accent/40 text-accent",
  launch: "border-primary/40 text-primary",
  scale: "border-secondary/40 text-secondary",
};

export default function StartupHubPage() {
  const { data: tips, isLoading, isError } = useGetAllStartupTips();
  const [activeStage, setActiveStage] = useState<StageFilter>("all");

  const filtered =
    tips?.filter((t) => activeStage === "all" || t.stage === activeStage) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Startup <span className="text-gradient-amber">Hub</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          From zero to funded. Everything you need to build India&apos;s next
          unicorn from your hostel room.
        </p>
      </motion.div>

      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Startup Pipeline
        </p>
        <div className="flex flex-wrap gap-3">
          {stages.map((s, i) => (
            <motion.button
              key={s.value}
              data-ocid="startup.tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveStage(s.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                activeStage === s.value
                  ? `${s.color} border-current bg-current/10`
                  : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
              }`}
            >
              <s.icon
                className={`w-4 h-4 ${activeStage === s.value ? s.color : ""}`}
              />
              {s.label}
            </motion.button>
          ))}
        </div>
      </div>

      {isError && (
        <div
          className="p-6 text-center text-destructive"
          data-ocid="startup.error_state"
        >
          Failed to load tips.
        </div>
      )}
      {isLoading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="startup.loading_state"
        >
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      )}
      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-20" data-ocid="startup.empty_state">
          <p className="text-muted-foreground">No tips for this stage yet.</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filtered.map((tip, i) => (
            <div
              key={tip.id.toString()}
              data-ocid={`startup.item.${(i + 1) as 1}`}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-lg leading-tight flex-1 pr-2">
                  {tip.title}
                </h3>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-xs ${stageColors[tip.stage] ?? ""}`}
                >
                  {tip.stage}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {tip.content}
              </p>
              {tip.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tip.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
