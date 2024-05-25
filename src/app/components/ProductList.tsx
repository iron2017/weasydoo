'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export const getStaticProps = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const products = res.data;
  
    return {
      props: {
        products,
      },
      revalidate: 10, // Revalidate at most once every 10 seconds
    };
  };
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        return (
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === '' || product.category === selectedCategory)
        );
    });

    const categories = Array.from(new Set(products.map((product) => product.category)));
 
    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
            if (response.status === 200) {
                setProducts(products.filter((product) => product.id !== id));
            }
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border border-gray-300 rounded-md p-4">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                        <p className="text-gray-700 mb-2">${product.price}</p>
                        <p className="text-gray-700 mb-2">{product.category}</p>
                        <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline" prefetch>
                            View Details
                        </Link>
                        <div className="mt-4">
                            <Link href={`products/update-product/${product.id}`} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 mr-2" prefetch>
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
