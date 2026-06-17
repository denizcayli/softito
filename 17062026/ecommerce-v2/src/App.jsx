import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import AddProductForm from "./components/AddProductForm";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./productsMock";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [view, setView] = useState("home");
  return (
    <>
      <Header />
      <Navbar
        categories={MOCK_CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setView={setView}/>
   
      <main className="main-layout">
        <Sidebar categories={MOCK_CATEGORIES} />

        <div className="content-area">
          <div className="content-header">
            <h1 className="page-title">Tüm Ürünler</h1>
            <span className="text-sm">Toplam 4 Ürün</span>
          </div>

          <ProductGrid />
        </div>
      </main>
      <AddProductForm />
      <Footer />
    </>
  );
}

export default App;
