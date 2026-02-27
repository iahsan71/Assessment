# Front-End Assessment - Email Inbox Dashboard

A modern, responsive email inbox dashboard built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time API Integration**: Fetches data from JSONPlaceholder API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Smooth extraction loader and skeleton screens
- **Error Handling**: Graceful error states with retry functionality
- **Interactive Chat**: Real-time messaging interface with timestamp
- **Component Architecture**: Feature-based modular React components

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Node.js**: 18.18+ required (20 LTS recommended)

## ⚠️ Prerequisites

- **Node.js 18.18 or higher** (Node.js 20 LTS recommended)
- npm or yarn package manager

**Check your Node.js version:**
```bash
node --version
```

If you're using Node.js 18 or lower, please upgrade to Node.js 24 LTS:
- Download from: https://nodejs.org/
- Or use nvm: `nvm install 24 && nvm use 24`

See `NODE_VERSION_ISSUE.md` for detailed upgrade instructions.

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd front-end-assessment

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 APIs Used

This project integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API:

- **Posts API**: `/posts` - Used as email messages
- **Users API**: `/users` - Used for email senders/recipients
- **Comments API**: `/comments` - Used as email replies

### API Integration Details

- Fetches 10 posts as email threads
- Maps users to email senders with avatars
- Retrieves comments as conversation replies
- Implements loading states during API calls
- Error handling with user-friendly messages

## 📁 Project Structure

```
├── app/
│   ├── (dashboard)/
│   │   ├── inbox/
│   │   │   └── page.tsx       # Inbox page route
│   │   └── layout.tsx         # Dashboard layout
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles
│   └── icon.svg               # Favicon
├── components/
│   ├── inbox/
│   │   ├── InboxDashboard.tsx # Main dashboard component
│   │   ├── EmailList.tsx      # Email list sidebar
│   │   └── EmailDetail.tsx    # Email detail/chat view
│   ├── layout/
│   │   └── InboxSidebar.tsx   # Navigation sidebar
│   ├── common/
│   │   ├── ExtractionLoader.tsx # Initial loading animation
│   │   └── LoadingSkeletons.tsx # Skeleton loading states
│   ├── providers/
│   │   └── ThemeProvider.tsx  # Theme context provider
│   └── ui/                    # Reusable UI components (Radix UI)
├── lib/
│   ├── api/
│   │   └── emails.ts          # API client & data fetching
│   ├── actions/
│   │   └── emailActions.ts    # Server actions
│   ├── hooks/
│   │   └── useEmails.ts       # Custom React hooks
│   ├── store/
│   │   └── emailStore.ts      # Zustand store (optional)
│   └── utils.ts               # Utility functions
├── hooks/
│   ├── useMobile.ts           # Mobile detection hook
│   └── useToast.ts            # Toast notification hook
└── public/                    # Static assets

```

## 🎨 Component Architecture

### Feature-Based Organization

Components are organized by feature/domain for better scalability:

- **inbox/**: Email-related components (dashboard, list, detail)
- **layout/**: Layout components (sidebar, header, footer)
- **common/**: Shared components (loaders, skeletons)
- **providers/**: Context providers (theme, auth)
- **ui/**: Reusable UI primitives (buttons, inputs, dialogs)

### API & Data Layer

- **lib/api/**: API client functions and data fetching logic
- **lib/actions/**: Next.js server actions for data mutations
- **lib/hooks/**: Custom React hooks for data fetching and state
- **lib/store/**: State management (Zustand store - optional)

### Main Components

- **InboxDashboard**: Container component using useEmails hook
- **EmailList**: Displays list of emails with search and filters
- **EmailDetail**: Shows email conversation with chat interface
- **InboxSidebar**: Navigation menu for inbox folders
- **ExtractionLoader**: Animated loading screen during data fetch

### Reusable UI Components

Located in `components/ui/`, built with Radix UI primitives for accessibility and customization.

## 🔄 State Management

- React hooks (`useState`, `useEffect`) for local state
- Props drilling for component communication
- No external state management library (keeping it simple)
- Error boundaries for graceful error handling

## 📱 Responsive Design

- Desktop-first approach with mobile breakpoints
- Collapsible sidebar on mobile devices
- Touch-friendly interface elements
- Adaptive layouts using Tailwind responsive utilities

## ⚡ Performance Optimizations

- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Lazy loading for better initial load time
- Efficient re-renders with proper React patterns
- Route groups for better code organization

## 🧪 Code Quality

- **TypeScript**: Full type safety across the project
- **Clean Code**: Descriptive variable and function names
- **Component Modularity**: Single responsibility principle
- **Consistent Naming**: PascalCase for components, camelCase for utilities
- **Feature-Based Structure**: Scalable folder organization

## 🚧 Error Handling

- **API Errors**: User-friendly error messages with retry button
- **Loading States**: Skeleton screens and extraction loader
- **Empty States**: Helpful messages when no data available
- **Network Failures**: Graceful degradation with error boundaries

## 🔧 Assumptions Made

1. **API Data**: JSONPlaceholder data is used as mock email data
2. **Authentication**: No authentication implemented (out of scope)
3. **Real-time Updates**: Simulated with local state (no WebSocket)
4. **Email Actions**: Archive, delete, etc. are UI-only (no backend)
5. **Search/Filter**: UI implemented but not fully functional (can be extended)
6. **Route Structure**: Using Next.js route groups for better organization

## 📝 Future Enhancements

- [ ] Implement full search and filter functionality
- [ ] Add email composition feature
- [ ] Integrate real email API
- [ ] Add unit and integration tests (Jest, React Testing Library)
- [ ] Implement email actions (archive, delete, mark as read)
- [ ] Add pagination for email list
- [ ] Implement dark mode toggle
- [ ] Add keyboard shortcuts
- [ ] Implement drag-and-drop for email organization
- [ ] Add email attachments support
- [ ] Implement email templates
- [ ] Add analytics and monitoring

## 🔗 Deployment

This project can be deployed on:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any platform supporting Node.js

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🧪 Testing (Future)

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📄 License

This project is created for assessment purposes.

## 👤 Author

[Your Name]

---

Built with ❤️ using Next.js and TypeScript
