import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { token } = req.body;  // Get the token from the request body

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Decode the token
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.role) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Return the decoded role
    res.status(200).json({ role: decoded.role.toLowerCase() , userDetails: decoded });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(500).json({ error: 'Failed to decode token' });
  }
}
