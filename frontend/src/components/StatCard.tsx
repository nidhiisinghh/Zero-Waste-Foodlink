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
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md dark:shadow-none transition-shadow"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                <Icon size={64} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-stone-50 dark:bg-stone-800 ${color.replace('text-', 'text-opacity-80 ')} bg-opacity-20`}>
                        <Icon size={20} className={color} />
                    </div>
                    {trend && (
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                            <ArrowUpRight size={12} />
                            {trend}
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <span className="text-stone-500 dark:text-stone-400 text-sm font-medium block">{title}</span>
                    <div className="text-3xl font-bold text-stone-900 dark:text-white">
                        {value}
                        {unit && <span className="text-lg text-stone-400 dark:text-stone-500 ml-1 font-normal">{unit}</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
