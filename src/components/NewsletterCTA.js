import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const NewsletterSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NewsletterContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const NewsletterTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NewsletterDescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const NewsletterForm = styled.form`
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const SubscribeButton = styled.button`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background: #ffffff;
  color: #2563eb;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const NewsletterNote = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to Tech-Digest!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <NewsletterSection id="newsletter">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <NewsletterContent>
            <NewsletterTitle>Never Miss a Tech Update</NewsletterTitle>
            <NewsletterDescription>
              Get the latest tech news, insights, and trends delivered directly to your inbox. Join thousands of tech enthusiasts who stay ahead of the curve.
            </NewsletterDescription>
            
            <NewsletterForm onSubmit={handleSubmit}>
              <FormGroup>
                <EmailInput
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <SubscribeButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </SubscribeButton>
              </FormGroup>
            </NewsletterForm>
            
            <NewsletterNote>
              No spam, unsubscribe at any time. We respect your privacy.
            </NewsletterNote>
          </NewsletterContent>
        </motion.div>
      </Container>
    </NewsletterSection>
  );
};

export default NewsletterCTA; 