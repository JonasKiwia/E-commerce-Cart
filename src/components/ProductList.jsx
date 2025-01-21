import React from 'react';

const ProductList = ({ products, addToCart, sortOption, setSortOption, searchQuery, setSearchQuery }) => {
  const sortedProducts = () => {
    let sorted = [...products];
    if (sortOption === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const filteredProducts = sortedProducts().filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="product-list">
      <h2>Products</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
