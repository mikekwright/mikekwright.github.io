# Desktop-Style Personal Blog

A unique personal blog built with React, TypeScript, and Vite that mimics a desktop computer interface. Blog posts appear as desktop icons that can be opened in draggable windows, complete with a Windows 11-style taskbar.

## Features

- **Desktop Metaphor**: Blog posts appear as icons on a desktop background
- **Window Management**: Click to open blog posts in draggable windows
- **Windows 11-Style Taskbar**: Bottom taskbar showing open windows and system clock
- **Markdown Support**: Write blog posts in Markdown with frontmatter metadata
- **TypeScript**: Full type safety throughout the application
- **GitHub Pages Deployment**: Automated deployment via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20 or higher, npm or yarn
- **OR** Nix with flakes enabled (recommended)

### Installation

#### Option 1: Using Nix Flakes (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd blog

# Enter development environment (automatically installs Node.js 22 and dependencies)
nix develop

# Install npm dependencies
npm install

# Start development server
npm run dev
```

#### Option 2: Traditional Node.js Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd blog

# Install dependencies
npm install

# Start development server
npm run dev
```

### Using Nix Commands

The flake provides several convenient commands:

```bash
# Enter development shell
nix develop

# Run development server directly
nix run

# Build for production
nix run .#build

# Preview production build
nix run .#preview

# Run checks (TypeScript, ESLint, build)
nix flake check
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Desktop.tsx      # Main desktop container
│   ├── DesktopIcon.tsx  # Blog post icons
│   ├── BlogPost.tsx     # Window component for blog posts
│   └── Taskbar.tsx      # Bottom taskbar
├── utils/
│   └── blogLoader.ts    # Blog post loading utilities
└── App.tsx              # Main application component

public/
└── posts/               # Markdown blog posts
    ├── welcome-to-my-blog.md
    ├── building-desktop-ui.md
    └── typescript-best-practices.md
```

## Adding Blog Posts

Create new Markdown files in the `public/posts/` directory with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
category: "Development"
tags: ["react", "typescript"]
excerpt: "A brief description of your post"
---

# Your Post Content

Write your blog post content here using Markdown.
```

## Deployment

This project is configured for deployment to GitHub Pages:

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Configure your custom domain in GitHub Pages settings
4. Update `vite.config.ts` base path if needed

## Technologies Used

- **React 19**: Modern React with hooks and functional components
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **React Markdown**: Markdown rendering
- **Gray Matter**: Frontmatter parsing
- **CSS**: Custom styling with modern CSS features

## License

MIT License - feel free to use this project as a template for your own blog!
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
