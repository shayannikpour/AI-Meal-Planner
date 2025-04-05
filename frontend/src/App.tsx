import React, { createContext, useState, useEffect, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import MealSelection from './components/MealSelection';
import IngredientSelector from './components/IngredientSelector';
import Navigation from './components/Navigation';
import translations from './translations';
import './App.css';
import Favorites from './components/Favorites';
import ThemeToggle from './components/ThemeToggle';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useContext(LanguageContext);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      position: 'relative'
    }}>
      {/* Left section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: 'var(--color-text)',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Back to previous page"
        >
          ←
        </button>
        <ThemeToggle />
      </div>

      {/* Center section */}
      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '40px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#4CAF50' }}>
          AI Meal Planner
        </Link>
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100px', justifyContent: 'flex-end' }}>
        <Link to="/favorites" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: 'var(--color-button-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              cursor: 'pointer',
              color: 'var(--color-text)',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px var(--color-card-shadow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px var(--color-card-shadow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px var(--color-card-shadow)';
            }}
          >
            {t('favorites')}
          </button>
        </Link>
        <LanguageSelector />
      </div>
    </div>
  );
};

function App() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]];
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <Router>
          <div className="app-container">
            <Header />
            <Routes>
              <Route path="/" element={
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '4rem 2rem',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  width: '100%'
                }}>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-text)',
                    textAlign: 'center',
                    maxWidth: '600px',
                    marginBottom: '3rem'
                  }}>
                    {t('welcome')}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                    maxWidth: '800px'
                  }}>
                    <Link to="/meal-planner" style={{
                      flex: '1',
                      minWidth: '250px',
                      maxWidth: '350px',
                      padding: '2rem',
                      backgroundColor: 'var(--color-button-bg)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: '0 4px 20px var(--color-card-shadow)',
                      transition: 'transform 0.2s ease',
                      border: '1px solid var(--color-border)'
                    }}>
                      <span style={{ fontSize: '2rem' }}>🥗</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {t('startMealPlanning')}
                      </span>
                    </Link>
                    <Link to="/meal-selection" style={{
                      flex: '1',
                      minWidth: '250px',
                      maxWidth: '350px',
                      padding: '2rem',
                      backgroundColor: 'var(--color-button-bg)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: '0 4px 20px var(--color-card-shadow)',
                      transition: 'transform 0.2s ease',
                      border: '1px solid var(--color-border)'
                    }}>
                      <span style={{ fontSize: '2rem' }}>🍽️</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {t('chooseAMeal')}
                      </span>
                    </Link>
                  </div>
                </div>
              } />
              <Route path="/meal-planner" element={<IngredientSelector />} />
              <Route path="/meal-selection" element={<MealSelection />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <footer style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--color-text-secondary)',
              borderTop: '1px solid var(--color-border)',
              marginTop: 'auto'
            }}>
              <p>{t('teamMembers')}</p>
            </footer>
          </div>
        </Router>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
