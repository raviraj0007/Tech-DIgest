import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import guardianApiService from '../services/guardianApi';

// Styled Components
const GuardianNewsSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  }
`;

const ArticleImage = styled.div`
  width: 100%;
  height: 200px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArticleContent = styled.div`
  padding: 1.5rem;
`;

const ArticleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const ArticleDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const ReadMoreLink = styled.a`
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadMoreButton = styled.button`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid #2563eb;
  cursor: pointer;
  font-size: 1rem;
  background: transparent;
  color: #2563eb;
  
  &:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ef4444;
  padding: 2rem;
  font-size: 1.125rem;
`;

const GuardianNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const fetchGuardianNews = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await guardianApiService.searchArticles({
        query: 'technology OR AI OR artificial intelligence OR software OR hardware',
        section: 'technology',
        page: page,
        pageSize: 12,
        orderBy: 'newest'
      });
      
      if (result.success && result.data.results) {
        const formattedArticles = guardianApiService.formatArticles(result.data.results);
        
        if (page === 1) {
          setArticles(formattedArticles);
        } else {
          setArticles(prev => [...prev, ...formattedArticles]);
        }
        
        // Check if there are more pages
        const totalPages = Math.ceil(result.data.total / 12);
        setHasMore(page < totalPages);
        setCurrentPage(page);
      } else {
        throw new Error(result.error || 'Failed to fetch news from The Guardian');
      }
    } catch (err) {
      console.error('Error fetching Guardian news:', err);
      setError(err.message || 'Failed to fetch news from The Guardian. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      fetchGuardianNews(nextPage);
    }
  }, [loading, hasMore, currentPage]);

  useEffect(() => {
    fetchGuardianNews(1);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <GuardianNewsSection id="guardian-news">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader>
            <SectionTitle>Latest from The Guardian</SectionTitle>
            <SectionSubtitle>
              Technology news and insights from one of the world's leading news sources
            </SectionSubtitle>
          </SectionHeader>
        </motion.div>

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <NewsGrid>
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ArticleImage>
                <img 
                  src={article.image} 
                  alt={article.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = guardianApiService.getDefaultImage();
                  }}
                />
              </ArticleImage>
              <ArticleContent>
                <ArticleTitle>
                  {truncateText(article.title, 80)}
                </ArticleTitle>
                <ArticleDescription>
                  {truncateText(article.description, 120)}
                </ArticleDescription>
                <ArticleMeta>
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.section}</span>
                </ArticleMeta>
                <ReadMoreLink 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read Full Article →
                </ReadMoreLink>
              </ArticleContent>
            </ArticleCard>
          ))}
        </NewsGrid>

        {loading && (
          <LoadingSpinner>
            <div className="spinner"></div>
          </LoadingSpinner>
        )}

        {hasMore && !loading && (
          <div style={{ textAlign: 'center' }}>
            <LoadMoreButton onClick={loadMore} ref={ref}>
              Load More Articles
            </LoadMoreButton>
          </div>
        )}
      </Container>
    </GuardianNewsSection>
  );
};

export default GuardianNews; 