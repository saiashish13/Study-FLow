"use client";

import { memo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trendData } from "@/lib/sample-data";

// Custom premium borderless HTML tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/85 backdrop-blur-md border border-border/50 p-3.5 rounded-xl shadow-soft text-xs space-y-1.5 animate-in fade-in duration-200">
        <p className="font-bold text-muted-foreground tracking-wider uppercase text-[9px]">{label}</p>
        {payload.map((item: any, idx: number) => {
          const valueSuffix = item.name === "accuracy" ? "%" : item.name === "minutes" ? " min" : "";
          const nameLabel = item.name === "accuracy" ? "Recall Accuracy" : "Time Spent";
          return (
            <div key={idx} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.stroke }} />
              <p className="font-semibold text-foreground">
                <span className="text-muted-foreground font-normal">{nameLabel}: </span>
                {item.value}{valueSuffix}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

function AccuracyChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={trendData} margin={{ left: -10, right: 10, top: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="accuracy-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.25} />
            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} opacity={0.4} />
        <XAxis 
          dataKey="day" 
          tickLine={false} 
          axisLine={false} 
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
        />
        <YAxis 
          tickLine={false} 
          axisLine={false} 
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }} />
        <Area 
          type="monotone" 
          dataKey="accuracy" 
          stroke="hsl(var(--accent))" 
          fill="url(#accuracy-gradient)" 
          strokeWidth={3} 
          activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--accent))" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const AccuracyChart = memo(AccuracyChartComponent);

function TimeChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={trendData} margin={{ left: -10, right: 10, top: 10, bottom: 5 }}>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} opacity={0.4} />
        <XAxis 
          dataKey="day" 
          tickLine={false} 
          axisLine={false} 
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
        />
        <YAxis 
          tickLine={false} 
          axisLine={false} 
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }} />
        <Bar 
          dataKey="minutes" 
          radius={[5, 5, 0, 0]} 
          fill="hsl(var(--accent))" 
          maxBarSize={28}
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const TimeChart = memo(TimeChartComponent);
