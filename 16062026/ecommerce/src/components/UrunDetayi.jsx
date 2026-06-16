import { useEffect } from "react";

export default function UrunDetayi({ product, onClose, onSepeteEkle }) {
  useEffect => {
  const handleKeyDown = e => {
    // eğer kullanıcının bastığı klavye tuşu esc tuşuna eşitse buraya gir dedik
    if e.key === Escape onClose // üstten gelen modalı kapatma fonksiyonu
  };
  // tarayıcıya "klavyede bi tuşa basılırsa git handleKeyDown  çalıştır" ajanı diktik
  window.addEventListener keydown, handleKeyDown;
  
  // modal ekrandan kaybolursa tarayıcıda boşuna klavye ajanı kalmasın diye sildik
  return () => {
    window.removeEventListener keydown, handleKeyDown;
  };
}, [onClose]; // onClose fonksiyonu değişirse bu takibi güncelle dedik

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // modal ilk açıldığında sitenin ana gövdesinin kaydırma çubuğunu gizle dedik
    return () => {
      document.body.style.overflow = "";
    }; //modal ekrandan yok olurken kaydırma çubuğunu eski haline geri getirdik
  }, []);

  useEffect => {
  // eğer product verisi dolu geldiyse bu if kapısını aç dedik
  if product {
    // konsola bu modal bileşeninin ekrana başarıyla çizildiğini mount loguyla bildirdik
    console.log [Ders Notu - Mount] UrunDetayi modalı açıldı: product.ad
  }
  //kullanıcı modalı kapattığı an buradaki fonksiyon tetiklenir
  return () => {
    // konsola bu bileşenin ekrandan silindiğini unmount loguyla çaktık
    console.log [Ders Notu - Unmount] UrunDetayi modalı kapatıldı ve bellekten temizlendi.
  };
}, [product]; // bağımlılık kutusu: her yeni ürün tıklandığında bu doğma ve ölme takibini tazele dedik
  
// getInventoryWarning adında stok durumunu kontrol eden fonksiyonu başlattık
const getInventoryWarning = () => {

  // eğer elimizde product yani tıklanmış bi ürün yoksa hiç uğraşma boş dön dedik
  if !product return null 

  // ürünün stok sayısı tam sıfıra eşitse bu if kapısını aç dedk
  if product.stok === 0 {
    // geriye tehlike seviyesini ve tükenme metnini içeren bi obje  yolladık
    return { level: danger, text: Tükendi: Bu ürün geçici olarak temin edilemiyor. }
  } // sıfır stok kontrolü bitti

  // stoku sıfır değilse ama 5ten küçükse bu if bloğunu devreye aldık
  if product.stok < 5 {
    // geriye uyarı seviyesini ve kalan adedi gösteren dinamik obje  fırlattık
    return { level: warning, text: Düşük Stok: Bu üründen son product.stok adet kaldı! }
  } // düşük stok kontrolü bitti

  // eğer stok 5 veya daha fazlaysa yani durum normalse hiçbir uyarı fırlatmayıp boş döndük
  return null 

}; 

  const warning = getInventoryWarning();
  // stok uyarısını veren fonksiyonu çalıştırıp çıkan sonucu warning kutusuna aldık

  if (!product) return null;// eğer product verisi henüz boşsa arayüzü hiç çizme null dön dedik

  return (
    <div onClick={onClose} className="modal-maske">
      <div onClick={(e) => e.stopPropagation()} className="modal-kutu">
        
        <div className="modal-resim-bolumu">
          <span className="modal-kategori-badge">{product.kategori}</span>
          <span className="modal-resim-emoji">{product.gorsel}</span>
        </div>

        <div className="modal-icerik-bolumu">
          
          <div className="modal-baslik-alani">
            <div>
              <span className="marka-etiketi">{product.marka}</span>
              <h2 className="app-card-title">{product.ad}</h2>
            </div>
            <button onClick={onClose} className="modal-kapat-butonu">✕</button>
          </div>

          <div className="modal-urun-bilgi">
            {warning && (
              <div className="alert-banner">
                <span className="modal-detay-deger">{warning.text}</span>
              </div>
            )}

            <div className="modal-detay-listesi">
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Birim Fiyat</span>
                <span className="yeni-fiyat-etiketi">{product.fiyat.toFixed(2)} TL</span>
              </div>
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Kalan Stok</span>
                <span className="modal-detay-deger">{product.stok} adet</span>
              </div>
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Müşteri Beğenisi</span>
                <span className="modal-detay-deger">★ {product.degerlendirme.toFixed(1)} ({product.yorumAdedi} Yorum)</span>
              </div>
              <div className="modal-detay-satiri">
                <span className="modal-detay-etiket">Açıklama</span>
                <span className="modal-detay-deger">{product.tanim}</span>
              </div>
            </div>

            <span className="modal-yorumlar-baslik">Müşteri Değerlendirmeleri</span>
            <div className="modal-yorumlar-listesi">
              {product.incelemeler && product.incelemeler.map((review, index) => {
                const timeMatch = review.match(/^\[(.*?)\]/);
                const time = timeMatch ? timeMatch[0] : "";
                const message = timeMatch ? review.slice(time.length).trim() : review;

                return (
                  <div key={index} className="modal-yorum-kart">
                    <div className="modal-yorum-yazar-satir">
                      <span className="modal-yorum-yazar">{time ? "Kullanıcı Değerlendirmesi" : "Anonim Müşteri"}</span>
                      <span>{time}</span>
                    </div>
                    <p className="modal-yorum-metin">{message}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-aksiyon-alani">
            <button
              onClick={() => {
                onSepeteEkle(product);
                onClose();
              }}
              disabled={product.stok === 0}
              className="urun-sepet-ekle-butonu"
            >
              {product.stok === 0 ? "Tükendi" : "Sepete Ekle"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
