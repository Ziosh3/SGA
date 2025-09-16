# Student Council Website - Bahir Dar University STEM Incubation Center

A modern, responsive website for the student council at Bahir Dar University STEM Incubation Center with admin panel for content management.

## 🌟 Features

### Public Website
- **Responsive Design** - Works on all devices
- **Council Members** - Display with photos and roles
- **Events Section** - Upcoming activities and events
- **Contact Form** - Easy communication
- **Modern UI** - Beautiful gradients and animations

### Admin Panel
- **Secure Login** - Password protected admin access
- **Member Management** - Add, edit, delete council members
- **Event Management** - Create and manage events
- **Photo Upload** - Support for member and event photos
- **Real-time Updates** - Changes appear immediately on main site

## 📁 Project Structure

```
SGA/
├── index.html              # Main public website
├── admin.html              # Admin panel
├── styles.css              # Main website styles
├── admin-styles.css        # Admin panel styles
├── script.js               # Main website functionality
├── admin-script.js         # Admin panel functionality
├── data/
│   ├── members.json        # Members data (empty by default)
│   └── events.json         # Events data (empty by default)
├── assets/
│   ├── members/            # Member photos
│   └── events/             # Event photos
└── README.md               # This file
```

## 🚀 Quick Start

### For Development (Local)
1. **Download** all files to your computer
2. **Open** `index.html` in your browser to view the public site
3. **Open** `admin.html` in your browser to access the admin panel
4. **Login** with credentials: `admin` / `password123`

### For Production (Deployed)
1. **Upload** all files to your web hosting
2. **Access** your domain to view the public site
3. **Access** `yourdomain.com/admin.html` for admin panel
4. **Login** with the same credentials

## 🔧 Admin Panel Usage

### Adding Members
1. Login to admin panel
2. Go to "Council Members" section
3. Click "Add Member"
4. Fill in details (name, role, program, email, bio)
5. Optionally upload a photo
6. Click "Add Member"

### Adding Events
1. Go to "Events" section
2. Click "Add Event"
3. Fill in details (title, date, location, description)
4. Optionally upload a photo
5. Click "Add Event"

### Managing Content
- **Edit**: Click the edit button (pencil icon)
- **Delete**: Click the delete button (trash icon)
- **View Website**: Click "View Website" to see changes

## 🎨 Customization

### Colors
The website uses a purple/blue gradient theme. To change colors, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #667eea;
}
```

### Content
- **Site Title**: Edit in `index.html`
- **Contact Info**: Update in the contact section
- **Social Links**: Modify in the footer

## 🔒 Security Notes

### For Production Deployment
- **Change default credentials** in admin panel
- **Use HTTPS** for secure data transmission
- **Consider server-side validation** for better security
- **Backup data regularly**

### Current Implementation
- Uses localStorage for data storage (demo purposes)
- Admin credentials: `admin` / `password123`
- No server-side validation (for demo)

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (not supported)

## 🛠️ Technical Details

### Frontend Technologies
- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **JavaScript (ES6+)** - Functionality
- **Font Awesome** - Icons

### Data Storage
- **localStorage** - Browser storage (current)
- **JSON format** - Structured data
- **Real-time sync** - Between admin and main site

### Responsive Design
- **Mobile-first** approach
- **Flexbox/Grid** layouts
- **Media queries** for different screen sizes

## 🚀 Deployment Options

### 1. Vercel (Recommended)
- **Free hosting**
- **Automatic deployments**
- **Great performance**
- **Easy setup**

### 2. Netlify
- **Free hosting**
- **Drag-and-drop deployment**
- **Custom domains**

### 3. GitHub Pages
- **Free hosting**
- **Version control**
- **Easy updates**

### 4. Traditional Hosting
- **cPanel hosting**
- **FTP upload**
- **Full control**

## 📞 Contact Information

**Bahir Dar University STEM Incubation Center**
- **Email**: studentcouncil@bdu.edu.et
- **Phone**: +251 911 234 567
- **Location**: STEM Incubation Center, Bahir Dar University
- **Office Hours**: Mon-Fri 8:00 AM - 5:00 PM

## 📄 License

This project is open source and available for educational and commercial use.

---

**Built with ❤️ for Bahir Dar University STEM Incubation Center Student Council!** 