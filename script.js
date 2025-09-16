// Data loading and management
class StudentCouncilApp {
    constructor() {
        this.members = [];
        this.events = [];
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderContent();
        this.startAutoRefresh(); // NEW: Start auto-refresh
    }

    async loadData() {
        try {
            // Load data from localStorage (demo solution)
            // In a real deployment, this would load from a server API
            const storedMembers = localStorage.getItem('studentCouncilMembers');
            const storedEvents = localStorage.getItem('studentCouncilEvents');
            
            if (storedMembers) {
                this.members = JSON.parse(storedMembers);
            } else {
                this.members = [];
            }
            
            if (storedEvents) {
                this.events = JSON.parse(storedEvents);
            } else {
                this.events = [];
            }
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.members = [];
            this.events = [];
        }
    }

    // NEW: Auto-refresh data every 30 seconds
    startAutoRefresh() {
        setInterval(async () => {
            await this.loadData();
            this.renderContent();
        }, 30000); // Refresh every 30 seconds
    }

    setupEventListeners() {
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

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        }

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Intersection Observer for animations
        this.setupAnimations();
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
            }
        }
    }

    setupAnimations() {
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

        // Observe all cards and sections
        document.querySelectorAll('.member-card, .event-card, .section').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    renderContent() {
        this.renderMembers();
        this.renderEvents();
    }

    renderMembers() {
        const membersGrid = document.querySelector('.members-grid');
        if (!membersGrid) return;

        if (this.members.length === 0) {
            membersGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #718096;">
                    <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No Council Members Yet</h3>
                    <p>Council members will appear here once they are added by the administrator.</p>
                </div>
            `;
            return;
        }

        membersGrid.innerHTML = this.members.map(member => `
            <div class="member-card" data-aos="fade-up">
                <div class="member-avatar">
                    ${member.photo ? 
                        `<img src="assets/members/${member.photo}" alt="${member.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <i class="fas fa-user" style="display: none;"></i>` : 
                        `<i class="fas fa-user"></i>`
                    }
                </div>
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
                <div class="member-program" style="color: #718096; font-size: 0.9rem; margin-top: 0.5rem;">${member.program || 'N/A'}</div>
                ${member.bio ? `<div class="member-bio" style="margin-top: 1rem; font-size: 0.9rem; color: #718096; line-height: 1.5;">${member.bio}</div>` : ''}
            </div>
        `).join('');
    }

    renderEvents() {
        const eventsGrid = document.querySelector('.events-grid');
        if (!eventsGrid) return;

        if (this.events.length === 0) {
            eventsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #718096;">
                    <i class="fas fa-calendar" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No Events Yet</h3>
                    <p>Upcoming events will appear here once they are added by the administrator.</p>
                </div>
            `;
            return;
        }

        eventsGrid.innerHTML = this.events.map(event => `
            <div class="event-card" data-aos="fade-up">
                <div class="event-image">
                    ${event.photo ? 
                        `<img src="assets/events/${event.photo}" alt="${event.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <i class="fas fa-calendar" style="display: none;"></i>` : 
                        `<i class="fas fa-calendar"></i>`
                    }
                </div>
                <div class="event-content">
                    <div class="event-date">${event.date}</div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-description">${event.description}</div>
                    <div class="event-details" style="margin-top: 1rem; font-size: 0.9rem; color: #718096;">
                        <div><i class="fas fa-map-marker-alt" style="margin-right: 0.5rem;"></i>${event.location}</div>
                        <div><i class="fas fa-clock" style="margin-right: 0.5rem;"></i>${event.time}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // For now, just show success message
        // TODO: Integrate with email service (Formspree, EmailJS, etc.)
        this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Log the submission for debugging
        console.log('Contact form submission:', data);
        
        // TODO: Send to email service
        // Example with Formspree:
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     body: formData
        // });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#48bb78' : '#4299e1'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StudentCouncilApp();
});

// Add some utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};
