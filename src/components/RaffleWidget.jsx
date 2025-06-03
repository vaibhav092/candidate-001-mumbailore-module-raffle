import React, { useState, useEffect } from 'react';

const userId = '123'; // example fixed user ID

export default function RaffleWidget() {
  const [tickets, setTickets] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function fetchTickets() {
    try {
      const res = await fetch(`/api/raffle-status?userId=${userId}`);
      const data = await res.json();
      setTickets(data.tickets);
    } catch {
      setMessage('❌ Error fetching tickets');
    }
  }

  async function joinRaffle() {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`/api/raffle-entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets);
        setMessage('✅ Ticket added!');
      } else {
        setMessage('❌ Error, try again.');
      }
    } catch {
      setMessage('❌ Error, try again.');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white shadow-lg rounded-lg border border-gray-300 p-4"
         style={{ '--primary-color': '#E91E63', '--accent-color': '#E91E63' }}>
      <h2 className="text-lg font-semibold mb-2 text-[#E91E63]">🎟️ Raffle Entry</h2>
      <p className="mb-4">✅ You have <strong>{tickets}</strong> tickets.</p>
      <button
        disabled={loading}
        onClick={joinRaffle}
        className="bg-[var(--primary-color)] hover:bg-pink-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Join the Raffle'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
