import raffleDB from '../../lib/raffle.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  raffleDB[userId] = (raffleDB[userId] || 0) + 1;

  return res.status(200).json({ success: true, tickets: raffleDB[userId], userId });
}
