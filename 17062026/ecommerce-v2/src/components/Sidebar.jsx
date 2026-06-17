export default function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <h2 className="sidebar-title">Kategoriler</h2>
        <div className="sidebar-list">
          <div className="sidebar-item sidebar-item-active">
            <span>Tümü</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div className="sidebar-item">
            <span>Telefon</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div className="sidebar-item">
            <span>Bilgisayar</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div className="sidebar-item">
            <span>Aksesuar</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div className="sidebar-item">
            <span>Moda</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div className="sidebar-item">
            <span>Ev & Yaşam</span>
            <span className="text-gray-400">&gt;</span>
          </div>
        </div>
      </aside>
    </>
  );
}
