# Guardian API Integration

This document explains the Guardian API integration in the Tech-Digest project.

## 🚀 Overview

The Guardian API integration provides access to The Guardian's extensive news content through their Open Platform API. This integration includes:

- **Basic News Component**: Simple news feed from The Guardian
- **Enhanced News Component**: Advanced filtering and search capabilities
- **API Service Layer**: Robust service for handling API calls
- **Error Handling**: Comprehensive error handling and fallbacks

## 🔑 API Key

**Your Guardian API Key**: `f8efdffb-0c28-41a7-b147-e7c1da26e32a`

### Testing Your API Key

You can test your API key by visiting this URL in your browser:
```
https://content.guardianapis.com/search?api-key=f8efdffb-0c28-41a7-b147-e7c1da26e32a
```

## 📁 File Structure

```
src/
├── components/
│   ├── GuardianNews.js              # Basic Guardian news component
│   └── GuardianNewsEnhanced.js      # Enhanced Guardian news with filters
├── services/
│   └── guardianApi.js               # Guardian API service layer
└── utils/
    └── guardianApiTest.js           # API testing utilities
```

## 🛠️ Components

### 1. GuardianNews.js
A basic news component that displays Guardian articles with:
- Automatic tech news filtering
- Infinite scroll pagination
- Error handling
- Loading states
- Responsive design

### 2. GuardianNewsEnhanced.js
An advanced news component with:
- Category filtering (Technology, Science, Business, World, Politics)
- Search functionality
- Advanced filtering options
- Better UI/UX
- Real-time search results

## 🔧 API Service (guardianApi.js)

The service layer provides these methods:

### Core Methods
- `searchArticles(options)` - Search for articles with filters
- `getSectionArticles(section, options)` - Get articles from specific sections
- `getTrendingArticles(options)` - Get trending articles
- `getArticle(articleId, options)` - Get specific article by ID
- `testConnection()` - Test API connectivity

### Options Object
```javascript
{
  query: 'technology',           // Search query
  section: 'technology',         // Section filter
  page: 1,                      // Page number
  pageSize: 12,                 // Articles per page
  orderBy: 'newest',            // Sort order
  showFields: 'thumbnail,headline,trailText,lastModified,byline',
  fromDate: '2024-01-01',       // Date range start
  toDate: '2024-12-31'          // Date range end
}
```

## 🎯 Usage Examples

### Basic Usage
```javascript
import guardianApiService from '../services/guardianApi';

// Search for technology articles
const result = await guardianApiService.searchArticles({
  query: 'technology',
  pageSize: 10
});

// Get articles from science section
const scienceArticles = await guardianApiService.getSectionArticles('science');
```

### Component Integration
```javascript
import GuardianNews from './components/GuardianNews';
import GuardianNewsEnhanced from './components/GuardianNewsEnhanced';

// In your App.js or component
<GuardianNews />
<GuardianNewsEnhanced />
```

## 🔍 API Endpoints Used

### Search Endpoint
```
GET https://content.guardianapis.com/search
```

### Section Endpoint
```
GET https://content.guardianapis.com/{section}
```

### Article Endpoint
```
GET https://content.guardianapis.com/{article-id}
```

## 📊 Response Format

The Guardian API returns data in this format:
```javascript
{
  response: {
    status: "ok",
    total: 1234,
    startIndex: 1,
    pageSize: 10,
    currentPage: 1,
    pages: 124,
    results: [
      {
        id: "technology/2024/dec/15/article-id",
        type: "article",
        sectionId: "technology",
        sectionName: "Technology",
        webPublicationDate: "2024-12-15T10:30:00Z",
        webTitle: "Article Title",
        webUrl: "https://www.theguardian.com/...",
        fields: {
          thumbnail: "https://media.guim.co.uk/...",
          trailText: "Article description...",
          byline: "Author Name"
        }
      }
    ]
  }
}
```

## 🎨 Styling

Both components use styled-components with:
- Responsive grid layouts
- Hover animations
- Loading spinners
- Error states
- Modern card design

### Color Scheme
- Primary: `#2563eb` (Blue)
- Background: `#f8fafc` (Light Gray)
- Text: `#1f2937` (Dark Gray)
- Accent: `#6b7280` (Medium Gray)

## 🚨 Error Handling

The integration includes comprehensive error handling:

1. **API Errors**: Network issues, rate limits, invalid responses
2. **Data Validation**: Missing fields, malformed responses
3. **Fallback Images**: Default images for missing thumbnails
4. **User Feedback**: Clear error messages and loading states

## 🔧 Configuration

### Environment Variables (Optional)
You can move the API key to environment variables:

```javascript
// In .env file
REACT_APP_GUARDIAN_API_KEY=f8efdffb-0c28-41a7-b147-e7c1da26e32a

// In guardianApi.js
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY || "f8efdffb-0c28-41a7-b147-e7c1da26e32a";
```

### Customization Options
- Change page size: Modify `PAGE_SIZE` constant
- Add categories: Update `categories` array in GuardianNewsEnhanced
- Modify styling: Update styled-components
- Add filters: Extend the API service methods

## 🧪 Testing

### Manual Testing
1. Open browser console
2. Run: `testGuardianApi()`
3. Check for success/error messages

### API Key Test
```javascript
import { testApiKey } from './utils/guardianApiTest';

const isWorking = await testApiKey();
console.log('API Key working:', isWorking);
```

## 📈 Performance

### Optimizations
- Lazy loading of images
- Pagination to limit data transfer
- Caching of API responses
- Debounced search inputs
- Efficient re-rendering with React.memo

### Best Practices
- Use appropriate page sizes (12-20 articles)
- Implement proper loading states
- Handle rate limits gracefully
- Cache frequently accessed data

## 🔗 Guardian API Documentation

For more information about the Guardian API:
- **Documentation**: http://open-platform.theguardian.com/documentation/
- **API Explorer**: http://open-platform.theguardian.com/explore/
- **Terms of Use**: http://open-platform.theguardian.com/terms/

## 🚀 Deployment

The Guardian API integration works in all environments:
- **Development**: Local development server
- **Production**: Netlify, Vercel, etc.
- **Static Sites**: GitHub Pages, etc.

No additional configuration needed for deployment.

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct
   - Check if the key has expired
   - Test with the provided test URL

2. **No Articles Loading**
   - Check browser console for errors
   - Verify network connectivity
   - Test API endpoint manually

3. **CORS Issues**
   - Guardian API supports CORS
   - Check if your domain is blocked
   - Use appropriate headers

4. **Rate Limiting**
   - Implement request throttling
   - Add retry logic
   - Cache responses

### Debug Mode
Enable debug logging:
```javascript
// In guardianApi.js
console.log('Making Guardian API request to:', url);
console.log('API Response:', data);
```

## 📞 Support

For issues with the Guardian API integration:
- Check the Guardian API documentation
- Review browser console for errors
- Test API key manually
- Contact: raviraj04066@gmail.com

---

**Last Updated**: December 2024
**API Key**: f8efdffb-0c28-41a7-b147-e7c1da26e32a
**Status**: ✅ Active and Working 