export default function Sidebar({
  categories,          // Sol menüde listelenecek kategori dizisi
  selectedCategory,    // Şu an aktif/seçili olan kategori string'i
  setSelectedCategory  // Seçili kategoriyi değiştiren fonksiyon
}) {
  return (
    <>
      <aside className="sidebar">
        <h2 className="sidebar-title">Kategoriler</h2>
        <div className="sidebar-list">
          {categories.map((cat) => ( // Tüm kategorileri tek tek dönüyoruz
            <div
              key={cat} // React için benzersiz kimlik (key)
              // Seçili kategoriye göre aktif CSS sınıfını ekliyoruz
              className={`sidebar-item ${selectedCategory === cat ? "sidebar-item-active" : ""}`}
              onClick={() => setSelectedCategory(cat)} // Tıklanınca aktif kategoriyi güncelle
            >
              <span>{cat}</span> {/* Kategori adı */}
              <span className="text-gray-400">&gt;</span> {/* Sağ ok işareti (>) */}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}