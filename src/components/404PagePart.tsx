import "./404PagePart.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-error-code">
        4
        <span className="notfound-zero">
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20h30l-3 15H23l-3-15z"
              stroke="#4A90E2"
              strokeWidth="2"
              fill="white"
            />
            <circle cx="25" cy="40" r="3" fill="#4A90E2" />
            <circle cx="44" cy="40" r="3" fill="#4A90E2" />
          </svg>
        </span>
        4
      </div>

      <div className="notfound-message">
        <h1>Page Not Found</h1>
        <p>
          We couldn’t find the product or page you were looking for. <br />
          It might have been removed, renamed, or is temporarily unavailable.
        </p>
      </div>

      <div className="notfound-buttons">
        <a href="/" className="home-btn">
          Return to Home
        </a>
        <button
          className="back-btn"
          onClick={() =>
            window.history.length > 1
              ? window.history.back()
              : (window.location.href = "/")
          }
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
