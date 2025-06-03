export default async function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    try {
        // Simulated DB (in-memory)
        const data = globalThis.raffleDB || {};
        const tickets = data[userId] || 0;
        return res.status(200).json({ tickets });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
