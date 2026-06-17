import ProductCard from "./ProductCard"; // Tekil ürün kartı bileşenini içe aktarıyoruz

export default function ProductGrid({ products }) { // Prop olarak filtrelenmiş ürün listesini alıyoruz
  return (
    <>
      <div className="product-grid">
       {products.map((product) => ( // Ürün dizisindeki her bir ürünü tek tek dönüyoruz
        // Her ürün kartına benzersiz id'sini (key) ve ürün detaylarını (product) gönderiyoruz
        <ProductCard key={product.id} product={product} />
       ))}
      </div>
    </>
  );
}