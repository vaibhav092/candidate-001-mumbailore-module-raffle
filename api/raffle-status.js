// /api/raffle-status.js
import raffleDB from '../../lib/raffleDB';

export default function handler(req, res) {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const tickets = raffleDB[userId] || 0;
    res.status(200).json({ tickets });
}
