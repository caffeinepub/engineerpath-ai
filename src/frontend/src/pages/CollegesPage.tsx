import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, MapPin, Search, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllColleges } from "../hooks/useQueries";

const typeLabels: Record<string, string> = {
  all: "All Colleges",
  iit: "IITs",
  nit: "NITs",
  iiit: "IIITs",
  privateCollege: "Private",
  deemed: "Deemed",
};

const typeColors: Record<string, string> = {
  iit: "bg-primary/15 text-primary border-primary/40",
  nit: "bg-secondary/15 text-secondary border-secondary/40",
  iiit: "bg-accent/15 text-accent border-accent/40",
  privateCollege: "bg-muted text-muted-foreground",
  deemed: "bg-muted text-muted-foreground",
};

export default function CollegesPage() {
  const { data: colleges, isLoading, isError } = useGetAllColleges();
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered =
    colleges?.filter((c) => {
      const matchType = typeFilter === "all" || c.collegeType === typeFilter;
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.state.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    }) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Engineering <span className="text-gradient-amber">Colleges</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          IITs, NITs, IIITs and the best private colleges across India.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search college or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="colleges.search_input"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44" data-ocid="colleges.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typeLabels).map(([val, label]) => (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="self-center text-sm text-muted-foreground">
          {filtered.length} colleges
        </span>
      </div>

      {isError && (
        <div
          className="p-6 text-center text-destructive"
          data-ocid="colleges.error_state"
        >
          Failed to load colleges.
        </div>
      )}

      {isLoading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="colleges.loading_state"
        >
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-20" data-ocid="colleges.empty_state">
          <p className="text-muted-foreground">
            No colleges match your search.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((college, i) => (
          <motion.div
            key={college.id.toString()}
            data-ocid={`colleges.item.${(i + 1) as 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="p-5 rounded-xl border border-border bg-card card-glow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-display font-bold text-base leading-tight truncate">
                  {college.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">
                    {college.location}, {college.state}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 text-xs ${typeColors[college.collegeType] ?? ""}`}
              >
                {typeLabels[college.collegeType] ?? college.collegeType}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Trophy className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground">NIRF</span>
                </div>
                <div className="font-display font-bold text-primary">
                  #{college.nirfRanking.toString()}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-secondary/10 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Building2 className="w-3 h-3 text-secondary" />
                  <span className="text-xs text-muted-foreground">Est.</span>
                </div>
                <div className="font-display font-bold text-secondary">
                  {college.establishedYear.toString()}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1.5">
                Top Branches
              </p>
              <div className="flex flex-wrap gap-1">
                {college.topBranches.slice(0, 3).map((b) => (
                  <Badge key={b} variant="outline" className="text-xs">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>

            {college.avgCutoff > 0n && (
              <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                Avg. JEE Cutoff:{" "}
                <span className="text-foreground font-medium">
                  {college.avgCutoff.toString()}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
