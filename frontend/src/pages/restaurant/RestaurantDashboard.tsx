import { useState, useEffect } from 'react';
import {
    Plus,
    Utensils,
    Leaf,
    Gift,
    Clock,
    MoreVertical,
    Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Donation, type Stats } from '../../types/donation';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';
import CreateDonationModal from './CreateDonationModal';

// --- Mock Data ---
const mockStats: Stats = {
    totalDonations: 45,
    totalMealsProvided: 650,
    totalCo2SavedKg: 280.5
};

const mockDonations: Donation[] = [
    {
        id: "d1",
        ngoName: "Hope Foundation",
        foodType: "Curry & Rice",
        quantityMeals: 20,
        status: "PENDING_NGO_CONFIRMATION",
        createdAt: new Date().toISOString(),
        impact: { co2SavedKg: 8.5 }
    },
    {
        id: "d2",
        ngoName: "Food Angels",
        foodType: "Mixed Greens",
        quantityMeals: 15,
        status: "ACCEPTED",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        impact: { co2SavedKg: 4.2 }
    },
    {
        id: "d3",
        ngoName: "Community Kitchen",
        foodType: "Assorted Breads",
        quantityMeals: 50,
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        impact: { co2SavedKg: 15.0 }
    },
    {
        id: "d4",
        ngoName: "Hope Foundation",
        foodType: "Pasta Trays",
        quantityMeals: 30,
        status: "COLLECTED",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        impact: { co2SavedKg: 12.8 }
    }
];

export default function RestaurantDashboard() {
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setDonations(mockDonations);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleCreateDonation = (newDonation: Donation) => {
        setDonations([newDonation, ...donations]);
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 p-6 md:p-8 font-sans selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Restaurant Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Track your contributions and environmental impact</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Plus size={20} />
                        New Donation
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        title="Total Donations"
                        value={mockStats.totalDonations + (donations.length - mockDonations.length)}
                        icon={Gift}
                        color="text-purple-500"
                        trend="+12% this month"
                    />
                    <StatCard
                        title="Meals Provided"
                        value={(mockStats.totalMealsProvided || 0) + donations.reduce((acc, curr) => !mockDonations.find(d => d.id === curr.id) ? acc + (curr.quantityMeals || 0) : acc, 0)}
                        icon={Utensils}
                        color="text-orange-500"
                        trend="+85 meals"
                    />
                    <StatCard
                        title="CO₂ Saved"
                        value={(mockStats.totalCo2SavedKg || 0) + donations.reduce((acc, curr) => !mockDonations.find(d => d.id === curr.id) ? acc + (curr.impact?.co2SavedKg || 0) : acc, 0)}
                        unit="kg"
                        icon={Leaf}
                        color="text-emerald-500"
                        trend="+24kg saved"
                    />
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Clock size={20} className="text-blue-400" />
                            Donation History
                        </h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            View All
                        </button>
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={`skeleton-${i}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-24 bg-gray-900/30 rounded-2xl animate-pulse"
                                    />
                                ))
                            ) : (
                                donations.map((donation) => (
                                    <motion.div
                                        key={donation.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-gray-800/50 text-gray-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                                    <Utensils size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-1">
                                                        {donation.foodType}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(donation.createdAt).toLocaleDateString()}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                        <span>{donation.quantityMeals} meals</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                        <span className="text-emerald-400 flex items-center gap-1">
                                                            <Leaf size={12} />
                                                            {donation.impact?.co2SavedKg}kg CO₂
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                                <div className="text-right mr-4 hidden md:block">
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Assigned NGO</div>
                                                    <div className="text-sm font-medium text-gray-300">{donation.ngoName}</div>
                                                </div>
                                                <StatusBadge status={donation.status} />
                                                <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>

                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <CreateDonationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateDonation}
                />

            </div>
        </div>
    );
}
