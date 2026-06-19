import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import { useState } from "react";
import AddProductForm from "./components/AddProductForm";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./productsMock";
import AboutUs from "./components/AboutUs";
import HelpCenter from "./components/HelpCenter";
import OrderTracking from "./components/OrderTracking";
import ProductReturns from "./components/ProductReturns";
import CategoriesList from "./components/CategoriesList";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import LoginModal from "./components/LoginModal";

function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // YENİ EKLEDİM
  const [isCartOpen, setIsCartOpen] = useState(false);
  // YENİ EKLEDİM
  const [selectedProduct, setSelectedProduct] = useState(null);
  // YENİ EKLEDİM
  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = (data) => {
    const newProduct = {
      id: Date.now(),
      title: data.title,
      price: Number(data.price),
      category: data.category,
      rating: 5.0,
      ratingCount: 1,
      image: data.image,
      description: data.description,
    };
    setProducts([newProduct, ...products]);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Tümü" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    // YENİ EKLEDİM
    setView("home");
  };

  // YENİ EKLEDİM
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setView("home");
  };

  // YENİ EKLEDİM
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // YENİ EKLEDİM
  const handleUpdateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // YENİ EKLEDİM
  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // YENİ EKLEDİM
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Sepetiniz boş! Önce ürün eklemelisiniz.");
      return;
    }
    alert("Alışverişiniz başarıyla tamamlandı! Teşekkür ederiz.");
    setCartItems([]);
  };

  // YENİ EKLEDİM
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // YENİ EKLEDİM
  const renderContent = () => {
    switch (view) {
      case "home":
        return (
          <main className="main-layout">
            <Sidebar
              categories={MOCK_CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div className="content-area">
              <div className="content-header">
                <h1 className="page-title">
                  {selectedCategory} {searchQuery && `-> "${searchQuery}"`}{" "}
                  Ürünler
                </h1>
                <span className="text-sm">
                  Toplam {filteredProducts.length} Ürün
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-red-900">
                    Aradığınız kriterlere uygun ürün bulunamadı.
                  </p>
                </div>
              ) : (
                <ProductGrid 
                  products={filteredProducts} 
                  onProductClick={(product) => {
                    setSelectedProduct(product);
                    setView("detail");
                  }}
                  onAddToCart={handleAddToCart}
                />
              )}
            </div>
          </main>
        );
      case "categories":
        return (
          <CategoriesList 
            categories={MOCK_CATEGORIES} 
            products={products} 
            onCategoryClick={handleCategorySelect}
          />
        );
      case "addProduct":
        return (
          <AddProductForm
            categories={MOCK_CATEGORIES}
            setView={setView}
            onAddProduct={handleAddProduct}
          />
        );
      case "about":
        return <AboutUs />;
      case "help":
        return <HelpCenter />;
      case "tracking":
        return <OrderTracking />;
      case "returns":
        return <ProductReturns />;
      case "detail":
        return (
          <ProductDetail 
            product={selectedProduct} 
            setView={setView} 
            onAddToCart={handleAddToCart}
          />
        );
      default:
        return <div className="text-center py-10">Sayfa Bulunamadı.</div>;
    }
  };

  return (
    <>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
        // YENİ EKLEDİM
        onLoginClick={() => setIsLoginOpen(true)}
        // YENİ EKLEDİM
        onCartClick={() => setIsCartOpen(true)}
        // YENİ EKLEDİM
        cartCount={totalCartCount}
      />
      <Navbar
        categories={MOCK_CATEGORIES}
        selectedCategory={selectedCategory}
        // YENİ EKLEDİM
        setSelectedCategory={handleCategorySelect}
        setView={setView}
      />

      {/* YENİ EKLEDİM */}
      {renderContent()}

      {/* YENİ EKLEDİM */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Footer setView={setView} setSelectedCategory={setSelectedCategory} />
    </>
  );
}

export default App;