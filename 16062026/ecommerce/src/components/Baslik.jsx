import { useState, useEffect } from "react"; // reactin araçlarını ekledik. usestate ile ekrandaki anlık değişimleri tutacağız hafızada..

export default function Baslik({ env, sepetAdedi, onSepetAc, searchVal, onSearchChange }) {
//searchVal: Arama kutusunun o anki metin değeri.
//env: Aktif olan kategoriyi ya da ortamı söylüyor

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });//TARAYICIYI AÇTIĞIMIZDA o anki genişlik ve yüksekliği hafızaya aldık 
  

  useEffect(() => {// Sayfa ilk açıldığında tarayıcıyı sadece 1 kere dinlemek için useEffect'i başlattık
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });// Tarayıcı penceresinin anlık boyutunu hafızada statede tutuyoruz. Mesela incele dediğimizde sayfanın boyutu da metin oalrak ilerki kodlarda değişiyor
 // window.innerHeight tarayıcı penceresinin anlık yüksekliğini verir.
    };

    window.addEventListener("resize", handleResize);// Tarayıcıya Ekran boyutu değişirse git handleResize fonksiyonunu çalıştır dedik
    return () => {
      window.removeEventListener("resize", handleResize);// Sayfa açılınca ekran boyutu değişimlerini dinlemeye alıyoruz
    };
  }, []);

  const getEnvName = (cat) => {  //cat kategori demek 
    if (cat === "all") //tüm ürünleri ifade ettik return "TÜM KATEGORİLER"; // ekrana all yerine büyük harfle TÜM KATEGORİLER metni gönderdik
    return cat.toUpperCase(); //otomatik olarak kategori isimlerini hepsini büyük harf yapıyor
  };

  return (
    <header className="eticaret-header">
      <div className="header-ust-alan">
        <div className="logo-alani">
          <div className="site-logo-link">HEPSİAL</div>
          <span className="site-logo-badge">STORE</span>
        </div>

        <div className="arama-alani">
          <input // kullanıcının yazı yazacağı arama kutusunu başlattık
            type="text"
            placeholder="Ürün, kategori veya marka ara..."
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            // harf yazıldığında e yani event üzerinden yeni metni yukarı yolladık
            className="arama-input"
          />
          <button className="arama-butonu">Ara</button>
        </div>

        <div className="kullanici-kontrolleri">
          <div className="menu-linki">Giriş Yap</div>
          <div className="menu-linki">Siparişlerim</div>
          
          <button onClick={onSepetAc} className="sepet-tetikleyici">
            <span>🛒 Sepetim</span>
            {sepetAdedi > 0 && (
              
              <span className="sepet-sayac-rozet">{sepetAdedi}</span>
            )}
          </button>
        </div>
      </div>

      <div className="kategori-seridi">
        <span className="badge badge-gray">{getEnvName(env)}</span>
        <span className="detail-meta-label">| Çözünürlük: {windowSize.width}px</span>
      </div>
    </header>
  );
}
