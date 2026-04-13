function SectionHeader({ title, subtitle }) {
  return (
    <div className="zv-section-header">
      <h2 className="zv-section-title">{title}</h2>
      {subtitle && <p className="zv-section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
