"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useTheme } from "next-themes"

const data = [
    { name: "Mon", total: 12 },
    { name: "Tue", total: 18 },
    { name: "Wed", total: 15 },
    { name: "Thu", total: 25 },
    { name: "Fri", total: 20 },
    { name: "Sat", total: 30 },
    { name: "Sun", total: 28 },
]

export function ActivityChart() {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDark ? "#1f1f1f" : "#fff",
                        border: "1px solid #333",
                        borderRadius: "8px"
                    }}
                    labelStyle={{ color: isDark ? "#fff" : "#000" }}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
