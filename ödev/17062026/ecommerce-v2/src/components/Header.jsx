import React, { useState } from "react"; 

export default function Header({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  setSelectedCategory,
  setSearchQuery,
  setView,
  sepet, //app.jsx gelen sepet verisi 
  sepeteEkle, //⭐️
  adetDusur //⭐️
}) {
  // Sepet penceresinin açılıp kapanmasını kontrol eden state
  const [isSepetAcik, setIsSepetAcik] = useState(false);

  // Sepetteki ürünlerin fiyatlarını ve adetlerini çarpıp toplam tutarı hesaplar
  const toplamTutar = sepet ? sepet.reduce((toplam, item) => toplam + (item.price * item.adet), 0) : 0;

  // ⭐️Satın al butonuna basılınca çalışan fonksiyon 
  const handleSatinAl = () => {
    if (!sepet || sepet.length === 0) {
      alert("Sepetiniz henüz boş! Önce ürün eklemelisiniz.");
      return;
    } //alışverişi tammala diiynce mesaj yazdırdık
    alert(`Alışverişiniz başarıyla tamamlandı! Toplam Tutar: ${toplamTutar} TL`);
    setIsSepetAcik(false); // ⭐️İşlem bitince pencereyi kapatır
  };

  const handleLogoClick = () => {
    setView("home");
    setSelectedCategory("Tümü");
    setSearchQuery("");
    setSearchInput("");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Alanı */}
        <div className="logo" onClick={handleLogoClick}>
          n11<span className="logo-accent">Clone</span>
        </div>

        {/* Arama Çubuğu Formu */}
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Ürün,Kategori veya Marka Ara..."
            className="search-input"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button type="submit" className="search-button">Ara</button>
        </form>

        {/* Sağ Menü Alanı (Giriş Yap, Sepetim vs.) */}
        <div className="header-actions">
          <div className="action-item" onClick={() => setView('addProduct')}>
            <span>Yeni Ürün</span>
          </div>
          <div className="action-item"><span>Giriş Yap</span></div>
          
          {/* ⭐️Sepet Alanı ve Mini Pencere Kutusu */}
          <div 
            className="action-item relative"
            onClick={() => setIsSepetAcik(!isSepetAcik)} // Tıklayınca açılır/kapanır yaptık
          >
            <div className="flex items-center gap-1"> {/* ⭐️Sepetteki tüm ürünlerin adetlerini üst üste toplayarak toplam sayıyı hesaplar*/}
              <span>Sepetim</span>
              <span className="badge">
                {sepet ? sepet.reduce((toplam, item) => toplam + item.adet, 0) : 0}
              </span>
            </div>

            {/* Açılır  Sepet Penceresi */}
            {isSepetAcik && (
              <div 
                className="absolute right-0 top-full mt-2.5 bg-white border border-gray-200 shadow-2xl rounded-2xl p-5 w-[380px] z-50 text-gray-800 cursor-default"
                onClick={(e) => e.stopPropagation()} // Pencere içine tıklayınca kapanmasın diye koruma ekledik
              >
                <h4 className="font-bold border-b border-gray-100 pb-2 mb-2 text-base text-gray-900 m-0">Sepetimdeki Ürünler</h4>
                
                {!sepet || sepet.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center m-0">Sepetiniz şu an boş.</p>
                ) : (
                  <>
                    {/* Ürün Listesi */}
                    <div className="max-h-[240px] overflow-y-auto mb-3 pr-1">
                      {sepet.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-50 text-xs gap-3">
                          <span className="font-medium text-gray-700 truncate max-w-[140px]" title={item.title}>
                            {item.title}
                          </span>
                          
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200 shrink-0">
                            <button
                              onClick={() => adetDusur(item.id)} // ogrendi notu sepetten eleman azaltmak veya bir adet kaldiysa silmek icin id gonderiyoruz
                              className="bg-red-500 text-white rounded w-5 h-5 hover:bg-red-600 transition-colors cursor-pointer font-bold flex items-center justify-center text-xs border-none"
                            >
                              -
                            </button>
                            <span className="font-bold text-gray-800 px-1 text-xs min-w-[12px] text-center">
                              {item.adet}
                            </span>
                            <button
                              onClick={() => sepeteEkle(item)} // kişi sepete yeni urun eklemek veya adedini artirmak icin tum urun objesini gonderiyoruz
                              className="bg-red-500 text-white rounded w-5 h-5 hover:bg-red-600 transition-colors cursor-pointer font-bold flex items-center justify-center text-xs border-none"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-gray-500 font-bold shrink-0 min-w-[70px] text-right">
                            {item.price * item.adet} TL
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* ⭐️Toplam Bilgisi ve Satın Al Butonu */}
                    <div className="border-t border-gray-100 pt-3 mt-2">
                      <div className="flex justify-between font-extrabold text-sm mb-3 text-gray-900">
                        <span>Toplam:</span>
                        <span className="text-red-500">{toplamTutar} TL</span>
                      </div>
                      <button
                        onClick={handleSatinAl}
                        className="w-full bg-green-600 text-white font-bold py-2 rounded-xl hover:bg-green-700 transition-colors cursor-pointer text-sm shadow-md border-none"
                      >
                        Alışverişi Tamamla (Satın Al)
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}