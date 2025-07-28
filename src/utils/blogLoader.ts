export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  content: string
}

// Sample blog posts data - in a real app, this would come from markdown files
const samplePosts: BlogPostMetadata[] = [
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    date: '2025-01-15',
    category: 'General',
    tags: ['welcome', 'introduction'],
    excerpt: 'Welcome to my personal blog! This is where I share my thoughts on technology, programming, and life.',
    content: `# Welcome to My Blog

Welcome to my personal blog! This is where I share my thoughts on technology, programming, and life.

## What You'll Find Here

- **Technical Articles**: Deep dives into programming concepts, frameworks, and tools
- **Project Updates**: Updates on my personal and professional projects
- **Tutorials**: Step-by-step guides for various technologies
- **Life Reflections**: Thoughts on career, learning, and personal growth

## About This Blog

This blog is built with React, TypeScript, and Vite, featuring a unique desktop-style interface that makes browsing feel like using a desktop computer. Each blog post appears as an icon on the desktop that you can double-click to open.

Thanks for visiting, and I hope you find something interesting here!`
  },
  {
    slug: 'building-desktop-ui',
    title: 'Building a Desktop UI for the Web',
    date: '2025-01-20',
    category: 'Development',
    tags: ['react', 'ui', 'desktop'],
    excerpt: 'How I created a desktop-style interface for my blog using React and modern web technologies.',
    content: `# Building a Desktop UI for the Web

Creating a desktop-style interface for a web application is an interesting challenge that combines nostalgia with modern web technologies.

## The Concept

The idea was to create a blog that feels like using a desktop computer:
- Desktop icons represent blog posts
- Windows can be opened, minimized, and closed
- A taskbar at the bottom shows open windows
- Draggable windows for better interaction

## Technical Implementation

### Key Technologies
- **React 19**: For the component architecture
- **TypeScript**: For type safety and better development experience
- **CSS Grid & Flexbox**: For layout management
- **React Router**: For URL-based navigation

### Component Architecture
\`\`\`
Desktop (main container)
├── DesktopIcon (blog post icons)
├── BlogPost (window component)
└── Taskbar (bottom navigation)
\`\`\`

## Challenges Faced

1. **Window Management**: Keeping track of open windows and their states
2. **Responsive Design**: Making the desktop metaphor work on different screen sizes
3. **Performance**: Ensuring smooth animations and interactions

## Future Enhancements

- Drag and drop functionality for icons
- Resizable windows
- Multiple desktop spaces
- Context menus

Building this interface has been a fun way to combine retro computing aesthetics with modern web development practices!`
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for React Projects',
    date: '2025-01-25',
    category: 'Development',
    tags: ['typescript', 'react', 'best-practices'],
    excerpt: 'Essential TypeScript patterns and practices that every React developer should know.',
    content: `# TypeScript Best Practices for React Projects

TypeScript has become an essential tool for React development, providing type safety and better developer experience. Here are some best practices I've learned.

## Component Props

Always define clear interfaces for your component props:

\`\`\`typescript
interface ButtonProps {
  readonly variant: 'primary' | 'secondary'
  readonly children: React.ReactNode
  readonly onClick?: () => void
  readonly disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false
}) => {
  // Component implementation
}
\`\`\`

## State Management

Use proper typing for state:

\`\`\`typescript
interface AppState {
  readonly user: User | null
  readonly loading: boolean
  readonly error: string | null
}

const [state, setState] = useState<AppState>({
  user: null,
  loading: false,
  error: null
})
\`\`\`

## Custom Hooks

Type your custom hooks properly:

\`\`\`typescript
interface UseApiResult<T> {
  readonly data: T | null
  readonly loading: boolean
  readonly error: string | null
}

const useApi = <T>(url: string): UseApiResult<T> => {
  // Hook implementation
}
\`\`\`

## Key Takeaways

1. **Use readonly for immutable data**
2. **Prefer interfaces over types for objects**
3. **Use strict TypeScript configuration**
4. **Avoid \`any\` type at all costs**
5. **Leverage union types for better type safety**

These practices help create more maintainable and reliable React applications!`
  }
]

export const loadBlogPosts = async (): Promise<BlogPostMetadata[]> => {
  // In a real implementation, this would load markdown files from a posts directory
  // For now, we'll return our sample posts
  return Promise.resolve(samplePosts)
}

export const getBlogPost = async (slug: string): Promise<BlogPostMetadata | null> => {
  const posts = await loadBlogPosts()
  return posts.find(post => post.slug === slug) || null
}
