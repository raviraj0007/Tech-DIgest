// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('email');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showNotification('Thank you for subscribing to Tech-Digest!', 'success');
    emailInput.value = '';
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Dev.to API Integration
class TechNewsAPI {
    constructor() {
        this.baseURL = 'https://dev.to/api';
        this.currentPage = 1;
        this.articles = [];
        this.isLoading = false;
    }

    async fetchArticles(page = 1, perPage = 6) {
        try {
            this.isLoading = true;
            this.showLoading();
            
            const response = await fetch(`${this.baseURL}/articles?page=${page}&per_page=${perPage}&tag=technology`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            
            const articles = await response.json();
            return articles;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return this.getFallbackArticles();
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }

    showLoading() {
        const newsGrid = document.getElementById('newsGrid');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = '<div class="spinner"></div>';
        newsGrid.appendChild(loadingDiv);
    }

    hideLoading() {
        const loadingDiv = document.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    getFallbackArticles() {
        return [
            {
                id: 1,
                title: "The Rise of AI in Modern Web Development",
                description: "How artificial intelligence is transforming the way we build and deploy web applications.",
                cover_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                published_at: "2024-12-15T10:00:00Z",
                url: "#",
                reading_time_minutes: 5
            },
            {
                id: 2,
                title: "Next.js 14: What's New and Why It Matters",
                description: "Explore the latest features in Next.js 14 and how they're changing the React ecosystem.",
                cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                published_at: "2024-12-14T15:30:00Z",
                url: "#",
                reading_time_minutes: 8
            },
            {
                id: 3,
                title: "Cybersecurity Trends for 2024",
                description: "The most important cybersecurity developments and threats to watch out for this year.",
                cover_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                published_at: "2024-12-13T09:15:00Z",
                url: "#",
                reading_time_minutes: 6
            },
            {
                id: 4,
                title: "Cloud Computing: The Future of Business Infrastructure",
                description: "How cloud computing is revolutionizing business operations and what's next.",
                cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                published_at: "2024-12-12T14:20:00Z",
                url: "#",
                reading_time_minutes: 7
            },
            {
                id: 5,
                title: "Mobile App Development: React Native vs Flutter",
                description: "A comprehensive comparison of the two leading cross-platform mobile development frameworks.",
                cover_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                published_at: "2024-12-11T11:45:00Z",
                url: "#",
                reading_time_minutes: 10
            },
            {
                id: 6,
                title: "The Evolution of JavaScript: ES2024 Features",
                description: "Discover the latest JavaScript features and how they're improving developer experience.",
                cover_image: "https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                published_at: "2024-12-10T16:30:00Z",
                url: "#",
                reading_time_minutes: 9
            }
        ];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    createNewsCard(article) {
        const card = document.createElement('article');
        card.className = 'news-card';
        
        const imageUrl = article.cover_image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        
        card.innerHTML = `
            <div class="news-card-image">
                <img src="${imageUrl}" alt="${article.title}" loading="lazy">
            </div>
            <div class="news-card-content">
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-summary">${article.description}</p>
                <div class="news-card-meta">
                    <span class="news-card-date">
                        <i class="far fa-calendar"></i>
                        ${this.formatDate(article.published_at)}
                    </span>
                    <span class="read-time">
                        <i class="far fa-clock"></i>
                        ${article.reading_time_minutes || 5} min read
                    </span>
                </div>
                <a href="${article.url}" class="news-card-read-more" target="_blank" rel="noopener">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        return card;
    }

    async loadArticles() {
        const articles = await this.fetchArticles(this.currentPage);
        const newsGrid = document.getElementById('newsGrid');
        
        // Clear existing content
        newsGrid.innerHTML = '';
        
        // Add articles to grid
        articles.forEach(article => {
            const card = this.createNewsCard(article);
            newsGrid.appendChild(card);
        });
        
        this.articles = articles;
    }

    async loadMoreArticles() {
        this.currentPage++;
        const articles = await this.fetchArticles(this.currentPage);
        const newsGrid = document.getElementById('newsGrid');
        
        articles.forEach(article => {
            const card = this.createNewsCard(article);
            newsGrid.appendChild(card);
        });
        
        this.articles = [...this.articles, ...articles];
    }
}

// Initialize the news API and load articles
const newsAPI = new TechNewsAPI();

// Load articles when page loads
document.addEventListener('DOMContentLoaded', () => {
    newsAPI.loadArticles();
});

// Load more articles button
const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', () => {
    if (!newsAPI.isLoading) {
        newsAPI.loadMoreArticles();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.news-card, .featured-content, .newsletter-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Footer newsletter form
const footerNewsletter = document.querySelector('.footer-newsletter');
if (footerNewsletter) {
    footerNewsletter.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value.trim();
        
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            this.querySelector('input').value = '';
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// Add hover effects for social links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add smooth reveal animation for news cards
function animateNewsCards() {
    const cards = document.querySelectorAll('.news-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Call animation when articles are loaded
const originalLoadArticles = newsAPI.loadArticles;
newsAPI.loadArticles = async function() {
    await originalLoadArticles.call(this);
    animateNewsCards();
}; 