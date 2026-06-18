export default function Header({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  setSelectedCategory,
  setSearchQuery,
  setView,
  // YENİ EKLEDİM
  onLoginClick,
  // YENİ EKLEDİM
  onCartClick,
  // YENİ EKLEDİM
  cartCount
}) {
  const handleLogoClick = () => {
    setView("home");
    setSelectedCategory("Tümü");
    setSearchQuery("");
    setSearchInput("");
  };
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={handleLogoClick}>
            n11<span className="logo-accent">Clone</span>
          </div>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Ürün,Kategori veya Marka Ara..."
              className="search-input"
              onChange={(e)=>setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit" className="search-button">Ara</button>
          </form>
          <div className="header-actions">
            <div className="action-item" onClick={()=>setView('addProduct')}>
              <span>Yeni Ürün</span>
            </div>
            {/* YENİ EKLEDİM */}
            <div className="action-item" onClick={onLoginClick}>
              <span>Giriş Yap</span>
            </div>
            {/* YENİ EKLEDİM */}
            <div className="action-item" onClick={onCartClick}>
              <span>Sepetim</span>
              {/* YENİ EKLEDİM */}
              <span className="badge">{cartCount}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}