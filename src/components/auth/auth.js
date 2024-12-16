import axios from "axios"; // If you're using Axios, or use fetch if you prefer
export async function register(formData) {
  const { email, password, fullName, phoneNumber } = formData;

  try {
    // Replace this with your actual API endpoint for registration
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, fullName, phoneNumber }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();

    // Get the cookie store
 
    return { success: true, data  };
  } catch (error) {
    console.error('Registration error:', error.message);
    return { success: false, error: error.message || 'Registration failed' };
  }
}
// auth.js or api/auth.js
 // For setting cookies in the browser

export async function login({ email, password }) {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    if (response.data.success)  {
      // Assuming your API sends a JWT token back in response
      const { token , user } = response.data;
      
      // Store the token in cookies or localStorage (here we're using cookies)

      return {
        success: true,
        token,
        message: "Login successful",
        user
      };
    } else {
      return {
        success: false,
        error: response.data.error || "Login failed",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Login failed. Please try again later.",
    };
  }
}
