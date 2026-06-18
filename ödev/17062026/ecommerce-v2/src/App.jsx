import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import AddProductForm from "./components/AddProductForm";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./productsMock";
import { useState } from "react";

function App() {
  // Eyalet (State) Tanımlamaları
  const [products, setProducts] = useState(MOCK_PRODUCTS); // Tüm ürünlerin listesi
  const [selectedCategory, setSelectedCategory] = useState("Tümü"); // Seçili kategori filtre değeri
  const [view, setView] = useState("home"); // Ekranda hangi sayfanın görüneceği (home / addProduct)
  const [searchQuery, setSearchQuery] = useState(""); // Filtrelemeyi tetikleyen asıl arama kelimesi
  const [searchInput, setSearchInput] = useState(""); // Arama çubuğundaki anlık input değeri
  const [sepet,setSepet] = useState([]);  //⭐️kullanıcın sepete attığı ürünleri 
  //⭐️id title price vb lsite halinde ttutum



  // Formdan gelen verilerle yeni ürün oluşturan fonksiyonu giriyorum
  const handleAddProduct = (data) => {//
    const newProduct = {
      id: Date.now(), // 
      title: data.title,
      price: Number(data.price), // string geen fiaytı sayıya dönğştürdü
      category: data.category,
      rating: 5.0, //puan girdik
      ratingCount: 1, // değerlendirme sayısını 1 girdim
      image: data.image, 
      description: data.description,
    };
    // Yeni ürünü listenin başına ekleyip state'i güncelleme
    setProducts([newProduct, ...products]);
  };

  const handleSepeteEkle = (urun)=> {  // ⭐️Ürün kartındaki + butonuna basılınca çalışan sepete ekleme fonksiyonunu başlattık
    setSepet((prevSepet) => {
      const varOlan = prevSepet.find((item) => item.id === urun.id);

      if (varOlan){
        return prevSepet.map((item) => 
          item.id === urun.id ? {...item, adet: item.adet + 1} : item
        )
      }
      return [...prevSepet, { id: urun.id, title: urun.title, price: urun.price, adet:1}];
    })
  }

  // ⭐️Ürün kartındaki - butonuna basılınca adet düşürme ve silme fonksiyonu
      const handleAdetDusur = (productId) => {
    setSepet((prevSepet) => {
    // Adedi düşürülecek ürün sepette var mı diye kontrol ettik
    const varOlan = prevSepet.find((item) => item.id === productId);
    
    //  Eğer ürün sepette zaten yoksa hiçbir şey yapmadan sepeti aynen bırak dedik
    if (!varOlan) return prevSepet;

    if (varOlan.adet === 1) {
      // Eğer ürünün sepetteki adedi 1 ise, eksiye basınca filter ile o ürünü sepetten tamamen çıkarmış olduk
      return prevSepet.filter((item) => item.id !== productId);
    }
    
    // ⭐️Eğer adet 1'den büyükse, map ile dönüp sadece o ürünün adet değerini 1 azalttık tamamen silmedik örneğin sepette5 ürün varsa 4 e indirdi 
    return prevSepet.map((item) =>
      item.id === productId ? { ...item, adet: item.adet - 1 } : item
    );
  });
};

  // Kategori ve Arama kelimesine göre ürünleri filtreleyen motor
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Tümü" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Arama formu gönderildiğinde (Enter/Buton) tetiklenen fonksiyon
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput); // İnput değerini asıl arama sorgusuna aktarır
  };

  return (
    <>
      {/* ⭐️Üst Bilgi ve Arama Alanı */}
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
        sepet={sepet} //⭐️YENİ EKLEDİMM !! sağdaki sepetim kıısmı için prop olarak gönderiytoruz
        sepeteEkle={handleSepeteEkle}
        adetDusur={handleAdetDusur}
     
     
     />
      
      {/* Kategori Navigasyon Menüsü */}
      <Navbar
        categories={MOCK_CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
      />

      {/* Sayfa Görünüm Kontrolü (Görünüm 'home' ise ana sayfayı göster) */}
      {view === "home" ? (
        <main className="main-layout">
          {/* Yan Menü Kategorileri */}
          <Sidebar
            categories={MOCK_CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="content-area">
            {/* Filtre Başlığı ve Toplam Ürün Sayısı */}
            <div className="content-header">
              <h1 className="page-title">
                {selectedCategory} {searchQuery && `> "${searchQuery}"`} Ürünler
              </h1>
              <span className="text-sm">
                Toplam {filteredProducts.length} Ürün
              </span>
            </div>

            {/* Filtre sonucu boşsa uyarı mesajı, doluysa ürün gridini basar */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-red-500">
                  Aradığınız kriterlere uygun ürün bulunamadı.
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} //⭐️
              //⭐️YENİ EKLEDİMM !! -alt kısmı dive kadar
              products={filteredProducts}
              sepet={sepet}
              sepeteEkle={handleSepeteEkle}
              adetDusur={handleAdetDusur}
              />//⭐️
            )}
          </div>
        </main>
      ) : (
        /* Görünüm home değilse Ürün Ekleme Formunu Göster */
        <AddProductForm 
          categories={MOCK_CATEGORIES}
          setView={setView} 
          onAddProduct={handleAddProduct} // Yeni ürün ekleme fonksiyonunu prop olarak yolladık
        />
      )}
      <Footer />
    </>
  );
}

export default App;