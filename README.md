# Axon-RL Project Site

This is the official project site for Axon-RL, built with Hugo static site generator.

## About

Axon-RL is dedicated to wiring general intelligence through reinforcement learning research and development.

## Development

### Prerequisites

- Hugo (extended version)

### Running locally

1. Start the development server:
   ```bash
   hugo server --buildDrafts
   ```

2. Open your browser to `http://localhost:1313`

### Building for production

```bash
hugo --minify
```

The generated site will be in the `public/` directory.

### Adding blog posts

Create new blog posts in the `content/blog/` directory:

```bash
hugo new content/blog/my-new-post.md
```

## Site Structure

- `layouts/` - Hugo templates
- `assets/` - CSS and other assets
- `content/` - Markdown content files
- `static/` - Static files (images, etc.)
- `hugo.toml` - Hugo configuration

## Styling

The site uses a newspaper-like aesthetic with:
- Light yellow/cream background
- Black text for readability
- Monospace font for retro feel
- Dark gray borders and accents