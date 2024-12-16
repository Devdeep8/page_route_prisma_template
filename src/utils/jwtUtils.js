import jwt from 'jsonwebtoken';

// Function to create JWT token with a 1-day expiration
export default  function createJwtToken(userDetails) {
  const { id, email, role } = userDetails; // Extracting userId, email, and role from the created user

  const payload = {
    userId: id,      // User ID
    email: email,    // User email
    role: role,      // User role
  };

  const options = {
    expiresIn: '1d', // Token expires in 1 day
  };

  // Generate the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}
