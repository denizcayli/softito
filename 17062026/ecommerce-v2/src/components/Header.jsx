export default function Header({
  searchInput,         // Arama inputundaki anlık metin
  setSearchInput,      // İnput metnini güncelleyen fonksiyon
  handleSearchSubmit,  // Arama formu gönderildiğinde tetiklenen fonksiyon
  setSelectedCategory, // Seçili kategoriyi değiştiren fonksiyon
  setSearchQuery,      // Filtrelemeyi tetikleyen asıl arama kelimesi fonksiyonu
  setView,             // Sayfa görünümünü değiştiren fonksiyon
}) {
  // Logoya tıklandığında tüm filtreleri temizleyip anasayfaya döndüren fonksiyon
  const handleLogoClick = () => { 
    setView("home");             // Anasayfaya yönlendir
    setSelectedCategory("Tümü"); // Kategoriyi sıfırla
    setSearchQuery("");          // Filtrelenen arama kelimesini sıfırla
    setSearchInput("");          // Arama input kutusunu temizle
  };

  return (  
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo Alanı: Tıklandığında her şeyi sıfırlar */}
          <div className="logo" onClick={handleLogoClick}> 
            n11<span className="logo-accent">Clone</span>
          </div>

          {/* Arama Formu */}
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Ürün,Kategori veya Marka Ara..."
              className="search-input"
              onChange={(e) => setSearchInput(e.target.value)} // İnput değiştikçe state'i güncelle
              value={searchInput} // Input değerini state'e bağladık (Controlled Component)
            />
            <button type="submit" className="search-button">Ara</button>
          </form>

          {/* Sağ Üst Menü Linkleri */}
          <div className="header-actions">
            {/* Tıklandığında Ürün Ekleme sayfasını açar */}
            <div className="action-item" onClick={() => setView('addProduct')}>
              <span>Yeni Ürün</span> 
            </div>
            <div className="action-item">
              <span>Giriş Yap</span>
            </div>
            <div className="action-item">
              <span>Sepetim</span>
              <span className="badge">0</span> {/* Sabit sepet sayısı */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}