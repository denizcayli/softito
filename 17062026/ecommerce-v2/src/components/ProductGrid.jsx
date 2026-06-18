import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onProductClick, onAddToCart }) { // YENİ EKLEDİM (onAddToCart prop olarak alındı)
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
          onAddToCart={onAddToCart} // YENİ EKLEDİM (Karta fonksiyonu aktardık)
        />
      ))}
    </div>
  );
}