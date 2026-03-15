import React, { useState } from "react";

// Models
import { Product } from "models/Product";
import product_list from "./Products";

// Provider
import { useCart } from "context/CartContext";

// Components
import { FilterSection } from "./components/filter/Filter";
import { ProductGrid } from "./components/product-grid/ProductGrid";
import { ViewModeSelector } from "./components/view-mode-selector/ViewModeSelector";


// Css
import "./Catalog.css";

export function Catalog() {
  // Cart
  const { addToCart } = useCart();

  // Filter products
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "brand" | "stock" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');


  // Add to cart
  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart({ product: product, quantity: quantity });
  };

  // Filter products
  let filteredProducts = product_list.filter((product) => {
    const searchWords = searchTerm.toLowerCase().split(" ");

    const name = product.name.toLowerCase();
    const code = product.code.toLowerCase();

    return searchWords.every(
      (word) => name.includes(word) || code.includes(word)
    );
  });

  // Sort products function
  const handleSort = (field: "name" | "brand" | "stock") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort products
  if (sortField) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      let comparison = 0;

      if (sortField === "stock") {
        comparison = a.stock - b.stock;
      } else {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();
        comparison = aValue.localeCompare(bValue);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }

  return (
    <div className="catalog">
      <div className="catalog-container">
        <div className="catalog-header">
          <FilterSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        <ProductGrid
          key={filteredProducts.map(p => p.code).join('-')}
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          viewMode={viewMode}
        />
      </div>
    </div>
  )
}
