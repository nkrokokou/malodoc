// Vercel serverless function wrapper
import app from '../src/app.js';

export default async function handler(req, res) {
    // Set CORS headers DIRECTLY on response
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'https://malodoc.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Delegate to Express app
    return app(req, res);
}
