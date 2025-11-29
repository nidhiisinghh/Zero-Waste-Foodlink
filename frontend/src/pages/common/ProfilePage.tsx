import { useState } from 'react';
import { User, MapPin, Phone, Mail, Building, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        address: '123 Main St, New York, NY',
        organization: 'Spicy Bites Restaurant'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
    };

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-8">Profile Settings</h1>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formData.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-stone-900 dark:text-white">{formData.name}</h2>
                        <p className="text-stone-500 dark:text-stone-400">{formData.organization}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center gap-2">
                                <User size={16} className="text-stone-400 dark:text-stone-500" /> Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center gap-2">
                                <Mail size={16} className="text-stone-400 dark:text-stone-500" /> Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center gap-2">
                                <Phone size={16} className="text-stone-400 dark:text-stone-500" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center gap-2">
                                <Building size={16} className="text-stone-400 dark:text-stone-500" /> Organization Name
                            </label>
                            <input
                                type="text"
                                value={formData.organization}
                                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center gap-2">
                            <MapPin size={16} className="text-stone-400 dark:text-stone-500" /> Address
                        </label>
                        <textarea
                            rows={3}
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-600/20"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
