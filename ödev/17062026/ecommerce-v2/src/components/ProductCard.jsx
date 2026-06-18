export default function ProductCard({ product, onClick, onAddToCart }) { // YENİ EKLEDİM (onAddToCart prop olarak alındı)
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-img-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-img"
        />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span>★</span>
          <span>{product.rating}</span>
          <span className="text-gray-400 font-normal">
            ({product.ratingCount})
          </span>
        </div>
        <div className="product-price-container">
          <span className="product-price">
            {product.price.toLocaleString("tr-TR")} TL
          </span>
          <button
            className="product-btn"
            onClick={(e) => {
              e.stopPropagation(); // YENİ EKLEDİM (Butona basınca detay sayfasının açılmasını engeller)
              onAddToCart(product); // YENİ EKLEDİM (Sepete ekleme fonksiyonunu tetikler)
            }}
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
}