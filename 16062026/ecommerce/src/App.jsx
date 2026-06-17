import { useState, useMemo, useEffect, useCallback } from "react";
import Baslik from "./components/Baslik";
import KampanyaBanner from "./components/KampanyaBanner";
import UrunListesi from "./components/UrunListesi";
import UrunDetayi from "./components/UrunDetayi";
import SepetGezgini from "./components/SepetGezgini";


// products: Veritabanından çekilen orijinal ürün listesini sakladığımız ana state.
// sepet: Kullanıcının sepete eklediği ürünleri (id, adet, fiyat) tutan liste.
// sepetAcik: Yan panelin görünürlük durumunu (açık/kapalı) yöneten boolean şalter.
// loading: API'den veriler yüklenirken ekranda yükleniyor animasyonunu yöneten kontrol değişkeni.
// error: Sunucu hatası oluşursa arıza mesajını yakalayıp sakladığımız kutu.

// fetch ile "/urunler.json" dosyasından asenkron olarak ürün verilerini çekiyoruz.
// if (!res.ok) -> Sunucu bağlantısı başarısızsa catch bloğuna hata fırlatıyoruz.

// handleSepeteEkle: Ürün sepette zaten varsa map ile adedini artırır, yoksa diziye yeni eleman ekler.
// yeniAdet > anaUrun.stok -> Sepetteki adedi artırırken mağazadaki orijinal stok sınırını aşmasını engelliyoruz.


