import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    unit?: string;
    icon: LucideIcon;
    color: string;
    trend?: string;
}

export function StatCard({ title, value, unit, icon: Icon, color, trend }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                <Icon size={64} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-800 ${color} bg-opacity-20`}>
                        <Icon size={20} className={color.replace('bg-', 'text-')} />
                    </div>
                    {trend && (
                        <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-full">
                            <ArrowUpRight size={12} />
                            {trend}
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <span className="text-gray-400 text-sm font-medium block">{title}</span>
                    <div className="text-3xl font-bold text-white">
                        {value}
                        {unit && <span className="text-lg text-gray-500 ml-1 font-normal">{unit}</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
