import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMicrochip, FaRocket, FaBrain } from 'react-icons/fa';

const HeroSection = styled.section`
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled.div``;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  
  &.btn-primary {
    background: #ffffff;
    color: #2563eb;
    
    &:hover {
      background: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }
  }
  
  &.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: #2563eb;
      transform: translateY(-2px);
    }
  }
`;

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroGraphic = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const IconWrapper = styled(motion.div)`
  position: absolute;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Stay Ahead with the Latest Tech Insights</HeroTitle>
            <HeroSubtitle>
              Discover cutting-edge technology trends, startup innovations, and industry breakthroughs delivered to your inbox daily.
            </HeroSubtitle>
            <HeroButtons>
              <Button 
                className="btn-primary" 
                onClick={() => scrollToSection('news')}
              >
                Explore News
              </Button>
              <Button 
                className="btn-secondary" 
                onClick={() => scrollToSection('newsletter')}
              >
                Subscribe
              </Button>
            </HeroButtons>
          </motion.div>
        </HeroContent>
        
        <HeroImage>
          <HeroGraphic>
            <IconWrapper
              style={{ top: '20%', left: '20%' }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaMicrochip />
            </IconWrapper>
            <IconWrapper
              style={{ top: '60%', right: '20%' }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <FaRocket />
            </IconWrapper>
            <IconWrapper
              style={{ bottom: '20%', left: '50%' }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            >
              <FaBrain />
            </IconWrapper>
          </HeroGraphic>
        </HeroImage>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero; 