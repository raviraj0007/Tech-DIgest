import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import NewsletterCTA from './components/NewsletterCTA';
import Footer from './components/Footer';
import DeveloperCredits from './components/DeveloperCredits';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <NewsSection />
              <NewsletterCTA />
            </>
          } />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </MainContent>
      <Footer />
      <DeveloperCredits />
    </AppContainer>
  );
}

export default App; 