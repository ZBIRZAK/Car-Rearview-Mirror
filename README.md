# Car Rearview Mirror Shop

A modern React-inspired web application for selling car rearview mirrors with a TikTok-inspired layout and interaction.

## 🚀 Features

- **TikTok-style Layout**: Vertical brand selector on the right side
- **Multi-step Flow**: Brand → Model → Year → Lead Form
- **Mobile-first Responsive Design**: Works on all device sizes
- **Interactive UI**: Smooth transitions and hover effects
- **Form Validation**: Client-side validation with user feedback
- **Mock Data**: Comprehensive car brand, model, and year data
- **Bottom Navigation**: Easy access to Home, WhatsApp, and Contact

## 🧩 Components

### 1. Right Vertical Brand Selector
- Fixed vertical scroll on the right side
- Displays 8 car brands with icons
- Highlights active brand selection
- Disabled during selection process

### 2. Main View (Center Area)
**Default State (Home)**
- App title and description
- Featured products banner
- Three product cards with hover effects

**Step 1 - Brand Selected**
- Displays related car models as cards
- Each model is selectable

**Step 2 - Model Selected**
- Shows available production years (2005-2024)
- Years displayed as selectable buttons

**Step 3 - Year Selected**
- Lead form with validation:
  - Full Name (required)
  - Email (validated format)
  - Phone Number (validated format)
- On submit: logs data to console and shows success message

### 3. Bottom Navigation Bar
- **🏠 Home**: Resets to initial home view
- **💬 WhatsApp**: Opens WhatsApp link (mock URL)
- **📞 Contact**: Shows contact information alert

## 📱 Mock Data Structure

```javascript
const mockData = {
  brands: [
    { id: 1, name: 'Toyota', icon: '🚗' },
    { id: 2, name: 'BMW', icon: '🚙' },
    // ... 6 more brands
  ],
  models: {
    1: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander'], // Toyota models
    2: ['3 Series', '5 Series', 'X3', 'X5', 'i3'], // BMW models
    // ... models for each brand
  },
  years: [2024, 2023, 2022, ..., 2005] // Last 20 years
};
```

## 🎨 UI/UX Features

- **Smooth Transitions**: All interactions have smooth animations
- **Visual Feedback**: Clear indication of current step and selections
- **Progressive Disclosure**: Future steps disabled until current step completed
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Clean Minimal UI**: Focus on content with subtle shadows and gradients

## 🛠️ Technical Implementation

### State Management
- Uses vanilla JavaScript state management
- Tracks: selectedBrand, selectedModel, selectedYear, currentView
- Form data stored separately for validation

### Validation Logic
- Required field validation
- Email format validation using regex
- Phone number format validation
- User-friendly error messages

### Responsive Design
- Media queries for different screen sizes
- Flexible grid layouts
- Adjustable brand selector width
- Mobile-optimized navigation

## 📦 How to Run

### Option 1: Direct Browser (Recommended)
Simply open `index.html` in any modern browser.

### Option 2: Local Server
```bash
# Using Python 3
python3 -m http.server 3000

# Using Node.js (if available)
npx serve .

# Then visit http://localhost:3000
```

## 🎯 User Flow

1. **Home Screen**: User sees featured products and app introduction
2. **Brand Selection**: User selects a car brand from the right sidebar
3. **Model Selection**: User chooses their specific car model
4. **Year Selection**: User selects the production year
5. **Lead Form**: User fills out contact information
6. **Submission**: Form validates and submits data to console

## 📝 Development Notes

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies required
- Mobile-first approach with progressive enhancement
- Clean, maintainable code structure
- Comprehensive comments explaining logic

## 🎨 Design Choices

- **Color Scheme**: Professional blue gradient with clean whites
- **Typography**: System fonts for optimal performance
- **Icons**: Emoji-based for simplicity and universal support
- **Spacing**: Consistent padding and margins using a modular scale
- **Shadows**: Subtle shadows for depth without overwhelming the design

## 🚀 Future Enhancements

- Integration with actual backend API
- User account system
- Product catalog with images
- Shopping cart functionality
- Payment processing
- Real-time inventory updates