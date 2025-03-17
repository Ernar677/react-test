import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleRegister = () => {
    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsRegistering(false);
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
    } else {
      alert('Қате email немесе пароль');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleDeleteAccount = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleGuestLogin = () => {
    setUser({ name: 'Guest' });
    setIsGuest(true);
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <h1>Қош келдіңіз, {user.name}!</h1>
          <button onClick={handleLogout}>Шығу</button>
          <button onClick={handleDeleteAccount}>Жою</button>
        </div>
      ) : (
        <div>
          {isRegistering ? (
            <div>
              <h2>Тіркелу</h2>
              <input
                type="text"
                placeholder="Аты"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Тіркелу</button>
              <button onClick={() => setIsRegistering(false)}>Кіруге өту</button>
            </div>
          ) : (
            <div>
              <h2>Кіру</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Кіру</button>
              <button onClick={() => setIsRegistering(true)}>Тіркелуге өту</button>
              <button onClick={handleGuestLogin}>Қонақ ретінде кіру</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;