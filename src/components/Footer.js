import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FooterContainer = styled.footer`
  background: #1f2937;
  color: white;
  padding: 60px 0 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  margin-bottom: 1rem;
  color: #f9fafb;
  font-size: 1.25rem;
`;

const FooterSubtitle = styled.h4`
  margin-bottom: 1rem;
  color: #f9fafb;
  font-size: 1.125rem;
`;

const FooterDescription = styled.p`
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FooterList = styled.ul`
  list-style: none;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3b82f6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #374151;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3b82f6;
    transform: translateY(-2px);
  }
`;

const FooterNewsletter = styled.form`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #374151;
  color: white;
  outline: none;
  font-family: 'Inter', sans-serif;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const NewsletterButton = styled.button`
  padding: 8px 12px;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2563eb;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #374151;
  color: #9ca3af;
`;

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    toast.success('Thank you for subscribing!');
    setNewsletterEmail('');
  };

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Tech-Digest</FooterTitle>
            <FooterDescription>
              Your trusted source for the latest technology news, insights, and trends. Stay informed, stay ahead.
            </FooterDescription>
            <SocialLinks>
              <SocialLink 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter />
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaYoutube />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterSubtitle>Categories</FooterSubtitle>
            <FooterList>
              <FooterListItem>
                <FooterLink href="#">Artificial Intelligence</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Web Development</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Mobile Apps</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Cybersecurity</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Cloud Computing</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>
          
          <FooterSection>
            <FooterSubtitle>Company</FooterSubtitle>
            <FooterList>
              <FooterListItem>
                <FooterLink href="#">About Us</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Contact</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Terms of Service</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">Careers</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>
          
          <FooterSection>
            <FooterSubtitle>Newsletter</FooterSubtitle>
            <FooterDescription>
              Subscribe to our newsletter for the latest updates.
            </FooterDescription>
            <FooterNewsletter onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <NewsletterButton type="submit">
                <FaArrowRight />
              </NewsletterButton>
            </FooterNewsletter>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2024 Tech-Digest. All rights reserved.</p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 