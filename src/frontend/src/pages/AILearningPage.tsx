import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Brain,
  Code2,
  ExternalLink,
  ImageIcon,
  MessageSquare,
  Search,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { ResourceCategory } from "../backend.d";
import { useGetAllResources } from "../hooks/useQueries";

const aiTools = [
  {
    name: "ChatGPT",
    desc: "Conversational AI for code, writing, research and problem solving.",
    icon: MessageSquare,
    color: "text-primary",
    bg: "bg-primary/10",
    url: "https://chat.openai.com",
    use: "Explain concepts, debug code, write essays",
  },
  {
    name: "Google Gemini",
    desc: "Multimodal AI from Google — analyze images, documents and more.",
    icon: Search,
    color: "text-secondary",
    bg: "bg-secondary/10",
    url: "https://gemini.google.com",
    use: "Research, summarize papers, analyze diagrams",
  },
  {
    name: "GitHub Copilot",
    desc: "AI pair programmer that suggests entire functions as you type.",
    icon: Code2,
    color: "text-accent",
    bg: "bg-accent/10",
    url: "https://github.com/features/copilot",
    use: "10x your coding speed, learn best practices",
  },
  {
    name: "Midjourney",
    desc: "Generate stunning visuals for presentations, pitch decks and marketing.",
    icon: ImageIcon,
    color: "text-primary",
    bg: "bg-primary/10",
    url: "https://midjourney.com",
    use: "Startup branding, mockups, UI inspiration",
  },
];

const useCases = [
  {
    title: "Crack Competitive Exams",
    desc: "Use ChatGPT to explain complex physics/math concepts with multiple approaches until you understand.",
    icon: Brain,
  },
  {
    title: "Build Projects Faster",
    desc: "GitHub Copilot + ChatGPT can 10x your development speed on personal projects and hackathons.",
    icon: Zap,
  },
  {
    title: "Research Papers",
    desc: "Use Gemini to summarize research papers — turn 30-page PDFs into 5 key insights in seconds.",
    icon: Search,
  },
  {
    title: "Startup Pitch Decks",
    desc: "Midjourney for visuals + ChatGPT for content = professional VC-ready pitch deck in one day.",
    icon: MessageSquare,
  },
];

export default function AILearningPage() {
  const { data: resources, isLoading } = useGetAllResources();
  const aiResources =
    resources?.filter((r) => r.category === ResourceCategory.ai) ?? [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-display text-5xl font-black mb-3">
          AI <span className="text-gradient-cyan">Learning</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Master the tools that are redefining every engineering discipline. AI
          is not replacing engineers — it&apos;s multiplying them.
        </p>
      </motion.div>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6">
          🔥 Popular AI Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiTools.map((tool, i) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="ai.link"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl border border-border bg-card card-glow group block"
            >
              <div
                className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center mb-4`}
              >
                <tool.icon className={`w-5 h-5 ${tool.color}`} />
              </div>
              <h3 className="font-display font-bold text-base mb-1 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{tool.desc}</p>
              <div
                className={`text-xs px-2 py-1 rounded ${tool.bg} ${tool.color}`}
              >
                💡 {tool.use}
              </div>
              <ExternalLink className="w-3 h-3 mt-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6">
          Real-Life Use Cases for Engineering Students
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              data-ocid="ai.card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <uc.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold mb-1">{uc.title}</h3>
                <p className="text-sm text-muted-foreground">{uc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mb-6">
          AI Learning Resources
        </h2>

        {isLoading && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-ocid="ai.loading_state"
          >
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        )}

        {!isLoading && aiResources.length === 0 && (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="ai.empty_state"
          >
            No AI resources yet — check back soon!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiResources.map((r, i) => (
            <div
              key={r.id.toString()}
              data-ocid={`ai.item.${(i + 1) as 1}`}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display font-bold text-base flex-1 pr-2">
                  {r.title}
                </h3>
                <Badge
                  variant="outline"
                  className="text-xs text-primary border-primary/40 shrink-0"
                >
                  AI
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {r.contentSummary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  By {r.author}
                </span>
                <div className="flex flex-wrap gap-1">
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
