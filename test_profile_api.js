import axios from 'axios';

async function testProfileAPI() {
  console.log('🔍 Testing Profile API...');
  
  try {
    // Test if the server is running
    const serverResponse = await axios.get('http://localhost:50001/api/v1/health');
    console.log('✅ Server health check:', serverResponse.status);
  } catch (error) {
    console.log('❌ Server health check failed:', error.message);
    return;
  }

  // Test profile route without authentication (should get 401)
  try {
    const profileResponse = await axios.post('http://localhost:50001/api/v1/users/profile', {
      age: 25,
      stressLevel: 5
    });
    console.log('✅ Profile route response:', profileResponse.status);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Profile route exists but requires auth (401):', error.response.data);
    } else if (error.response?.status === 404) {
      console.log('❌ Profile route not found (404):', error.response.data);
    } else {
      console.log('❓ Profile route error:', error.response?.status, error.response?.data);
    }
  }

  // Test profile route structure
  try {
    const response = await axios.options('http://localhost:50001/api/v1/users/profile');
    console.log('✅ Profile route OPTIONS:', response.status);
  } catch (error) {
    console.log('❓ Profile route OPTIONS error:', error.response?.status);
  }
}

testProfileAPI();