import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NewsCard from './NewsCard';

const NewsSection = styled.section`
  padding: 80px 0;
  background: white;
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

const LoadMoreContainer = styled.div`
  text-align: center;
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

const NewsSectionComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const fetchArticles = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      // Simulate API call with fallback data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newArticles = getFallbackArticles();
      
      if (page === 1) {
        setArticles(newArticles);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
      }
      
      setHasMore(page < 3); // Limit to 3 pages for demo
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFallbackArticles = () => [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in 2024",
      description: "Exploring the latest developments in AI technology and their impact on various industries.",
      cover_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      published_at: "2024-12-14T10:30:00Z",
      url: "https://www.freecodecamp.org/news/the-future-of-artificial-intelligence-in-2024/",
      reading_time_minutes: 8
    },
    {
      id: 2,
      title: "Web Development Trends: What's Hot in 2024",
      description: "From React 18 to Next.js 14, discover the technologies shaping modern web development.",
      cover_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      published_at: "2024-12-13T15:45:00Z",
      url: "https://www.freecodecamp.org/news/web-development-trends-2024/",
      reading_time_minutes: 12
    },
    {
      id: 3,
      title: "Cybersecurity: Protecting Your Digital Assets",
      description: "Essential cybersecurity practices for developers and businesses in the digital age.",
      cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      published_at: "2024-12-13T09:15:00Z",
      url: "https://www.freecodecamp.org/news/cybersecurity-best-practices/",
      reading_time_minutes: 6
    },
    {
      id: 4,
      title: "Cloud Computing: The Future of Business Infrastructure",
      description: "How cloud computing is revolutionizing business operations and what's next.",
      cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      published_at: "2024-12-12T14:20:00Z",
      url: "https://www.freecodecamp.org/news/cloud-computing-future/",
      reading_time_minutes: 7
    },
    {
      id: 5,
      title: "Mobile App Development: React Native vs Flutter",
      description: "A comprehensive comparison of the two leading cross-platform mobile development frameworks.",
      cover_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      published_at: "2024-12-11T11:45:00Z",
      url: "https://www.freecodecamp.org/news/react-native-vs-flutter/",
      reading_time_minutes: 10
    },
    {
      id: 6,
      title: "The Evolution of JavaScript: ES2024 Features",
      description: "Discover the latest JavaScript features and how they're improving developer experience.",
      cover_image: "https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      published_at: "2024-12-10T16:30:00Z",
      url: "https://www.freecodecamp.org/news/javascript-es2024-features/",
      reading_time_minutes: 9
    }
  ];

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchArticles(nextPage);
    }
  }, [loading, hasMore, currentPage, fetchArticles]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  return (
    <NewsSection id="news">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader>
            <SectionTitle>Latest Tech News</SectionTitle>
            <SectionSubtitle>
              Stay updated with the most recent developments in technology
            </SectionSubtitle>
          </SectionHeader>
        </motion.div>

        <NewsGrid>
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </NewsGrid>

        {loading && (
          <LoadingSpinner>
            <div className="spinner"></div>
          </LoadingSpinner>
        )}

        {hasMore && !loading && (
          <LoadMoreContainer>
            <LoadMoreButton onClick={loadMore} ref={ref}>
              Load More Articles
            </LoadMoreButton>
          </LoadMoreContainer>
        )}
      </Container>
    </NewsSection>
  );
};

export default NewsSectionComponent; 