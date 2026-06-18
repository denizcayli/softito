// ⭐️sepet, sepeteEkle ve adetDusur proplarını yukarıdan (App.jsx) gelen güçler olarak parametrelere ekledik
export default function ProductGrid({ products, sepet, sepeteEkle, adetDusur }) { 
  return (// sepet, sepeteEkle ve adetDusur proplarını yukarıdan (App.jsx) gelen parametrelere ekledik
    <>
      <div className="product-grid">
        {products.map((product) => {
          // Her ürün ekrana basılırken sepette var mı ve adedi kaç diye kontrol ediyoruz
          const sepettekiUrun = sepet?.find((item) => item.id === product.id);

          return (
            <div key={product.id} className="product-card">
              <div className="product-img-container">
                <img
                  className="product-img"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>

                <div className="product-rating">
                  <span>★</span>
                  <span>
                    {product.rating} ({product.ratingCount})
                  </span>
                </div>

                <div className="product-price-container">
                  <span className="product-price">{product.price} TL</span>

                  {sepettekiUrun ? (
                    // ⭐️Ürün sepette varsa Eksi butonu, adet sayısı ve Artı butonu grubunu gösteriyoruz
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 border border-gray-200">
                      <button
                        onClick={() => adetDusur(product.id)}
                        className="bg-red-500 text-white rounded-lg w-8 h-8 hover:bg-red-600 transition-colors cursor-pointer font-black flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-gray-800 px-1 text-sm min-w-[20px] text-center">
                        {sepettekiUrun.adet}
                      </span>
                      <button
                        onClick={() => sepeteEkle(product)}
                        className="bg-red-500 text-white rounded-lg w-8 h-8 hover:bg-red-600 transition-colors cursor-pointer font-black flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    // Ürün sepette YOKSa Sadece o eski, bildiğimiz normal tekli "+" butonunu gösteriyoruz
                    <button 
                      onClick={() => sepeteEkle(product)}
                      className="product-btn w-10 h-10 font-bold text-lg"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}