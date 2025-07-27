import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: #2563eb;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-100%'};
    top: 70px;
    flex-direction: column;
    background-color: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #2563eb;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 3px;
    background: #374151;
    margin: 3px 0;
    transition: 0.3s;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavContainer scrolled={scrolled}>
      <NavWrapper>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo to="/">Tech-Digest</Logo>
        </motion.div>
        
        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/news" onClick={closeMenu}>News</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </NavItem>
        </NavMenu>
        
        <Hamburger onClick={toggleMenu}>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </Hamburger>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar; 