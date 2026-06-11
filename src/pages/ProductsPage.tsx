
import React, { useState } from 'react';
import ProductCard from './ProductCard';

// Assuming you have a Product type defined somewhere
interface Product {
    id: number;
    title: string;
    price: number;
    // ... other properties
}

interface ProductsPageProps {
    products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
    // 1. Store the search term in useState
    const [searchTerm, setSearchTerm] = useState<string>("");

    // 2. Handle the onChange event with a typed handler
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // 3. Filter products by the search term case-insensitively
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-container">
            <h2>Our Products</h2>

            {/* Text input for filtering */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products by title..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Render the filtered products */}
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found matching "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
}