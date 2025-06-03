export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    try {
        // Simulated DB (in-memory)
        globalThis.raffleDB = globalThis.raffleDB || {};
        globalThis.raffleDB[userId] = (globalThis.raffleDB[userId] || 0) + 1;

        return res.status(200).json({ success: true, tickets: globalThis.raffleDB[userId],userId});
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
