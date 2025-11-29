import { useState, useEffect } from 'react';
import {
    Utensils,
    Scale,
    Gift,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    ChevronDown,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { type Donation, type Stats } from '../../types/donation';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';

// --- Types ---
type NgoOption = {
    id: string;
    name: string;
};

// --- Hardcoded Data ---
const NGO_OPTIONS: NgoOption[] = [
    { id: "ngo_01", name: "Hope Foundation" },
    { id: "ngo_02", name: "Food Angels" },
    { id: "ngo_03", name: "Community Kitchen" }
];

// --- Mock API ---
const mockStats: Stats = {
    totalDonations: 12,
    totalMealsServed: 180,
    totalFoodSavedKg: 72.5
};

const mockDonations: Donation[] = [
    {
        id: "d1",
        restaurantName: "Spicy Bites",
        aiAnalysis: {
            foodType: "Curry & Rice",
            estimatedMeals: 20,
            freshness: "Good for 4 hours",
            notesForNGO: "Contains dairy, spicy."
        },
        status: "PENDING_NGO_CONFIRMATION",
        createdAt: new Date().toISOString()
    },
    {
        id: "d2",
        restaurantName: "Green Salad Bar",
        aiAnalysis: {
            foodType: "Mixed Greens",
            estimatedMeals: 15,
            freshness: "Good for 2 hours",
            notesForNGO: "Keep refrigerated."
        },
        status: "ACCEPTED",
        createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: "d3",
        restaurantName: "Bakery Delights",
        aiAnalysis: {
            foodType: "Assorted Breads",
            estimatedMeals: 50,
            freshness: "Good for 24 hours",
            notesForNGO: "Contains gluten."
        },
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 86400000).toISOString()
    }
];

// Simulate API calls
const fetchStats = async (ngoId: string): Promise<Stats> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetching stats for ${ngoId}`);
            resolve(mockStats);
        }, 800);
    });
};

const fetchDonations = async (ngoId: string): Promise<Donation[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetching donations for ${ngoId}`);
            resolve([...mockDonations]);
        }, 1000);
    });
};

const updateDonationStatusApi = async (id: string, status: Donation['status']): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Updating donation ${id} to ${status}`);
            resolve();
        }, 500);
    });
};

export default function NgoDashboard() {
    const [selectedNgo, setSelectedNgo] = useState<string>(NGO_OPTIONS[0].id);
    const [stats, setStats] = useState<Stats | null>(null);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [statsData, donationsData] = await Promise.all([
                fetchStats(selectedNgo),
                fetchDonations(selectedNgo)
            ]);
            setStats(statsData);
            setDonations(donationsData);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [selectedNgo]);

    const handleStatusUpdate = async (id: string, newStatus: Donation['status']) => {
        setProcessingId(id);
        try {
            await updateDonationStatusApi(id, newStatus);
            setDonations(prev => prev.map(d =>
                d.id === id ? { ...d, status: newStatus } : d
            ));
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 p-6 md:p-8 font-sans selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            NGO Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Manage food donations and track impact</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={selectedNgo}
                                onChange={(e) => setSelectedNgo(e.target.value)}
                                className="appearance-none bg-gray-900 border border-gray-800 text-white pl-4 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[200px]"
                            >
                                {NGO_OPTIONS.map(ngo => (
                                    <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                        <button
                            onClick={loadData}
                            className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                        >
                            <RefreshCw size={20} className={cn(loading && "animate-spin")} />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Total Donations"
                        value={stats?.totalDonations || 0}
                        icon={Gift}
                        color="text-purple-500"
                    />
                    <StatCard
                        title="Meals Served"
                        value={stats?.totalMealsServed || 0}
                        icon={Utensils}
                        color="text-orange-500"
                    />
                    <StatCard
                        title="Food Saved"
                        value={stats?.totalFoodSavedKg || 0}
                        unit="kg"
                        icon={Scale}
                        color="text-emerald-500"
                    />
                </div>

                {/* Donations List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Clock size={20} className="text-blue-400" />
                        Recent Donations
                    </h2>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={`skeleton-${i}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-32 bg-gray-900/30 rounded-2xl animate-pulse"
                                    />
                                ))
                            ) : donations.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 bg-gray-900/30 rounded-2xl border border-gray-800 border-dashed">
                                    No donations found for this NGO.
                                </div>
                            ) : (
                                donations.map((donation) => (
                                    <motion.div
                                        key={donation.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-start justify-between md:justify-start gap-3">
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {donation.restaurantName}
                                                    </h3>
                                                    <StatusBadge status={donation.status} />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <Utensils size={14} className="text-gray-500" />
                                                        <span className="text-gray-300">{donation.aiAnalysis?.foodType}</span>
                                                        <span className="text-gray-600">•</span>
                                                        <span>~{donation.aiAnalysis?.estimatedMeals} meals</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={14} className="text-gray-500" />
                                                        <span>{donation.aiAnalysis?.freshness}</span>
                                                    </div>
                                                </div>

                                                {donation.aiAnalysis?.notesForNGO && (
                                                    <div className="text-sm bg-blue-500/5 text-blue-200/80 p-3 rounded-lg border border-blue-500/10 inline-block">
                                                        <span className="font-semibold text-blue-400 text-xs uppercase tracking-wider mr-2">Note:</span>
                                                        {donation.aiAnalysis.notesForNGO}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-gray-800">
                                                {donation.status === 'PENDING_NGO_CONFIRMATION' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(donation.id, 'ACCEPTED')}
                                                            disabled={!!processingId}
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {processingId === donation.id ? (
                                                                <RefreshCw size={16} className="animate-spin" />
                                                            ) : (
                                                                <CheckCircle size={16} />
                                                            )}
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(donation.id, 'REJECTED')}
                                                            disabled={!!processingId}
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <XCircle size={16} />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}

                                                {donation.status === 'ACCEPTED' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(donation.id, 'COLLECTED')}
                                                        disabled={!!processingId}
                                                        className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {processingId === donation.id ? (
                                                            <RefreshCw size={16} className="animate-spin" />
                                                        ) : (
                                                            <Truck size={16} />
                                                        )}
                                                        Mark Collected
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
