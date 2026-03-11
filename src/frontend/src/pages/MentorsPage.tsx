import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, GraduationCap, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllMentors } from "../hooks/useQueries";

const domainLabels: Record<string, string> = {
  all: "All Domains",
  ai: "Artificial Intelligence",
  startup: "Startup & Entrepreneurship",
  core: "Core Engineering",
  general: "General",
  robotics: "Robotics",
  webDev: "Web Development",
};

const domainColors: Record<string, string> = {
  ai: "text-primary border-primary/40",
  startup: "text-secondary border-secondary/40",
  core: "text-accent border-accent/40",
  general: "text-muted-foreground",
  robotics: "text-primary border-primary/40",
  webDev: "text-secondary border-secondary/40",
};

export default function MentorsPage() {
  const { data: mentors, isLoading, isError } = useGetAllMentors();
  const [domain, setDomain] = useState("all");

  const filtered =
    mentors?.filter((m) => domain === "all" || m.domain === domain) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          Expert <span className="text-gradient-cyan">Mentors</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn from engineers who&apos;ve been where you are and built
          remarkable careers.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="w-56" data-ocid="mentors.select">
            <SelectValue placeholder="Filter by domain" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(domainLabels).map(([val, label]) => (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="self-center text-sm text-muted-foreground">
          {filtered.length} mentors
        </span>
      </div>

      {isError && (
        <div
          className="p-6 text-center text-destructive"
          data-ocid="mentors.error_state"
        >
          Failed to load mentors.
        </div>
      )}

      {isLoading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="mentors.loading_state"
        >
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-20" data-ocid="mentors.empty_state">
          <p className="text-muted-foreground">
            No mentors found for this domain.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mentor, i) => (
          <motion.div
            key={mentor.id.toString()}
            data-ocid={`mentors.item.${(i + 1) as 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="p-5 rounded-xl border border-border bg-card card-glow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center shrink-0 font-display font-black text-lg">
                {mentor.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-base">
                  {mentor.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Briefcase className="w-3 h-3" />
                  <span className="truncate">{mentor.currentRole}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <GraduationCap className="w-3 h-3" />
                  <span className="truncate">{mentor.college}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {mentor.bio}
            </p>

            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`text-xs ${domainColors[mentor.domain] ?? ""}`}
              >
                {domainLabels[mentor.domain] ?? mentor.domain}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 text-secondary" />
                <span>{mentor.yearsExperience.toString()}y exp</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10"
              data-ocid="mentors.secondary_button"
            >
              Request Mentorship
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
