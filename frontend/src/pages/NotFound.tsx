import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col items-center justify-center p-6 text-center selection:bg-emerald-200 selection:text-emerald-900">
            <h1 className="text-9xl font-bold text-stone-200">404</h1>
            <h2 className="text-2xl font-bold text-stone-900 mt-4 mb-2">Page Not Found</h2>
            <p className="text-stone-500 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5"
            >
                <Home size={20} />
                Back to Home
            </button>
        </div>
    );
}
