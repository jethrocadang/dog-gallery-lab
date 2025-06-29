# Dog Gallery App

A comprehensive dog gallery web application built with modern React technologies.

## Features

- **Gallery View**: Grid layout of random dog images with infinite scroll
- **Breeds View**: List all dog breeds with search/filter functionality
- **Single Breed Page**: Show breed details, multiple images, and breed-specific info
- **Favorites System**: Add/remove dogs from favorites (persisted in localStorage)
- **Role-Based Access Control**: Different permissions for guests, users, and admins
- **Responsive Design**: Mobile-first approach

## Tech Stack

- **React 18** with TypeScript
- **TanStack Router** for file-based routing
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Dog CEO API** as the data source
- **Lucide React** for icons
- **React Hook Form** + **Zod** for forms and validation

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dog-gallery-lab.git
cd dog-gallery-lab
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Accounts

The app includes three demo accounts with different permission levels:

- **Guest**: Email: guest@example.com, Password: password
- **User**: Email: user@example.com, Password: password
- **Admin**: Email: admin@example.com, Password: password

## Project Structure

```
src/
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── layout/ (layout components)
│   └── features/ (feature-specific components)
├── hooks/ (custom hooks)
├── lib/ (utilities, API clients, auth)
├── routes/ (file-based routes)
├── types/ (TypeScript definitions)
└── styles/ (global styles)
```

## Features by Role

- **Guest**: View gallery, browse breeds (read-only)
- **User**: All guest permissions + favorites management
- **Admin**: All user permissions + admin dashboard access

## API Integration

The app uses the [Dog CEO API](https://dog.ceo/dog-api/) for fetching dog images and breed information:

- `GET /breeds/list/all` - Get all breeds
- `GET /breed/{breed}/images` - Get breed images
- `GET /breeds/image/random/{count}` - Random images
- `GET /breed/{breed}/images/random/{count}` - Random breed images

## License

This project is licensed under the MIT License.
