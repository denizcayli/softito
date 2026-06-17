export default function AddProductForm() {
  return (
    <>
      <main className="container">
        <div className="form-layout">
          <h2 className="form-title">Yeni Ürün Ekle</h2>
          <form>
            <div className="form-group">
              <label className="form-label">Ürün Adı</label>
              <input className="form-input" type="text" placeholder="Örn:Kablosuz Klavye"/>
            </div>
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select className="form-select">
                <option value="">Seçiniz</option>
                <option value="Telefon">Telefon</option>
                <option value="Bilgisayar">Bilgisayar</option>
                <option value="Aksesuar">Aksesuar</option>
                <option value="Moda">Moda</option>
                <option value="Ev & Yaşam">Ev & Yaşam</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Görsel URL </label>
              <input
                type="text"
                placeholder="https://"
                className="form-input"/>
            </div>
            <div className="form-group">
              <label className="form-label">Fiyat (TL)</label>
              <input type="number" placeholder="Örn: 1450" className="form-input"/>
            </div>
            <div className="form-group">
              <label className="form-label">Açıklama</label>
              <textarea className="form-textarea" placeholder="Ürün Detayları..."/>
            </div>
            <button className="form-submit" type="submit">
              Ürünü Kaydet
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
