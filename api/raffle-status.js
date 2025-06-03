export default function handler(req, res) {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' });
        }

        global.raffleDB = global.raffleDB || {};
        const raffleDB = global.raffleDB;

        const tickets = raffleDB[userId] || 0;

        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ tickets });
    } catch (err) {
        console.error('API crashed:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}
