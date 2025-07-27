import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';

const CreditsContainer = styled.div`
  background: #1f2937;
  color: white;
  padding: 2rem 0;
  border-top: 1px solid #374151;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const CreditsTitle = styled.h4`
  color: #f9fafb;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DeveloperInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const DeveloperLink = styled(motion.a)`
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #60a5fa;
    background: rgba(59, 130, 246, 0.1);
  }
`;

const DeveloperName = styled.span`
  font-weight: 600;
  color: #f9fafb;
`;

const DeveloperCredits = () => {
  return (
    <CreditsContainer>
      <Container>
        <CreditsTitle>
          Developed with <FaHeart style={{ color: '#ef4444' }} /> by
        </CreditsTitle>
        <DeveloperInfo>
          <DeveloperLink 
            href="https://github.com/raviraj0007" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            <DeveloperName>Ravi Raj</DeveloperName>
          </DeveloperLink>
          <DeveloperLink 
            href="mailto:raviraj04066@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            raviraj04066@gmail.com
          </DeveloperLink>
        </DeveloperInfo>
      </Container>
    </CreditsContainer>
  );
};

export default DeveloperCredits; 