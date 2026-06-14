import React, { useState } from "react";

const Demo11EcomCart = () => {
  const [urunler, setUrunler] = useState([
    { id: 1, ad: "Mekanik Kablosuz Klavye", kategori: "Aksesuar", fiyat: 2750, stokAdeti: 12 },
    { id: 2, ad: "Oyuncu Faresi", kategori: "Aksesuar", fiyat: 900, stokAdeti: 5 },
    { id: 3, ad: "Akıllı Telefon", kategori: "Elektronik Cihaz", fiyat: 50000, stokAdeti: 5 },
    { id: 4, ad: "Tablet", kategori: "Elektronik Cihaz", fiyat: 23500, stokAdeti: 8 },
    { id: 5, ad: "Bluetooth Kulaklık", kategori: "Ses", fiyat: 3500, stokAdeti: 24 },
    { id: 6, ad: "Hoparlör", kategori: "Ses", fiyat: 2000, stokAdeti: 15 },
    { id: 7, ad: "Monitör", kategori: "Ekran", fiyat: 2000, stokAdeti: 15 }
  ]);

  const [sepet, setSepet] = useState([]);
  const [arananMetin, setArananMetin] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Tümü");

  const categories = ["Tümü", "Aksesuar", "Ekran", "Ses", "Elektronik Cihaz"];

  const filtrelenmisUrunler = urunler.filter((urun) => {
    const kategoriUyumlu = seciliKategori === "Tümü" || urun.kategori === seciliKategori;
    const isimUyumlu = urun.ad.toLowerCase().includes(arananMetin.toLowerCase());
    return kategoriUyumlu && isimUyumlu;
  });
  
  const sepeteEkle = (secilenUrun) => {
    if (secilenUrun.stokAdeti === 0) return;

    const sepetteAynisiVarMi = sepet.find((sepetUrunu) => sepetUrunu.id === secilenUrun.id);

    if (sepetteAynisiVarMi) {
      setSepet(sepet.map((sepetUrunu) =>
          sepetUrunu.id === secilenUrun.id 
            ? { id: sepetUrunu.id, ad: sepetUrunu.ad, fiyat: sepetUrunu.fiyat, miktar: sepetUrunu.miktar + 1 } 
            : sepetUrunu
        )
      );
    } else {
      setSepet([...sepet, { id: secilenUrun.id, ad: secilenUrun.ad, fiyat: secilenUrun.fiyat, miktar: 1 }]);
    }

    setUrunler(urunler.map((urun) => 
      urun.id === secilenUrun.id 
        ? { id: urun.id, ad: urun.ad, kategori: urun.kategori, fiyat: urun.fiyat, stokAdeti: urun.stokAdeti - 1 } 
        : urun
    ));
  };

  const adetAzalt = (hedefId) => {
    const bulunanSepetUrunu = sepet.find((sepetUrunu) => sepetUrunu.id === hedefId);

    if (bulunanSepetUrunu.miktar > 1) {
      setSepet(sepet.map((sepetUrunu) =>
          sepetUrunu.id === hedefId 
            ? { id: sepetUrunu.id, ad: sepetUrunu.ad, fiyat: sepetUrunu.fiyat, miktar: sepetUrunu.miktar - 1 } 
            : sepetUrunu
        )
      );
    } else {
      setSepet(sepet.filter((sepetUrunu) => sepetUrunu.id !== hedefId));
    }

    setUrunler(urunler.map((urun) => 
      urun.id === hedefId 
        ? { id: urun.id, ad: urun.ad, kategori: urun.kategori, fiyat: urun.fiyat, stokAdeti: urun.stokAdeti + 1 } 
        : urun
    ));
  };

  const sepettenSil = (hedefId) => {
    const bulunanSepetUrunu = sepet.find((sepetUrunu) => sepetUrunu.id === hedefId);
    setSepet(sepet.filter((sepetUrunu) => sepetUrunu.id !== hedefId));

    setUrunler(urunler.map((urun) => 
      urun.id === hedefId 
        ? { id: urun.id, ad: urun.ad, kategori: urun.kategori, fiyat: urun.fiyat, stokAdeti: urun.stokAdeti + bulunanSepetUrunu.miktar } 
        : urun
    ));
  };

  const toplamTutar = sepet.reduce((toplam, sepetUrunu) => toplam + sepetUrunu.fiyat * sepetUrunu.miktar, 0);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 className="text-xl font-bold mb-1">Demo 11: E-Ticaret Sepet Paneli</h2>
      <p className="text-gray-500 text-sm mb-4">Bu projede JSX, props, eventler, listeler ve kosullu rendering konularini tek bir yapıda birleştirdik.</p>

      <div className="border rounded p-4 mb-4 bg-white shadow-sm">
        <h4 className="font-bold text-sm mb-2">Ürün Ara ve Filtrele</h4>
        <input type="text" placeholder="Ürün adı ara..." className="w-full p-2 border rounded bg-gray-50 mb-3 text-sm focus:outline-none" value={arananMetin} onChange={(e) => setArananMetin(e.target.value)} />
        <div className="flex gap-2"> 
          {categories.map((kategori) => ( 
            <button key={kategori} onClick={() => setSeciliKategori(kategori)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium border border-blue-600 transition-colors">
              {kategori}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        <div className="col-span-2">
          <h4 className="font-bold mb-2 text-sm">Urun Listesi</h4>
          <div className="flex flex-col gap-4"> 
            {filtrelenmisUrunler.map((urun) => (
              <div key={urun.id} className="border rounded p-4 bg-white shadow-sm">
                <h4 className="font-bold text-base text-gray-900">{urun.ad}</h4>
                <p className="text-xs text-gray-400 mt-0.5">Kategori: {urun.kategori}</p>
                <p className="text-blue-600 font-bold text-sm mt-1">Fiyat: {urun.fiyat} TL</p>
                
                <div className="mt-2 mb-3">
                  {urun.stokAdeti > 0 ? (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">Stok: {urun.stokAdeti} adet</span>
                   ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded">Stokta Yok - Tükendi</span>
                  )}
                </div>

                <button onClick={() => sepeteEkle(urun)} disabled={urun.stokAdeti === 0} className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded text-sm font-medium">
                  Sepete Ekle
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded p-4 bg-white shadow-sm h-fit">
          <h4 className="font-bold border-b pb-2 mb-3 text-sm text-gray-900">Sepetiniz</h4>
          
          {sepet.length === 0 ? (
            <p className="text-gray-400 italic text-sm">Sepetiniz henüz boş.</p>
          ) : (
            <div>
              <div className="flex flex-col gap-3">
                {sepet.map((sepetUrunu) => (
                  <div key={sepetUrunu.id} className="border-b pb-3 mb-2">
                    <span className="font-bold text-sm text-gray-800 block">{sepetUrunu.ad}</span>
                    <span className="text-xs text-gray-400 mt-0.5 block">Fiyat: {sepetUrunu.fiyat} TL</span>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                          <button onClick={() => { adetAzalt(sepetUrunu.id) }} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-xs">-</button>
                        <span className="bg-white text-gray-800 font-bold w-7 h-7 flex items-center justify-center text-xs border border-gray-200 rounded">{sepetUrunu.miktar}</span>
                        <button onClick={() => sepeteEkle(urunler.find(u => u.id === sepetUrunu.id))} disabled={urunler.find((u) => u.id === sepetUrunu.id).stokAdeti === 0} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-xs disabled:opacity-40">+</button>
                      </div>
                      <button onClick={() => { sepettenSil(sepetUrunu.id) }} className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded font-bold">Sil</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mt-3 font-bold flex justify-between text-sm items-center">
                <span className="text-gray-700">Toplam Tutar:</span>
                <span className="text-blue-600 text-base">{toplamTutar} TL</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={() => { setSepet([]); setUrunler([
                      { id: 1, ad: "Mekanik Kablosuz Klavye", kategori: "Aksesuar", fiyat: 2750, stokAdeti: 12 },
                      { id: 2, ad: "Oyuncu Faresi", kategori: "Aksesuar", fiyat: 900, stokAdeti: 5 },
                      { id: 3, ad: "Akıllı Telefon", kategori: "Elektronik Cihaz", fiyat: 50000, stokAdeti: 5 },
                      { id: 4, ad: "Tablet", kategori: "Elektronik Cihaz", fiyat: 23500, stokAdeti: 8 },
                      { id: 5, ad: "Bluetooth Kulaklık", kategori: "Ses", fiyat: 3500, stokAdeti: 24 },
                      { id: 6, ad: "Hoparlör", kategori: "Ses", fiyat: 2000, stokAdeti: 15 },
                      { id: 7, ad: "Monitör", kategori: "Ekran", fiyat: 2000, stokAdeti: 15 }
                    ]);
                  }} className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-1.5 rounded text-xs font-bold text-center">Temizle</button>
                <button onClick={() => alert("Satın alma başarılı!")} className="bg-emerald-700 hover:bg-emerald-800 text-white py-1.5 rounded text-xs font-bold text-center">Satın Al</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Demo11EcomCart;