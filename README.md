# Cartly — Shopping Cart Application

A responsive shopping-cart assignment project built with React 19, TypeScript, Vite, Bootstrap, Zustand, TanStack Query, Zod, and localStorage.

## Features

- Fetches products from the public DummyJSON products API.
- Validates the product API response with Zod before rendering it.
- Responsive product grid showing image, title, category, price, rating, and add-to-cart action.
- Light/dark mode toggle in the header; theme preference is remembered in localStorage.
- Search by product title, filter by category and maximum price, clear filters, and sort by price/rating.
- Loading, error, empty-search, and empty-cart states.
- Zustand global cart state with add, remove, clear, and quantity controls.
- Cart quantity is constrained to 1–5 per product.
- Cart persists across refreshes using Zustand's `persist` middleware and localStorage.
- Cart summary calculates subtotal, 5% tax, 10% discount when subtotal is greater than $100, and final total.
- Checkout is disabled when subtotal is below $10, with an explanatory message.
- Shipping form is managed with React state and validated with Zod (no form library).
- Read-only payment summary and demo Place Order success state. No payment gateway is connected.

## Theme mode

Use the sun/moon button in the header to switch between light and dark themes. Cartly saves the selected theme as `cartly-theme` in localStorage, so it stays selected after refresh.

## Tech stack

- React 19 + TypeScript
- Vite
- Bootstrap 5 plus custom CSS
- Zustand
- TanStack Query
- Zod
- pnpm
- DummyJSON API

## Requirements

Install a current Node.js LTS release and pnpm.

## Setup

```bash
pnpm install
pnpm dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in your browser.

## Production build

```bash
pnpm build
pnpm preview
```

The build command runs TypeScript checks and creates the production files in `dist/`.

## API used

`https://dummyjson.com/products?limit=100`

Product data is fetched with `fetchProducts()` in `src/api/products.ts`. TanStack Query manages fetching, caching, loading, and error states. Zod validates the API response.

## Project structure

```text
src/
  api/products.ts             API request and Zod response validation
  components/
    CartDrawer.tsx            Cart UI and cart summary
    Checkout.tsx              Shipping form and order confirmation
    Header.tsx                Site header and cart count
    ProductCard.tsx           Product card
  hooks/useProductFilters.ts  Search, category/price filters, sorting
  store/cartStore.ts          Zustand cart state and persistence
  types/product.ts            Product schema and TypeScript type
  utils/cartTotals.ts         Cart calculations and currency formatting
  validation/shippingSchema.ts Zod shipping form schema
  App.tsx                     Main page composition
  main.tsx                    React entry point and QueryClient provider
  styles.css                  Responsive visual styling
```

## Calculation rules

- Subtotal = sum of product price × quantity.
- Tax = 5% of subtotal.
- Discount = 10% of subtotal only when subtotal is greater than $100.
- Final total = subtotal + tax − discount.
- Checkout eligibility uses the assignment's minimum $10 subtotal rule.

## Known limitations

- This is a demonstration project; it does not connect to a payment gateway or create a real backend order.
- The public DummyJSON API and network connection are required to load products.
- Currency is displayed in USD to match the assignment's price examples.
- Product availability/stock is displayed by the API but is not used to restrict cart quantities because the assignment defines a per-item quantity cap of five.

## Deployment

### Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Use build command `pnpm build`.
4. Use output directory `dist`.
5. Deploy and test the public URL.

### Netlify

1. Import the GitHub repository in Netlify.
2. Build command: `pnpm build`.
3. Publish directory: `dist`.
4. Deploy and test the public URL.

## Before submission

- [ ] Run `pnpm install` and `pnpm build`.
- [ ] Test search, filters, sorting, and clear filters.
- [ ] Test cart add/remove/quantity limits and persistence after refresh.
- [ ] Check subtotal, tax, discount threshold, and $10 checkout minimum.
- [ ] Test each required shipping field and invalid email.
- [ ] Place a demo order and confirm the cart clears.
- [ ] Add the GitHub repository and live deployment links to your submission email.
