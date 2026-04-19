function UnitModel({ unit, setUnit, close }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Temperature Unit</h3>

        <label>
          <input
            type="radio"
            checked={unit === "metric"}
            onChange={() => setUnit("metric")}
          />
          Celsius (°C)
        </label>

        <label>
          <input
            type="radio"
            checked={unit === "imperial"}
            onChange={() => setUnit("imperial")}
          />
          Fahrenheit (°F)
        </label>

        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default UnitModel;