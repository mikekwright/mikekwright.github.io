<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization #_use-a-githubcopilotinstructionsmd-file -->

# Personal Blog Project Instructions

This is a React TypeScript personal blog project with the following characteristics:

## Project Structure
- **React 19** with **TypeScript** and **Vite** for building
- **Medium-style blog UI** with clean, modern design
- **Client-side routing** using React Router with SPA support for static hosting
- **Markdown support** for blog posts using react-markdown and gray-matter
- **GitHub Actions** for deployment to GitHub Pages
- **Domain**: mikewright.me will reference the GitHub Pages
- **Relative imports** for all built resources to support static hosting

## Code Guidelines
- Follow functional programming paradigms
- Use immutable variables where possible
- Write self-documenting code with meaningful names
- Create modular and reusable components
- Follow design patterns and inversion of control principles
- Avoid unnecessary complexity and focus on clarity

## UI/UX Requirements
- Medium-style blog layout with post previews
- Clean navigation and typography
- Responsive design that works on all devices
- Professional appearance suitable for a software engineer's blog

## Blog Features
- Markdown posts with frontmatter metadata
- Post categories and tags
- Date-based organization
- Easy content management

## Deployment
- GitHub Actions workflow for building and deploying to GitHub Pages
- Static site generation optimized for GitHub Pages with relative paths
- SPA routing support using 404.html redirect technique
- Custom domain configuration for mikewright.me
