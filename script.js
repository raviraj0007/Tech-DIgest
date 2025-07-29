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

// Guardian API Integration
class GuardianNewsAPI {
    constructor() {
        this.baseURL = 'https://content.guardianapis.com';
        this.apiKey = 'f8efdffb-0c28-41a7-b147-e7c1da26e32a';
        this.currentPage = 1;
        this.articles = [];
        this.isLoading = false;
    }

    async fetchArticles(page = 1, perPage = 6) {
        try {
            this.isLoading = true;
            this.showLoading();
            
            const url = `${this.baseURL}/search?api-key=${this.apiKey}&q=technology&section=technology&page=${page}&page-size=${perPage}&show-fields=thumbnail,headline,trailText,lastModified&order-by=newest`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch articles from Guardian API');
            }
            
            const data = await response.json();
            
            if (data.response && data.response.results) {
                return data.response.results.map(article => ({
                    id: article.id,
                    title: article.webTitle,
                    description: article.fields?.trailText || article.webTitle,
                    cover_image: article.fields?.thumbnail || this.getDefaultImage(),
                    published_at: article.webPublicationDate,
                    url: article.webUrl,
                    reading_time_minutes: 5
                }));
            } else {
                throw new Error('Invalid response format from Guardian API');
            }
        } catch (error) {
            console.error('Error fetching Guardian articles:', error);
            return this.getFallbackArticles();
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }

    getDefaultImage() {
        return "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }

    showLoading() {
        const newsGrid = document.getElementById('newsGrid');
        if (newsGrid) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading';
            loadingDiv.innerHTML = '<div class="spinner"></div>';
            newsGrid.appendChild(loadingDiv);
        }
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
            month: 'short',
            day: 'numeric'
        });
    }

    createNewsCard(article) {
        return `
            <div class="news-card" data-aos="fade-up">
                <div class="news-image">
                    <img src="${article.cover_image}" alt="${article.title}" onerror="this.src='${this.getDefaultImage()}'">
                </div>
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <div class="news-meta">
                        <span class="date">${this.formatDate(article.published_at)}</span>
                        <span class="read-time">${article.reading_time_minutes} min read</span>
                    </div>
                    <a href="${article.url}" target="_blank" class="read-more">Read More →</a>
                </div>
            </div>
        `;
    }

    async loadArticles() {
        try {
            const articles = await this.fetchArticles(1, 6);
            this.articles = articles;
            
            const newsGrid = document.getElementById('newsGrid');
            if (newsGrid) {
                newsGrid.innerHTML = articles.map(article => this.createNewsCard(article)).join('');
                this.animateNewsCards();
            }
        } catch (error) {
            console.error('Error loading articles:', error);
        }
    }

    async loadMoreArticles() {
        if (this.isLoading) return;
        
        try {
            this.currentPage++;
            const newArticles = await this.fetchArticles(this.currentPage, 3);
            
            if (newArticles.length > 0) {
                this.articles = [...this.articles, ...newArticles];
                
                const newsGrid = document.getElementById('newsGrid');
                if (newsGrid) {
                    const newCards = newArticles.map(article => this.createNewsCard(article)).join('');
                    newsGrid.insertAdjacentHTML('beforeend', newCards);
                    this.animateNewsCards();
                }
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
        }
    }
}

// Initialize the Guardian news API and load articles
const guardianNewsAPI = new GuardianNewsAPI();

// Load articles when page loads
document.addEventListener('DOMContentLoaded', () => {
    guardianNewsAPI.loadArticles();
});

// Refresh news every 6 hours (21600000 ms)
setInterval(() => {
    guardianNewsAPI.loadArticles();
}, 21600000);

// Load more articles button
const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', () => {
    if (!guardianNewsAPI.isLoading) {
        guardianNewsAPI.loadMoreArticles();
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
const originalLoadArticles = guardianNewsAPI.loadArticles;
guardianNewsAPI.loadArticles = async function() {
    await originalLoadArticles.call(this);
    animateNewsCards();
}; 