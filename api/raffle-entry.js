// /api/raffle-entry.js
import raffleDB from '../../lib/raffleDB';

export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    raffleDB[userId] = (raffleDB[userId] || 0) + 1;

    res.status(200).json({ success: true, tickets: raffleDB[userId], userId });
}
