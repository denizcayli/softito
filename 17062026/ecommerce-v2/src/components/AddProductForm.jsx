import { useForm } from "react-hook-form"; // Form yönetimi ve validasyon kütüphanesi

export default function AddProductForm({ categories, setView, onAddProduct }) {
  // react-hook-form hook'undan ihtiyacımız olan fonksiyonları ve hata nesnesini yıkıyoruz
  const {
    register,     // Inputları forma kaydetmek ve kurallar (validation) eklemek için
    handleSubmit, // Form gönderildiğinde validasyonu kontrol eden sarmalayıcı fonksiyon
    reset,        // Form içindeki tüm inputları temizleyen fonksiyon
    formState: { errors }, // Doğrulama hatalarını anlık tutan nesne
  } = useForm();

  // Validasyondan başarıyla geçen temiz form verilerinin ulaştığı asıl fonksiyon
  const onSubmit = (data) => {
    onAddProduct(data); // Üst bileşene yeni ürün verisini gönder
    reset();            // Form alanlarını temizle
    setView("home");    // Anasayfaya geri yönlendir
  };

  return (
    <>
      <main className="container">
        <div className="form-layout">
          <h2 className="form-title">Yeni Ürün Ekle</h2>
          
          {/* handleSubmit, formu doğrular; sorun yoksa onSubmit fonksiyonumuzu çalıştırır */}
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Ürün Adı Girişi */}
            <div className="form-group">
              <label className="form-label">Ürün Adı</label>
              <input
                className="form-input"
                type="text"
                placeholder="Örn:Kablosuz Klavye"
                // 'title' adıyla inputu kaydet ve doğrulama kuralları ekle
                {...register("title", {
                  required: "Ürün adı zorunludur",
                  minLength: {
                    value: 3,
                    message: "Ürün adı en az 3 karakter olmalıdır",
                  },
                })}
              />
              {/* Eğer title alanında hata varsa mesajı ekrana bas */}
              {errors.title && (
                <span className="form-error">{errors.title.message}</span>
              )}
            </div>

            {/* Kategori Seçimi */}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select
                className="form-select"
                {...register("category", {
                  required: "Kategori seçimi zorunludur",
                })}
              >
                <option value="">Seçiniz</option>
                {/* "Tümü" seçeneği hariç diğer kategorileri option olarak listele */}
                {categories
                  .filter((c) => c !== "Tümü")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <span className="form-error">{errors.category.message}</span>
              )}
            </div>

            {/* Görsel URL Girişi */}
            <div className="form-group">
              <label className="form-label">Görsel URL </label>
              <input
                type="text"
                placeholder="https://"
                className="form-input"
                {...register("image", {
                  required: "Görsel URL zorunludur.",
                })}
              />
              {errors.image && (
                <span className="form-error">{errors.image.message}</span>
              )}
            </div>

            {/* Fiyat Girişi */}
            <div className="form-group">
              <label className="form-label">Fiyat (TL)</label>
              <input
                type="number"
                placeholder="Örn: 1450"
                className="form-input"
                {...register("price", {
                  required: "Fiyat Zorunludur",
                  min: {
                    value: 1,
                    message: "Fiyat 0'dan büyük olmalıdır",
                  },
                })}
              />
              {errors.price && (
                <span className="form-error">{errors.price.message}</span>
              )}
            </div>

            {/* Açıklama Girişi */}
            <div className="form-group">
              <label className="form-label">Açıklama</label>
              <textarea
                className="form-textarea"
                placeholder="Ürün Detayları..."
                {...register("description", {
                  required: "Açıklama Zorunludur",
                  minLength: {
                    value: 10,
                    message: "Açıklama en az 10 karakter olmalıdır",
                  },
                })}
              />
              {errors.description && (
                <span className="form-error">{errors.description.message}</span>
              )}
            </div>

            {/* Formu Gönderme Butonu */}
            <button className="form-submit" type="submit">
              Ürünü Kaydet
            </button>
            
            {/* Geri Dön Butonu: Tıklandığında formu sıfırlar ve anasayfaya yönlendirir */}
            <span className="form-toggle-btn" onClick={() => { reset(); setView('home'); }}>
              Geri Dön
            </span>
          </form>
        </div>
      </main>
    </>
  );
}