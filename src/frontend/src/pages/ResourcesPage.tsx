import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { ResourceCategory } from "../backend.d";
import { useGetAllResources } from "../hooks/useQueries";

const categories = [
  { value: "all", label: "All" },
  { value: ResourceCategory.ai, label: "AI" },
  { value: ResourceCategory.startup, label: "Startup" },
  { value: ResourceCategory.finance, label: "Finance" },
  { value: ResourceCategory.roadmap, label: "Roadmap" },
  { value: ResourceCategory.skills, label: "Skills" },
];

const catColors: Record<string, string> = {
  ai: "text-primary border-primary/40",
  startup: "text-secondary border-secondary/40",
  finance: "text-accent border-accent/40",
  roadmap: "text-primary border-primary/40",
  skills: "text-secondary border-secondary/40",
};

export default function ResourcesPage() {
  const { data: resources, isLoading, isError } = useGetAllResources();
  const [tab, setTab] = useState("all");

  const filtered =
    resources?.filter((r) => tab === "all" || r.category === tab) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Resource <span className="text-gradient-cyan">Library</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Curated guides, articles, and resources for every stage of your
          journey.
        </p>
      </motion.div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-8 flex-wrap h-auto gap-1 bg-transparent p-0">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              data-ocid="resources.tab"
              className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/30"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {isError && (
          <div
            className="p-6 text-center text-destructive"
            data-ocid="resources.error_state"
          >
            Failed to load resources.
          </div>
        )}

        {isLoading && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="resources.loading_state"
          >
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
        )}

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            {!isLoading && filtered.length === 0 && (
              <div
                className="text-center py-20"
                data-ocid="resources.empty_state"
              >
                <p className="text-muted-foreground">
                  No resources in this category yet.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id.toString()}
                  data-ocid={`resources.item.${(i + 1) as 1}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  className="p-5 rounded-xl border border-border bg-card card-glow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-bold text-base flex-1 pr-2 leading-tight">
                      {r.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`shrink-0 text-xs ${catColors[r.category] ?? ""}`}
                    >
                      {r.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {r.contentSummary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      By {r.author}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {r.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