export default function App() {
  // veritabanından gelecek olan ana ürün listesini tuttuğumuz boş dizi hafızası açtık
  const [products, setProducts] = useState([]);
 
  // kullanıcının sepete attığı ürünleri isim adet ve fiyat olarak tutan sepet hafızası başlattık
  const [sepet, setSepet] = useState([]);
 
  // yandan açılan sepet çekmecesinin ekranda açık mı kapalı mı olduğunu yöneten buton koyduk
  const [sepetAcik, setSepetAcik] = useState(false);
 
  // internetten ürünler yüklenirken ekranda yükleniyor yazısı göstermeye yarayan sayaç bekletici açtık
  const [loading, setLoading] = useState(true);
 
  // sunucudan veri çekerken bağlantı koparsa hata mesajını içine kaydedeceğimiz boş kutu koyduk
  const [error, setError] = useState(null);
 
  // vitrinde detayına bakılmak için tıklanan ürünün benzersiz kimlik numarasını tutan hafıza açtık
  const [selectedProductId, setSelectedProductId] = useState(null);
 
  // kullanıcının sol taraftan seçtiği aktif dükkan reyonunu all veya giyim olarak tutan state açtık
  const [currentCategory, setCurrentCategory] = useState("all");
 
  // üstteki arama kutusuna yazılan harfleri anlık hafızada tutan metin kutusu state başlattık
  const [searchTerm, setSearchTerm] = useState("");
 

  // site tarayıcıda ilk açıldığı saniye sunucuya gidip ürün listesini getiren tetikleyiciyi kurduk
  useEffect(() => {
    // yerel klasördeki urunler json dosyasına gizli bi internet bağlantısı isteği attık
    fetch("/urunler.json")
      // sunucudan ilk yanıt geldiğinde bu kapıyı açtık gelen sonucu res değişkenine aldık
      .then((res) => {
        // eğer sunucu bağlantısı başarısızsa veya dosya bulunamadıysa if bloğuna gir dedik
        if (!res.ok) {
          // fırlatılan hata komutuyla sunucunun verdiği arıza kodunu metne döküp catch alanına pasladık
          throw new Error(`Katalog yüklenemedi. Sunucu hata kodu: ${res.status}`);
        }
        // her şey yolundaysa gelen ham veriyi reactin okuyacağı tertemiz json paketine çevirip yolladık
        return res.json();
      })
      // json paketine dönen asıl ürün listesini data adıyla teslim aldık
      .then((data) => {
        // veritabanından gelen bu asıl ürünleri products isimli ana hafıza kutusuna kaydettik
        setProducts(data);
        // ürünler başarıyla geldiği için ekrandaki yükleniyor iskelet modunu kapatıp false yaptık
        setLoading(false);
      })
      // internet kopması veya sunucu çökmesi gibi tüm arıza durumlarında bu acil durum kapısını açtık
      .catch((err) => {
        // meydana gelen arıza mesajını yukarıda açtığımız error isimli hata kutusunun içine çaktık
        setError(err.message);
        // sistem kilitlenip kalmasın diye yükleniyor animasyonunu burada da kapatıp false yaptık
        setLoading(false);
      });
  }, []);
 

  // kategori değiştikçe veya sepete ürün atıldıkça canlı stokları hesaplayan useMemo motorunu başlattık
  const displayProducts = useMemo(() => {
    // seçili reyon all ise tüm listeyi ver değilse filter ile sadece o kategoriye ait ürünleri süz dedik
    const filtered = currentCategory === "all"
      ? products
      : products.filter((item) => item.kategori === currentCategory);
 

    // süzülen bu ürünleri map ile tek tek gezip sepetteki adede göre stok düşürme başlattık
    return filtered.map((item) => {
      // o an incelediğimiz ürünün aynısından kullanıcının sepetinde var mı diye arama yaptık
      const sepetUrun = sepet.find((c) => c.id === item.id);
      // ürün sepette bulunduysa sepetteki adet sayısını aldık bulamadıysak adet değerini 0 yaptık
      const sepetAdet = sepetUrun ? sepetUrun.adet : 0;
      // ürünün tüm orijinal bilgilerini koruyup sadece stok değerini güncelleyeceğimiz objeyi fırlattık
      return {
        // üç nokta ile ürünün eski ad fiyat görsel marka gibi tüm verilerini aynen koruduk
        ...item,
        // dükkan stokundan sepetteki adedi çıkardık eksiye düşmesin diye Math.max ile sıfıra kilitledik
        stok: Math.max(0, item.stok - sepetAdet)
      };
    });
  }, [products, currentCategory, sepet]);
 

  // tıklanan ürünün kimlik numarasına bakıp asıl detay objesini bulup getiren useMemo alanını açtık
  const selectedProduct = useMemo(() => {
    // displayProducts listesinde turlayıp idsi seçilen idye eşit olan ilk ürünü bulup geri döndürdük
    return displayProducts.find((p) => p.id === selectedProductId) || null;
  }, [displayProducts, selectedProductId]);
 

  // vitrindeki veya detaydaki sepete ekle butonlarına basılınca çalışan ana fonksiyonu kilitledik
  const handleSepeteEkle = useCallback((urun) => {
    // eğer eklenmek istenen ürünın stoku kalmadıysa sıfır veya altındaysa işlemi anında iptal et dedik
    if (urun.stok <= 0) return;
 

    // sepet listesini güncelleyecek olan setSepet anahtarını devreye aldık
    setSepet((prevSepet) => {
      // eklenmek istenen ürünün aynısından sepette zaten var mı diye kimlik kontrolü yaptık
      const varOlan = prevSepet.find((item) => item.id === urun.id);
      // eğer ürün sepette zaten mevcutsa bu if kapısını aç emri verdik
      if (varOlan) {
        // map yardımıyla ile birliekte dönüp idsi uyuşan ürünın adet değerini 1 artırdık diğerlerini elletmedik
        return prevSepet.map((item) =>
          item.id === urun.id ? { ...item, adet: item.adet + 1 } : item
        );
      }
      // ürün sepette ilk defa giriyorsa eski sepeti koruyup sonuna adet değeri 1 olan yeni objeyi ekledik
      return [...prevSepet, { id: urun.id, ad: urun.ad, fiyat: urun.fiyat, adet: 1 }];
    });
  }, []);
 

  // sepet çekmecesindeki artı ve eksi butonlarına basıldığında adedi düzenleyen fonksiyonu kurduk
  const handleAdetGuncelle = useCallback((productId, yeniAdet) => {
    // dükkandaki ana ürün listesine gidip adedi değiştirilmek istenen ürünın orijinal halini bulduk
    const anaUrun = products.find((p) => p.id === productId);
    // eğer dükkanda öyle bi ürün bulamazsak güvenlik amacıyla işlemi yarıda kesip dön dedik
    if (!anaUrun) return;
 

    // eğer kullanıcı eksiye basa basa adedi sıfır veya daha altına indirdiyse bu ife gir dedik
    if (yeniAdet <= 0) {
      // filter fonksiyonu yardımıyla idsi eşleşen bu ürünü sepet dizisinden tamamen cımbızla fırlatıp sildik
      setSepet((prev) => prev.filter((item) => item.id !== productId));
      // iş bittiği için alttaki kodlara geçmeden fonksiyonu burada sonlandırdık
      return;
    }
 

    // eğer kullanıcının artırmak istediği yeni adet dükkandaki toplam orijinal stoku aşarsa buraya aldık
    if (yeniAdet > anaUrun.stok) {
      // ekrana uyarı penceresi çıkartıp stokta bu kadar ürün yok mesajı verdik
      alert(`Üzgünüz, bu üründen en fazla ${anaUrun.stok} adet ekleyebilirsiniz.`);
      // dükkan sınırları aşıldığı için adet yükseltme işlemini yapmadan kapıdan geri çevirdik
      return;
    }
 

    // hem sıfırdan büyükse hem stoku aşmıyorsa yasal adedi sepete işlemek için map döngüsünü açtık
    setSepet((prev) =>
      // sepeti satır satır gezip idsi uyuşan ürünün adet bilgisini kullanıcının istediği sayıya eşitledik
      prev.map((item) =>
        item.id === productId ? { ...item, adet: yeniAdet } : item
      )
    );
  }, [products]);
 

  // sepet çekmecesindeki kırmızı sil butonuna basınca ürünü yok eden fonksiyonu yazdık
  const handleUrunCikar = useCallback((productId) => {
    // filter kullanarak idsi bizim gelen idye eşit olmayan tüm diğer ürünleri koru eşit olanı ise uçur dedik
    setSepet((prev) => prev.filter((item) => item.id !== productId));
  }, []);
 

  // sol menüden yeni bi reyon kategorisi seçildiğinde tetiklenen küçük fonksiyonu kilitledik
  const handleCategoryChange = useCallback((newCat) => {
    // seçilen bu yeni reyon adını yukarıdaki currentCategory isimli state kutusunun içine yazdık
    setCurrentCategory(newCat);
  }, []);
 

  return (
    <div className="app-container">
      <Baslik
        env={currentCategory}
        sepetAdedi={sepet.reduce((sum, item) => sum + item.adet, 0)}
        onSepetAc={() => setSepetAcik(true)}
        searchVal={searchTerm}
        onSearchChange={setSearchTerm}
      />
      {/* Üstteki başlık bileşeninin bittiği bu alt satırda arama ve sepet sayacı üst alanını sonlandırdık */}

      <KampanyaBanner />
      {/* Üstteki indirim afişi bileşeninin bittiği bu alt satırda geri sayım sayacı alanını sonlandırdık */}

      <UrunListesi
        products={displayProducts}
        loading={loading}
        error={error}
        activeCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        onSelectProduct={(item) => setSelectedProductId(item.id)}
        onSepeteEkle={handleSepeteEkle}
        searchTerm={searchTerm}
      />
      {/* Üstteki mağaza vitrini bileşeninin bittiği bu alt satırda reyon süzme ve ürün kartları alanını sonlandırdık */}

      <SepetGezgini
        sepet={sepet}
        isOpen={sepetAcik}
        onClose={() => setSepetAcik(false)}
        onAdetGuncelle={handleAdetGuncelle}
        onUrunCikar={handleUrunCikar}
      />
      {/* Üstteki sepet çekmecesi bileşeninin bittiği bu alt satırda kargo barı ve fatura kesme alanını sonlandırdık */}

      {selectedProductId && (
        <UrunDetayi
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onSepeteEkle={handleSepeteEkle}
        />
      )}
      {/* Üstteki süslü parantezli alanın bittiği bu alt satırda ürün detay pop-up ekran şartını sonlandırdık */}
    </div>
  );
}