// Guardian API Test Utility
import guardianApiService from '../services/guardianApi';

export const testGuardianApi = async () => {
  console.log('Testing Guardian API connection...');
  
  try {
    // Test basic search
    const searchResult = await guardianApiService.searchArticles({
      query: 'technology',
      pageSize: 1
    });
    
    if (searchResult.success) {
      console.log('✅ Guardian API connection successful!');
      console.log('Sample article:', searchResult.data.results[0]);
      return {
        success: true,
        message: 'Guardian API is working correctly',
        sampleData: searchResult.data.results[0]
      };
    } else {
      console.error('❌ Guardian API test failed:', searchResult.error);
      return {
        success: false,
        message: searchResult.error,
        sampleData: null
      };
    }
  } catch (error) {
    console.error('❌ Guardian API test error:', error);
    return {
      success: false,
      message: error.message,
      sampleData: null
    };
  }
};

export const testApiKey = async () => {
  const testUrl = `https://content.guardianapis.com/search?api-key=f8efdffb-0c28-41a7-b147-e7c1da26e32a&q=technology&page-size=1`;
  
  try {
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (response.ok && data.response) {
      console.log('✅ API key is valid and working!');
      return true;
    } else {
      console.error('❌ API key test failed:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ API key test error:', error);
    return false;
  }
};

// Export for use in components
export default {
  testGuardianApi,
  testApiKey
}; 