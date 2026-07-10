function StatsCard({ label, value }) {
  return (
    <article className="card stats-card">
      <p className="eyebrow">{label}</p>
      <h3>{value}</h3>
    </article>
  );
}

export default StatsCard;
