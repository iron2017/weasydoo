This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Getting Started
Product Management App
This is a Next.js application that allows users to manage products. It provides the following features:

Authentication
Login Page (/login): Users can log in with a hardcoded username and password (username: admin, password: password). Upon successful login, the user is redirected to the /dashboard route.
Product Listing
Product List (/products): Displays a list of products fetched from an external API (https://fakestoreapi.com/products). Each product item shows the product title, price, category, and an image.
Product Details
Product Details Page (/products/[id]): Shows detailed information about a specific product, including its title, price, category, description, image, and rating.
Create Product
Create Product Page (/products/create-product): Allows authenticated users to create a new product by providing the title, price, category, description, and image URL. Upon successful creation, the user is redirected to the /products route.
Update Product
Update Product Page (/products/update-product/[id]): Allows authenticated users to update an existing product by providing the new title, price, category, description, and image URL.
Components
ProductList: A reusable component that displays a list of products. It receives an array of products as a prop and renders them as a list.
Data Models
Product Interface
The Product interface defines the structure of a product object with the following properties:

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}



Dependencies
The app uses the following dependencies:

react: For building the user interface.
next: For server-side rendering and routing.
axios: For making HTTP requests to the external API.
tailwindcss: For styling the application.
API
The app uses the following external API:

https://fakestoreapi.com/products: A fake online REST API for testing and prototyping.
Getting Started
To run the app locally, follow these steps:

Clone the repository.
Install dependencies by running npm install or yarn install.
Start the development server with npm run dev or yarn dev.
Open http://localhost:3000 in your browser to see the app.
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
