import './ProgressBar.css';

export function ProgressBar({ progress, onChange, readOnly = false }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      {!readOnly && (
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => onChange(Number(e.target.value))}
          className="progress-slider"
        />
      )}
      <span className="progress-text">{progress}%</span>
    </div>
  );
}
