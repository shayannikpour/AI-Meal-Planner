import React, { createContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import MealSelection from './components/MealSelection';
import IngredientSelector from './components/IngredientSelector';
import Navigation from './components/Navigation';
import translations from './translations';
import './App.css';
import Favorites from './components/Favorites';

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
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);

  return (
    <div className="app-top-bar">
      <div style={{ 
        width: '100px', 
        display: 'flex', 
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text)',
            fontSize: '1rem'
          }}
        >
          ← {t('back')}
        </button>
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            marginLeft: 'auto'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <Link 
        to="/" 
        style={{
          flex: 1,
          textDecoration: 'none',
          textAlign: 'center'
        }}
      >
        <div style={{
          color: 'var(--color-primary)',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          AI Meal Planner
        </div>
      </Link>
      <div style={{
        width: '100px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem'
      }}>
        <Link 
          to="/favorites"
          style={{
            textDecoration: 'none',
            color: 'var(--color-text)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            fontSize: '1rem',
            backgroundColor: 'var(--color-button-bg)'
          }}
        >
          {t('favorites')}
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
