import ProductCard from "./ProductCard"

export default function ProductGrid(){
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
        </div>
        </>
    )
}