// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.members = [];
        this.events = [];
        this.currentUser = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadData();
        this.updateDashboardStats();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Navigation
        document.querySelectorAll('.nav-item[data-section]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(item.dataset.section);
            });
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Form submissions
        const addMemberForm = document.getElementById('addMemberForm');
        if (addMemberForm) {
            addMemberForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddMember(e.target);
            });
        }

        const addEventForm = document.getElementById('addEventForm');
        if (addEventForm) {
            addEventForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddEvent(e.target);
            });
        }

        const editMemberForm = document.getElementById('editMemberForm');
        if (editMemberForm) {
            editMemberForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEditMember(e.target);
            });
        }

        const editEventForm = document.getElementById('editEventForm');
        if (editEventForm) {
            editEventForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEditEvent(e.target);
            });
        }
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

            this.renderMembersTable();
            this.renderEventsTable();
        } catch (error) {
            console.error('Error loading data:', error);
            this.members = [];
            this.events = [];
            this.renderMembersTable();
            this.renderEventsTable();
        }
    }

    // NEW: Save data to localStorage for demo purposes
    // In a real deployment, this would save to a server database
    async saveDataToFiles() {
        try {
            // Save to localStorage (temporary solution for demo)
            localStorage.setItem('studentCouncilMembers', JSON.stringify(this.members));
            localStorage.setItem('studentCouncilEvents', JSON.stringify(this.events));
            
            console.log('Data saved to localStorage successfully');
            
            // Trigger main website refresh if it's open
            this.refreshMainWebsite();
            
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data.', 'error');
        }
    }

    // NEW: Refresh main website (silent - no automatic opening)
    refreshMainWebsite() {
        // Check if main website is open in another tab and refresh it silently
        if (window.opener && !window.opener.closed) {
            try {
                window.opener.location.reload();
            } catch (e) {
                console.log('Main website not accessible');
            }
        }
        
        // Don't automatically open new windows - just update the data
        console.log('Data updated successfully. Main website will refresh automatically.');
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in real app, this would be server-side)
        if (username === 'admin' && password === 'password123') {
            this.currentUser = { username, role: 'admin' };
            this.showDashboard();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid credentials. Please try again.', 'error');
        }
    }

    showDashboard() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        this.showSection('dashboard');
    }

    logout() {
        this.currentUser = null;
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('loginForm').reset();
        this.showNotification('Logged out successfully.', 'info');
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add active class to nav item
        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    updateDashboardStats() {
        const memberCount = document.getElementById('memberCount');
        const eventCount = document.getElementById('eventCount');
        const photoCount = document.getElementById('photoCount');

        if (memberCount) memberCount.textContent = this.members.length;
        if (eventCount) eventCount.textContent = this.events.length;
        
        // Count photos
        const totalPhotos = this.members.filter(m => m.photo).length + 
                           this.events.filter(e => e.photo).length;
        if (photoCount) photoCount.textContent = totalPhotos;
    }

    renderMembersTable() {
        const tbody = document.getElementById('membersTableBody');
        if (!tbody) return;

        if (this.members.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 3rem; color: #718096;">
                        <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h3>No Council Members Yet</h3>
                        <p>Add your first council member using the "Add Member" button above.</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.members.map(member => `
            <tr>
                <td>
                    ${member.photo ? 
                        `<img src="assets/members/${member.photo}" alt="${member.name}" class="member-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="member-photo" style="display: none;"><i class="fas fa-user"></i></div>` : 
                        `<div class="member-photo"><i class="fas fa-user"></i></div>`
                    }
                </td>
                <td><strong>${member.name}</strong></td>
                <td><span class="badge">${member.role}</span></td>
                <td>${member.program || 'N/A'}</td>
                <td>${member.email}</td>
                <td>
                    <div class="action-buttons-small">
                        <button class="btn-edit" onclick="adminPanel.editMember(${member.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="adminPanel.deleteMember(${member.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderEventsTable() {
        const tbody = document.getElementById('eventsTableBody');
        if (!tbody) return;

        if (this.events.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 3rem; color: #718096;">
                        <i class="fas fa-calendar" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h3>No Events Yet</h3>
                        <p>Add your first event using the "Add Event" button above.</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.events.map(event => `
            <tr>
                <td>
                    ${event.photo ? 
                        `<img src="assets/events/${event.photo}" alt="${event.title}" class="event-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="event-photo" style="display: none;"><i class="fas fa-calendar"></i></div>` : 
                        `<div class="event-photo"><i class="fas fa-calendar"></i></div>`
                    }
                </td>
                <td><strong>${event.title}</strong></td>
                <td>${event.date}</td>
                <td>${event.location}</td>
                <td><span class="badge">${event.category}</span></td>
                <td>
                    <div class="action-buttons-small">
                        <button class="btn-edit" onclick="adminPanel.editEvent(${event.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="adminPanel.deleteEvent(${event.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    async handleAddMember(form) {
        const formData = new FormData(form);
        const memberData = Object.fromEntries(formData.entries());
        
        // Handle file upload
        const photoFile = formData.get('photo');
        if (photoFile && photoFile.size > 0) {
            memberData.photo = await this.uploadFile(photoFile, 'members');
        } else {
            memberData.photo = null;
        }

        // Generate new ID
        memberData.id = Math.max(...this.members.map(m => m.id), 0) + 1;

        // Add to members array
        this.members.push(memberData);

        // Update UI
        this.renderMembersTable();
        this.updateDashboardStats();
        this.closeModal('addMemberModal');
        form.reset();

        // NEW: Save data to files
        await this.saveDataToFiles();

        this.showNotification('Member added successfully!', 'success');
    }

    async handleAddEvent(form) {
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        
        // Handle file upload
        const photoFile = formData.get('photo');
        if (photoFile && photoFile.size > 0) {
            eventData.photo = await this.uploadFile(photoFile, 'events');
        } else {
            eventData.photo = null;
        }

        // Generate new ID
        eventData.id = Math.max(...this.events.map(e => e.id), 0) + 1;

        // Add to events array
        this.events.push(eventData);

        // Update UI
        this.renderEventsTable();
        this.updateDashboardStats();
        this.closeModal('addEventModal');
        form.reset();

        // NEW: Save data to files
        await this.saveDataToFiles();

        this.showNotification('Event added successfully!', 'success');
    }

    editMember(id) {
        const member = this.members.find(m => m.id === id);
        if (!member) return;

        // Populate form
        document.getElementById('editMemberId').value = member.id;
        document.getElementById('editMemberName').value = member.name;
        document.getElementById('editMemberRole').value = member.role;
        document.getElementById('editMemberProgram').value = member.program || '';
        document.getElementById('editMemberEmail').value = member.email;
        document.getElementById('editMemberBio').value = member.bio || '';

        this.showModal('editMemberModal');
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) return;

        // Populate form
        document.getElementById('editEventId').value = event.id;
        document.getElementById('editEventTitle').value = event.title;
        document.getElementById('editEventDate').value = this.formatDateForInput(event.date);
        document.getElementById('editEventTime').value = event.time || '';
        document.getElementById('editEventLocation').value = event.location;
        document.getElementById('editEventDescription').value = event.description;
        document.getElementById('editEventCategory').value = event.category;
        document.getElementById('editEventRegistration').value = event.registration_required || 'false';

        this.showModal('editEventModal');
    }

    async handleEditMember(form) {
        const formData = new FormData(form);
        const memberData = Object.fromEntries(formData.entries());
        const id = parseInt(memberData.id);

        // Handle file upload
        const photoFile = formData.get('photo');
        if (photoFile && photoFile.size > 0) {
            memberData.photo = await this.uploadFile(photoFile, 'members');
        } else {
            // Keep existing photo
            const existingMember = this.members.find(m => m.id === id);
            memberData.photo = existingMember ? existingMember.photo : null;
        }

        // Update member
        const index = this.members.findIndex(m => m.id === id);
        if (index !== -1) {
            this.members[index] = { ...this.members[index], ...memberData };
        }

        // Update UI
        this.renderMembersTable();
        this.closeModal('editMemberModal');
        form.reset();

        // NEW: Save data to files
        await this.saveDataToFiles();

        this.showNotification('Member updated successfully!', 'success');
    }

    async handleEditEvent(form) {
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        const id = parseInt(eventData.id);

        // Handle file upload
        const photoFile = formData.get('photo');
        if (photoFile && photoFile.size > 0) {
            eventData.photo = await this.uploadFile(photoFile, 'events');
        } else {
            // Keep existing photo
            const existingEvent = this.events.find(e => e.id === id);
            eventData.photo = existingEvent ? existingEvent.photo : null;
        }

        // Update event
        const index = this.events.findIndex(e => e.id === id);
        if (index !== -1) {
            this.events[index] = { ...this.events[index], ...eventData };
        }

        // Update UI
        this.renderEventsTable();
        this.closeModal('editEventModal');
        form.reset();

        // NEW: Save data to files
        await this.saveDataToFiles();

        this.showNotification('Event updated successfully!', 'success');
    }

    async deleteMember(id) {
        if (confirm('Are you sure you want to delete this member?')) {
            this.members = this.members.filter(m => m.id !== id);
            this.renderMembersTable();
            this.updateDashboardStats();
            
            // NEW: Save data to files
            await this.saveDataToFiles();
            
            this.showNotification('Member deleted successfully!', 'success');
        }
    }

    async deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events = this.events.filter(e => e.id !== id);
            this.renderEventsTable();
            this.updateDashboardStats();
            
            // NEW: Save data to files
            await this.saveDataToFiles();
            
            this.showNotification('Event deleted successfully!', 'success');
        }
    }

    async uploadFile(file, folder) {
        // Convert file to base64 for storage in localStorage
        // In production, this should upload to a server/CDN
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Store the base64 data directly
                const base64Data = e.target.result;
                resolve(base64Data);
            };
            reader.readAsDataURL(file);
        });
    }

    formatDateForInput(dateString) {
        // Convert date string to YYYY-MM-DD format for input
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    // Settings functionality removed - not needed for current implementation

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
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

// Global functions for HTML onclick handlers
function showAddMemberModal() {
    adminPanel.showModal('addMemberModal');
}

function showAddEventModal() {
    adminPanel.showModal('addEventModal');
}

function closeModal(modalId) {
    adminPanel.closeModal(modalId);
}

function viewWebsite() {
    // Open main website in new tab
    const mainWindow = window.open('index.html', '_blank');
    if (mainWindow) {
        mainWindow.focus();
    }
}

// Initialize admin panel when DOM is loaded
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});
