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

  // Formdan gelen verilerle yeni ürün oluşturan fonksiyon
  const handleAddProduct = (data) => {
    const newProduct = {
      id: Date.now(), // Benzersiz id üretimi
      title: data.title,
      price: Number(data.price), // String gelen fiyatı sayıya dönüştürme
      category: data.category,
      rating: 5.0, // Yeni ürün olduğu için varsayılan puan
      ratingCount: 1, // Varsayılan değerlendirme sayısı
      image: data.image,
      description: data.description,
    };
    // Yeni ürünü listenin başına ekleyip state'i güncelleme
    setProducts([newProduct, ...products]);
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
      {/* Üst Bilgi ve Arama Alanı */}
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
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
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </main>
      ) : (
        /* Görünüm 'home' değilse Ürün Ekleme Formunu Göster */
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