import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the ProductList component
const DynamicProductList = dynamic(() => import('../components/ProductList'), {
  loading: () => <p>Loading...</p>, // Optional: Loading component or message
  ssr: false, // Disable server-side rendering if not necessary
});

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <DynamicProductList />
    </div>
  );
};

export default ProductsPage;
