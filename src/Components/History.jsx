function History({ unit, history, onSearch }) {
  
  const displayTemp = (temp) => {
    if (unit === "imperial") {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="history-container">
      {history.length === 0 ? (
        <div className="empty">
          <p>No search history found</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div
              key={index}
              className="history-blue-card"
              onClick={() => onSearch(item.name, true)} 
            >
              <div className="card-left">
                <h3>{item.name}</h3>
                <p style={{ textTransform: 'capitalize' }}>
                  {item.weather[0].description}
                </p>
              </div>
              <div className="card-right">
                <span className="history-temp">
                  {/* BUG FIX: Convert the value if necessary */}
                  {displayTemp(item.main.temp)}
                  {unit === "metric" ? "°C" : "°F"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default History;