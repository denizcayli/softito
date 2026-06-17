import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <>
      <div className="product-grid">
        <ProductCard
          title="Apple İphone 15 Pro Max 256Gb Titanyum"
          price="99.000"
          category="Telefon"
          rating="4.8"
          count="124"
          image="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        />
        <ProductCard
          title="Sony Gürültü Engelleyici Kulaklık WHJ-1000X"
          price="12.000"
          category="Aksesuar"
          rating="4.9"
          count="231"
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        />
        <ProductCard
          title="Nike Air Ayakkabı "
          price="7.999"
          category="Moda"
          rating="2.1"
          count="67"
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        />
        <ProductCard
          title="Stanley 2 Litre Termos "
          price="3.999"
          category="Ev & Yaşam"
          rating="5"
          count="2222"
          image="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        />
      </div>
    </>
  );
}
