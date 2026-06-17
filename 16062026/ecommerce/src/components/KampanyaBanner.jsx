import { useState, useEffect } from "react";

export default function KampanyaBanner() {
  const [secondsLeft, setSecondsLeft] = useState(3600 * 3 + 1200);
  // Sayacın başlangıç saniyesini tuttuk ve değiştiren anahtarı usesatet ile açtık bu mat. hesaplaması 4 saate denk geliyor

  useEffect(() => {// Sayfa ilk açıldığında kronometreyi 1 kere kurmak için
    const timer = setInterval(() => {// Tarayıcıya her 1 saniyede bir çalışacak zamanlayıcı
      setSecondsLeft((prev) => {// Eğer saniye 1 veya daha altına indiyse yani süre bittiyse buraya gir dedik
        if (prev <= 1) {
          return 3600 * 3 + 1200;// Süre bitince sayacı tekrar 4 saate sardık
        }
        return prev - 1;
      });
    }, 1000);// 1000 milisaniye yani 1 saniye bekleme süresi koyduk

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatCountdown = (totalSecs) => {// totalSecs adında ham saniye sayısını alan bi fonksiyon başlattık
    const hours = Math.floor(totalSecs / 3600);// toplam saniyeyi 3600e bölüp içindeki saat sayısını bulduk
    const minutes = Math.floor((totalSecs % 3600) / 60);// kalan saniyelerden kaç dakika çıktığını hesapladık
    const seconds = totalSecs % 60;// Saat ve dakikadan geriye kalan saniye
   
   // sayıları metne çevirip tek haneliyse başına 0 koyduk ve araya iki nokta kloyduk
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="slider-banner">
      <div className="slider-bilgi">
        <span className="slider-etiket">GÜNÜN FIRSATI</span>
        <h2 className="slider-baslik">Büyük Yaz İndirimleri Başladı!</h2>
        <p className="slider-detay">
          Tüm Elektronik, Giyim ve Kitaplarda sepette anında %40'a varan indirimleri kaçırmayın.
        </p>
      </div>

      <div className="slider-sayac">
        <span>⏰ Kalan Süre:</span>
        <span>{formatCountdown(secondsLeft)}</span>
      </div>
    </div>
  );
}
