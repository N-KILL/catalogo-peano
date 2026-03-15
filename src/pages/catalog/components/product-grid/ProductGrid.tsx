import React, { useState } from "react";

// Models
import { Product } from "models/Product";

// Components
import { ProductCard } from "components/ProductCard/ProductCard";

// Css
import "./ProductGrid.css";

interface Props {
  products: Product[];
  onAddToCart: (product: Product, cantidad: number) => void;
  sortField?: "name" | "brand" | "stock" | null;
  sortDirection?: "asc" | "desc";
  onSort?: (field: "name" | "brand" | "stock") => void;
  viewMode: 'table' | 'cards';
}

export const ProductGrid: React.FC<Props> = ({
  products,
  onAddToCart,
  sortField,
  sortDirection,
  onSort,
  viewMode,
}) => {
  const [cantidades, setCantidades] = useState<Record<string, number>>({});

  const handleCantidadChange = (codigo: string, value: number) => {
    setCantidades((prev) => ({
      ...prev,
      [codigo]: value,
    }));
  };

  const renderSortIndicator = (field: "name" | "brand" | "stock") => {
    if (sortField !== field) return "  ↓↑";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return viewMode === 'table' ? (
    <table className="product-grid">
      <thead>
        <tr>
          <th>Código</th>
          <th
            onClick={() => onSort?.("name")}
            style={{ cursor: onSort ? "pointer" : "default" }}
          >
            Nombre{renderSortIndicator("name")}
          </th>
          <th
            onClick={() => onSort?.("brand")}
            style={{ cursor: onSort ? "pointer" : "default" }}
          >
            Marca{renderSortIndicator("brand")}
          </th>
          <th
            onClick={() => onSort?.("stock")}
            style={{ cursor: onSort ? "pointer" : "default" }}
          >
            Stock{renderSortIndicator("stock")}
          </th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const cantidad = cantidades[product.code] ?? 1;

          return (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>
                <p className={product.stock === 0 ? "back-red" : product.stock > 2 ? "back-green" : "back-yellow"}>
                  {product.stock === 0 ? "Sin stock" : product.stock > 2 ? "Disponible" : "Pocas unidades"}
                </p>
              </td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) =>
                    handleCantidadChange(
                      product.code,
                      Number(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <button
                  disabled={product.stock === 0}
                  onClick={() => onAddToCart(product, cantidad)}
                >
                  Agregar al carrito
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div className="product-cards-grid">
      {products.map((product) => (
        <ProductCard
          key={product.code}
          product={product}
          buttonText="Agregar al carrito"
          onButtonClick={() => onAddToCart(product, cantidades[product.code] ?? 1)}
          showCartIcon={true}
        />
      ))}
    </div>
  );
};