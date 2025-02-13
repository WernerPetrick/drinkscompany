import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './App.css';

const EnterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('pending');
  const [manualToken, setManualToken] = useState('');

  const hasFetched = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manualToken.trim()) {
      navigate(`?token=${manualToken.trim()}`);
    }
  };

  useEffect(() => {
    if (!token || hasFetched.current) return;

    hasFetched.current = true;
    setLoading(true);

    fetch(`http://localhost:3000/api/enter?token=${token}`)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      })
      .then((data) => {
        setStatus('success');
        setMessage(data.message);
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="container">
      <div className="card">
        <img 
          src="/drinks-company-logo.png" 
          alt="DrinksCompany Logo" 
          className="logo"
        />
        <h1>DrinksCompany Competition Entry</h1>
        
        {!token ? (
          <div className="token-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Enter your token"
                required
              />
              <button type="submit">Submit Token</button>
            </form>
          </div>
        ) : loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Checking your token...</p>
          </div>
        ) : (
          <div className={`message ${status}`}>
            <p>{message}</p>
            {status === 'success' && (
              <div className="success-content">
                <h2>What's Next?</h2>
                <p>Keep an eye on your email for further instructions!</p>
                <div className="social-links">
                  <a href="https://twitter.com/drinkscompany" target="_blank" rel="noopener noreferrer">
                    Follow us on Twitter
                  </a>
                  <a href="https://discord.gg/drinkscompany" target="_blank" rel="noopener noreferrer">
                    Join our Discord
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterPage;