# Cocoa Haus - Bakery E-commerce Front End (React)

A responsive online bakery storefront built with React 18, Vite and React Router 6.
Layout and flow are inspired by popular bakery delivery sites. All branding, copy and visuals are original/placeholder.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview
```

## Features
- Home: promo bar, hero carousel, value props, categories, promo codes (click to copy), featured products, testimonials
- Products page with category filter (URL query `?cat=Cakes`)
- Cart with quantity controls, promo code validation, order summary, localStorage persistence
- Location picker modal (persisted)
- Contact form with validation
- Fully responsive (1024 / 768 / 480 breakpoints), 404 page

## Structure
```
src/
  components/
    common/    ProductCard, SectionTitle, Toast, LocationModal
    layout/    Header, Footer, Layout (Outlet + global UI)
    home/      Hero, ValueProps, Categories, Promos, FeaturedRange, AppDownload, Testimonials, CallToAction
  context/     CartContext (useReducer), LocationContext
  hooks/       useLocalStorage, useCarousel
  data/        products, promos (+ discount logic), constants
  pages/       Home, Products, Cart, About, Contact, NotFound
  styles/      main.css (base + components), pages.css (page-specific)
  App.jsx      router config
  main.jsx     providers + entry
```

## Deploy
Vercel/Netlify: build command `npm run build`, output dir `dist`. `vercel.json` already handles SPA rewrites.
For Netlify add `public/_redirects` containing `/* /index.html 200`.

## Next steps
Replace `src/data` with API calls (Node/Express + MongoDB), add auth (JWT), real product images, and checkout/payment.
