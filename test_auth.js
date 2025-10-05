import axios from 'axios';

async function testAuth() {
  console.log('🔍 Testing Auth Endpoints...');
  
  const baseURL = 'http://localhost:5000/api/v1';
  
  try {
    // Test register endpoint
    console.log('\n📝 Testing Registration...');
    const registerData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      phone: '+1234567890',
      password: 'testpass123',
      role: 'pregnant_woman'
    };
    
    const registerResponse = await axios.post(`${baseURL}/auth/register`, registerData);
    console.log('✅ Registration successful:', registerResponse.status, registerResponse.data);
    
    // Test login endpoint
    console.log('\n🔐 Testing Login...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: registerData.email,
      password: registerData.password
    });
    console.log('✅ Login successful:', loginResponse.status, loginResponse.data);
    
  } catch (error) {
    console.error('❌ Auth test failed:', {
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
      data: error.response?.data
    });
  }
}

testAuth();