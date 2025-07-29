// Guardian API Service
const GUARDIAN_API_KEY = "f8efdffb-0c28-41a7-b147-e7c1da26e32a";
const GUARDIAN_BASE_URL = "https://content.guardianapis.com";

class GuardianApiService {
  constructor() {
    this.apiKey = GUARDIAN_API_KEY;
    this.baseUrl = GUARDIAN_BASE_URL;
  }

  // Build URL with parameters
  buildUrl(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('api-key', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  }

  // Search for articles with various filters
  async searchArticles(options = {}) {
    const {
      query = 'technology',
      section = 'technology',
      page = 1,
      pageSize = 12,
      orderBy = 'newest',
      showFields = 'thumbnail,headline,trailText,lastModified,byline',
      fromDate,
      toDate
    } = options;

    const params = {
      q: query,
      section: section,
      'page': page,
      'page-size': pageSize,
      'order-by': orderBy,
      'show-fields': showFields
    };

    if (fromDate) {
      params['from-date'] = fromDate;
    }
    if (toDate) {
      params['to-date'] = toDate;
    }

    return this.makeRequest('/search', params);
  }

  // Get articles from specific section
  async getSectionArticles(section = 'technology', options = {}) {
    const {
      page = 1,
      pageSize = 12,
      orderBy = 'newest',
      showFields = 'thumbnail,headline,trailText,lastModified,byline'
    } = options;

    const params = {
      'page': page,
      'page-size': pageSize,
      'order-by': orderBy,
      'show-fields': showFields
    };

    return this.makeRequest(`/${section}`, params);
  }

  // Get trending articles
  async getTrendingArticles(options = {}) {
    const {
      page = 1,
      pageSize = 12,
      showFields = 'thumbnail,headline,trailText,lastModified,byline'
    } = options;

    const params = {
      'page': page,
      'page-size': pageSize,
      'show-fields': showFields
    };

    return this.makeRequest('/search', {
      ...params,
      q: 'technology OR AI OR artificial intelligence OR software OR hardware',
      'order-by': 'relevance'
    });
  }

  // Get specific article by ID
  async getArticle(articleId, options = {}) {
    const {
      showFields = 'thumbnail,headline,trailText,lastModified,byline,bodyText'
    } = options;

    const params = {
      'show-fields': showFields
    };

    return this.makeRequest(`/${articleId}`, params);
  }

  // Make the actual API request
  async makeRequest(endpoint, params = {}) {
    try {
      const url = this.buildUrl(endpoint, params);
      console.log('Making Guardian API request to:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.response) {
        throw new Error('Invalid response format from Guardian API');
      }
      
      return {
        success: true,
        data: data.response,
        error: null
      };
    } catch (error) {
      console.error('Guardian API Error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch data from Guardian API'
      };
    }
  }

  // Format article data for consistent use across components
  formatArticle(article) {
    return {
      id: article.id,
      title: article.webTitle,
      description: article.fields?.trailText || article.webTitle,
      image: article.fields?.thumbnail || this.getDefaultImage(),
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      section: article.sectionName,
      author: article.fields?.byline || 'The Guardian',
      lastModified: article.fields?.lastModified || article.webPublicationDate
    };
  }

  // Format multiple articles
  formatArticles(articles) {
    return articles.map(article => this.formatArticle(article));
  }

  // Get default image for articles without thumbnails
  getDefaultImage() {
    return "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }

  // Test API connection
  async testConnection() {
    const result = await this.searchArticles({ pageSize: 1 });
    return result.success;
  }
}

// Create and export a singleton instance
const guardianApiService = new GuardianApiService();
export default guardianApiService; 