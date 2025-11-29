import { Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { type DonationStatus } from '../types/donation';

interface StatusBadgeProps {
    status: DonationStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const styles = {
        PENDING_NGO_CONFIRMATION: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        ACCEPTED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
        COLLECTED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
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
