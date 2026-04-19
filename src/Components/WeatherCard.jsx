import { useState } from "react";

function WeatherCard({ data, unit, onSearch }) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if (input.trim()) {
            onSearch(input, true); 
            setInput("");
        }
    };
    const formatTime = (timestamp) => {
        if (!timestamp) return "--:--";
        const date = new Date(timestamp * 1000); 
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="dashboard">
            {/* SEARCH */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search city..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {!data ? (
                <div className="empty">Search a city to view weather</div>
            ) : (
                <>
                    {/* HERO CARD */}
                    <div className="hero-card">
                        <div>
                            <h1>{Math.round(data.main.temp)}{unit === "metric" ? "°C" : "°F"}</h1>
                            <p style={{ textTransform: 'capitalize' }}>{data.weather[0].description}</p>
                            <h3>{data.name}, {data.sys.country}</h3>
                        </div>
                    </div>

                    {/* GRID  */}
                    <div className="grid">
                        <div className="detail-block">
                            <p className="label">FEELS LIKE</p>
                            <h3 className="value">{Math.round(data.main.feels_like)}°</h3>
                            <p className="sub-label">Apparent</p>
                        </div>

                        <div className="detail-block">
                            <p className="label">HUMIDITY</p>
                            <h3 className="value">{data.main.humidity}%</h3>
                            <p className="sub-label">Relative</p>
                        </div>

                        <div className="detail-block">
                            <p className="label">WIND</p>
                            <h3 className="value">{data.wind.speed} {unit === "metric" ? "m/s" : "mph"}</h3>
                            <p className="sub-label">Speed</p>
                        </div>

                        <div className="detail-block">
                            <p className="label">PRESSURE</p>
                            <h3 className="value">{data.main.pressure} hPa</h3>
                            <p className="sub-label">Sea Level</p>
                        </div>

                        <div className="detail-block">
                            <p className="label">VISIBILITY</p>
                            <h3 className="value">{data.visibility / 1000} km</h3>
                            <p className="sub-label">Horizontal</p>
                        </div>

                        <div className="detail-block">
                            <p className="label">CLOUDS</p>
                            <h3 className="value">{data.clouds.all}%</h3>
                            <p className="sub-label">Coverage</p>
                        </div>
                        <div className="detail-block">
                            <p className="label">SUNRISE</p>
                            <h3 className="value">{formatTime(data.sys.sunrise)}</h3>
                            <p className="sub-label">UTC</p>
                        </div>

                        <div className="detail-block">
                            <p className="label">SUNSET</p>
                            <h3 className="value">{formatTime(data.sys.sunset)}</h3>
                            <p className="sub-label">UTC</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherCard;