import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock } from 'react-icons/fa';

const FeaturedSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeaturedContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeaturedImage = styled.div`
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
`;

const FeaturedText = styled.div``;

const FeaturedBadge = styled.span`
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`;

const FeaturedTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeaturedMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #9ca3af;
  font-size: 0.875rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReadButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background: #2563eb;
  color: white;
  
  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  }
`;

const FeaturedArticle = () => {
  return (
    <FeaturedSection>
      <Container>
        <FeaturedContent>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FeaturedImage>
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="AI Technology" 
              />
            </FeaturedImage>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FeaturedText>
              <FeaturedBadge>Featured</FeaturedBadge>
              <FeaturedTitle>
                The Future of AI: How Machine Learning is Transforming Industries
              </FeaturedTitle>
              <FeaturedDescription>
                Artificial Intelligence continues to revolutionize how businesses operate, from automated customer service to predictive analytics. Discover the latest breakthroughs and what they mean for the future of work.
              </FeaturedDescription>
              <FeaturedMeta>
                <MetaItem>
                  <FaCalendar />
                  December 15, 2024
                </MetaItem>
                <MetaItem>
                  <FaClock />
                  5 min read
                </MetaItem>
              </FeaturedMeta>
              <ReadButton href="#" target="_blank" rel="noopener noreferrer">
                Read Full Article
              </ReadButton>
            </FeaturedText>
          </motion.div>
        </FeaturedContent>
      </Container>
    </FeaturedSection>
  );
};

export default FeaturedArticle; 