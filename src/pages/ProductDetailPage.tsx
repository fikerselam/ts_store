import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define the interface matching the Fake Store API response shape
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

const ProductDetailPage: React.FC = () => {
    // 1. Read the id from the URL parameters
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 2. Store the result in useState (union type with null for the initial loading state)
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 3. Fetch the product details with useEffect when the component mounts or id changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);

                if (!response.ok) {
                    throw new Error('Product not found');
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    // Loading and Error States
    if (loading) return <div style={styles.centered}>Loading product details...</div>;
    if (error || !product) return <div style={styles.centered}>Error: {error || 'Product not found'}</div>;

    return (
        <div style={styles.container}>
            {/* 5. Back button that navigates to / */}
            <button style={styles.backButton} onClick={() => navigate('/')}>
                &larr; Back to Products
            </button>

            {/* 4. Display the product image, title, price, category, and description */}
            <div style={styles.card}>
                <div style={styles.imageContainer}>
                    <img src={product.image} alt={product.title} style={styles.image} />
                </div>

                <div style={styles.detailsContainer}>
                    <span style={styles.category}>{product.category}</span>
                    <h1 style={styles.title}>{product.title}</h1>
                    <p style={styles.price}>${product.price.toFixed(2)}</p>
                    <p style={styles.description}>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

// Basic inline styling for presentation
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '2rem',
        maxWidth: '1024px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
    },
    backButton: {
        padding: '0.5rem 1rem',
        marginBottom: '2rem',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    card: {
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    imageContainer: {
        flex: '1 1 300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '400px',
        objectFit: 'contain',
    },
    detailsContainer: {
        flex: '1 1 400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    category: {
        textTransform: 'uppercase',
        color: '#666',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    title: {
        fontSize: '2rem',
        margin: 0,
        color: '#333',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2b6cb0',
        margin: 0,
    },
    description: {
        lineHeight: '1.6',
        color: '#4a5568',
    },
    centered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '1.25rem',
    },
};

export default ProductDetailPage;