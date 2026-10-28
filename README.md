# Cartly – Shopping Cart Application

A modern, responsive shopping cart application built using React 19, TypeScript, and Vite. The application allows users to browse products, search and filter items, manage cart quantities, calculate order totals, and complete a demo checkout. It also includes light and dark themes for a better user experience.

## 1. Project Overview

Cartly is a frontend shopping cart application developed as part of the React JS Developer / Intern technical assignment for Codenzic Innovations.

The main objective of this project is to demonstrate frontend development skills, state management, API integration, form validation, responsive UI design, and persistent cart storage.

## 2. Technologies Used

- **React 19** – Building reusable UI components.
- **TypeScript** – Type safety and maintainable code.
- **Vite** – Development server and build tool.
- **Zustand** – Global shopping cart state management.
- **TanStack Query** – API data fetching, caching, and loading/error states.
- **Zod** – Runtime validation of API responses and form data.
- **localStorage** – Persisting cart data and theme preferences.
- **CSS** – Responsive styling and light/dark themes.
- **DummyJSON Products API** – Providing sample product data.
- **pnpm / npm** – Package management and project scripts.

## 3. Features

- Display products fetched from an external API.
- Search products by name.
- Filter and sort products.
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove individual cart items and clear the cart.
- Persist cart data using localStorage.
- Calculate subtotal, tax, discounts, and final total.
- Validate shipping information using Zod.
- Display an order summary and demo checkout confirmation.
- Switch between light mode and dark mode.
- Save the selected theme preference.
- Responsive interface for desktop, tablet, and mobile devices.

## 4. API Used

**DummyJSON Products API**

Base URL: [https://dummyjson.com/products](https://dummyjson.com/products)

Example endpoint:

`https://dummyjson.com/products`

The application uses this API to retrieve sample product information, such as product titles, prices, images, categories, and ratings.

The API provides demonstration data. It does not represent a real inventory or payment system.

## 5. Project Setup

### Prerequisites

Install the following software:

- Node.js (LTS version recommended)
- npm or pnpm
- Visual Studio Code (recommended)

### Clone the repository

```bash
git clone https://github.com/jam-96/codenzic-shopping-cart
cd codenzic-shopping-cart
```

### Install dependencies

Using npm:

```bash
npm install
```

Use the package manager appropriate for your project lockfile.

## 6. Commands to Run the Project

### Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173/`

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 7. State Management and Validation

### Zustand

Zustand manages shared cart state, including cart items and quantity updates. Its persistence middleware can save and restore cart data through localStorage.

### TanStack Query

TanStack Query manages product fetching and supports caching, loading states, and error handling.

### Zod

Zod validates incoming product data and shipping form information at runtime, helping the application handle invalid data safely.

### localStorage

localStorage preserves selected application preferences and persisted cart data across page refreshes.

## 8. Pricing and Checkout

The application calculates the order amount from the products in the cart.

The configured pricing rules include:

- Tax: 5%.
- Discount: 10% when the subtotal exceeds $100.
- Minimum checkout subtotal: $10.

These are demonstration rules and can be adjusted according to the assignment requirements.

The checkout process collects shipping information, validates the form, displays an order confirmation, and clears the cart after a successful demo order.

No real payment is processed.

## 9. Dark Mode

The application includes a theme toggle that allows users to switch between light and dark modes.

The selected theme is saved in localStorage so that the preference can be restored when the application is opened again.

The theme styling is intended to maintain readability and consistency across the product listing, cart, and checkout interface.

## 10. Deployment

The application can be deployed using Vercel, Netlify, or Cloudflare Pages.

### Recommended build settings

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: Project root containing `package.json`

### Deployment steps

1. Push the project to a GitHub repository.
2. Sign in to your preferred deployment platform.
3. Import the GitHub repository.
4. Configure the build settings.
5. Deploy the application.
6. Open the generated public URL and verify the main features.

The deployed URL should be added to this README after deployment.

**Live Application:** https://codenzic-shopping-cart-f5wz.vercel.app

**GitHub Repository:** [https://github.com/jam-96/codenzic-shopping-cart](https://github.com/jam-96/codenzic-shopping-cart)

Replace these placeholders with the actual links before submitting the assignment.

## 11. Known Limitations

- Product data depends on the availability of the DummyJSON API.
- Product information is sample data and is not connected to a real store inventory.
- Checkout is for demonstration purposes only.
- No real payment gateway or order-processing backend is integrated.
- Cart and theme preferences are stored locally in the browser.
- Clearing browser storage may remove locally persisted application data.
- The application does not provide authenticated user accounts or server-side order history.

## 12. Future Improvements

- Add user authentication and account management.
- Integrate a backend database for products and orders.
- Add a secure payment gateway.
- Implement a wishlist and product reviews.
- Add automated unit and integration tests.
- Improve accessibility and loading performance.

## 13. Author

Developed as a technical assignment for the React JS Developer / Intern position at **Codenzic Innovations**.

## 14. License

This project was created for educational and technical evaluation purposes.
