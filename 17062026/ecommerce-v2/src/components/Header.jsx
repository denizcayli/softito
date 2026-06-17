export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            n11<span className="logo-accent">Clone</span>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Ürün,Kategori veya Marka Ara..."
              className="search-input"
            />
            <button className="search-button">Ara</button>
          </div>
          <div className="header-actions">
            <div className="action-item">
              <span>Yeni Ürün</span>
            </div>
            <div className="action-item">
              <span>Giriş Yap</span>
            </div>
            <div className="action-item">
              <span>Sepetim</span>
              <span className="badge">0</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
