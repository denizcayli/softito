import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="main-layout">
        <Sidebar />

        <div className="content-area">
          <div className="content-header">
            <h1 className="page-title">Tüm Ürünler</h1>
            <span className="text-sm">Toplam 4 Ürün</span>
          </div>

          <ProductGrid />
          
        </div>
      </main>
    </>
  );
}

export default App;
