export default function ProductCard({ product }) { // Üst bileşenden gelen tekil ürün verisini (prop) alıyoruz
  return (
    <>
      <div className="product-card">
        {/* Ürün Görsel Alanı */}
        <div className="product-img-container">
          <img
            src={product.image} // Ürünün görsel linki
            alt={product.title} // Görsel yüklenmezse görünecek ürün adı
            className="product-img"
          />
        </div>
        
        {/* Ürün Bilgi Alanı */}
        <div className="product-info">
          <span className="product-category">{product.category}</span> {/* Ürün kategorisi */}
          <h3 className="product-title">{product.title}</h3> {/* Ürün adı */}
          
          {/* Ürün Değerlendirme / Puan Alanı */}
          <div className="product-rating">
            <span>*</span> {/* Yıldız ikonu temsili */}
            <span>{product.rating}</span> {/* Ürünün puanı (Örn: 4.5) */}
            <span className="text-gray-400">({product.ratingCount})</span> {/* Yorum sayısı */}
          </div>
          
          {/* Fiyat ve Sepete Ekle Butonu */}
          <div className="product-price-container">
            <span className="product-price">{product.price} TL</span> {/* Ürün fiyatı */}
            <button className="product-btn">
              <span>+</span> {/* Sepete ekleme butonu */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}