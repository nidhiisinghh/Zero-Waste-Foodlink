import { Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { type DonationStatus } from '../types/donation';

interface StatusBadgeProps {
    status: DonationStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const styles = {
        PENDING_NGO_CONFIRMATION: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-900/50",
        ACCEPTED: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
        REJECTED: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50",
        COLLECTED: "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700",
    };

    const labels = {
        PENDING_NGO_CONFIRMATION: "Pending",
        ACCEPTED: "Accepted",
        REJECTED: "Rejected",
        COLLECTED: "Collected",
    };

    return (
        <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium flex items-center gap-1.5 w-fit", styles[status], className)}>
            {status === 'PENDING_NGO_CONFIRMATION' && <Clock size={12} />}
            {status === 'ACCEPTED' && <CheckCircle size={12} />}
            {status === 'REJECTED' && <XCircle size={12} />}
            {status === 'COLLECTED' && <Truck size={12} />}
            {labels[status]}
        </span>
    );
}
