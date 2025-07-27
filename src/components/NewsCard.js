import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';

const Card = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const CardSummary = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReadMoreLink = styled.a`
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: gap 0.3s ease;
  
  &:hover {
    gap: 0.75rem;
  }
`;

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const imageUrl = article.cover_image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <Card
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <CardImage>
        <img src={imageUrl} alt={article.title} loading="lazy" />
      </CardImage>
      
      <CardContent>
        <CardTitle>{article.title}</CardTitle>
        <CardSummary>{article.description}</CardSummary>
        
        <CardMeta>
          <MetaItem>
            <FaCalendar />
            {formatDate(article.published_at)}
          </MetaItem>
          <MetaItem>
            <FaClock />
            {article.reading_time_minutes || 5} min read
          </MetaItem>
        </CardMeta>
        
        <ReadMoreLink 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Read More <FaArrowRight />
        </ReadMoreLink>
      </CardContent>
    </Card>
  );
};

export default NewsCard; 