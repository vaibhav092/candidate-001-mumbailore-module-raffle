export default function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    const tickets = raffleDB[userId] || 0;

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ tickets });
}
