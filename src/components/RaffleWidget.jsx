import { useState, useEffect } from 'react';
import axios from 'axios';

const userId = '123';

export default function RaffleWidget() {
    const [expanded, setExpanded] = useState(false);
    const [tickets, setTickets] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`/api/raffle-status?userId=${userId}`);
            setTickets(res.data.tickets);
        } catch {
            setMessage('❌ Error fetching tickets.');
        }
    };

    const joinRaffle = async () => {
    setLoading(true);
    setMessage('');
    try {
        const postRes = await axios.post('/api/raffle-entry', { userId });
        console.log('POST res', postRes.data); 
        if (postRes.data.success) {
            const getRes = await axios.get(`/api/raffle-status?userId=${userId}`);
            console.log('GET res', getRes.data); 
            setTickets(getRes.data.tickets);
            setMessage('✅ Ticket added!');
        } else {
            setMessage('❌ Error, try again.');
        }
    } catch (error) {
        console.error('Error:', error); 
        setMessage('❌ Error, try again.');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {expanded ? (
                <div className="w-[300px] h-[350px] bg-white shadow-xl rounded-xl p-4 border-2 border-pink-500 transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            🎟️ Raffle Entry
                        </h2>
                        <p className="text-gray-600 mb-2">
                            ✅ You have <span className="font-bold">{tickets}</span> ticket{tickets !== 1 ? 's' : ''}.
                        </p>
                        <button
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded transition"
                            onClick={joinRaffle}
                            disabled={loading}
                        >
                            {loading ? 'Joining...' : 'Join the Raffle'}
                        </button>
                        {message && (
                            <p className="mt-3 text-sm text-gray-700">{message}</p>
                        )}
                    </div>
                    <button
                        className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                        onClick={() => setExpanded(false)}
                    >
                        Close Panel
                    </button>
                </div>
            ) : (
                <button
                    className="w-[50px] h-[50px] bg-pink-500 hover:bg-pink-600 text-white text-2xl rounded-md flex items-center justify-center shadow-md transition"
                    onClick={() => setExpanded(true)}
                >
                    🎟️
                </button>
            )}
        </div>
    );
}
