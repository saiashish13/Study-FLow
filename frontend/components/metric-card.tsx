import { LucideIcon } from "lucide-react";
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  sparkline?: number[];
};

function MetricCardComponent({ label, value, hint, icon: Icon, trend, sparkline }: MetricCardProps) {
  return (
    <Card className="card-hover border border-border/40 bg-card/65 backdrop-blur-md relative overflow-hidden transition-all duration-300">
      {/* Soft inner glow gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/0 to-accent/[0.02] pointer-events-none" />
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
            <Icon size={17} />
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold tracking-tight">{value}</p>
            <div className="flex items-center gap-2">
              {trend && (
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide",
                  trend.isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                )}>
                  {trend.isPositive ? "↑" : "↓"} {trend.value}
                </span>
              )}
              <span className="text-[11px] text-muted-foreground font-medium">{hint}</span>
            </div>
          </div>

          {/* Mini SVG Sparkline */}
          {sparkline && sparkline.length > 0 && (
            <div className="w-16 h-8 opacity-75">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {(() => {
                  const min = Math.min(...sparkline);
                  const max = Math.max(...sparkline);
                  const range = max - min || 1;
                  const points = sparkline.map((val, idx) => {
                    const x = (idx / (sparkline.length - 1)) * 100;
                    const y = 35 - ((val - min) / range) * 30; // map value to height
                    return `${x},${y}`;
                  }).join(" ");

                  return (
                    <>
                      <polyline
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                      {/* Gradient Fill under sparkline */}
                      <path
                        d={`M 0 40 L ${points} L 100 40 Z`}
                        fill="url(#sparkline-grad)"
                        className="opacity-15"
                      />
                      <defs>
                        <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </>
                  );
                })()}
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export const MetricCard = memo(MetricCardComponent);
