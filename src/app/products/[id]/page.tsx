"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row">
                <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-cover mb-4 md:mb-0" />
                <div className="md:ml-4">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-700 mb-2">${product.price}</p>
                    <p className="text-gray-700 mb-2">Category: {product.category}</p>
                    <p className="text-gray-700 mb-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
