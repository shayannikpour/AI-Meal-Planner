import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import MealSelection from './components/MealSelection';
import IngredientSelector from './components/IngredientSelector';
import translations from './translations';
import './App.css';

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

function App() {
  const [language, setLanguage] = useState('en');
  const [view, setView] = useState<string | null>(null);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <Router>
        <div className="app-container">
          <LanguageSelector />
          <header className={`app-header ${!view ? 'home-header' : ''}`}>
            {view && (
              <button onClick={() => setView(null)} className="back-button">
                {t('back')}
              </button>
            )}
            <h1>AI Meal Planner</h1>
            {view && (
              <button onClick={() => setView(null)} className="back-button">
                {t('favorites')}
              </button>
            )}
          </header>

          {!view && (
            <div className="main-menu">
              <div className="menu-description">
                <p>{t('welcome')}</p>
              </div>
              <div className="menu-options">
                <button
                  onClick={() => setView("mealPlanner")}
                  className="menu-button planner-button"
                >
                  <span className="button-icon">🥗</span>
                  <span className="button-text">{t('startMealPlanning')}</span>
                </button>
                <button
                  onClick={() => setView("mealSelection")}
                  className="menu-button selection-button"
                >
                  <span className="button-icon">🍽️</span>
                  <span className="button-text">{t('chooseAMeal')}</span>
                </button>
              </div>
            </div>
          )}

          {view === "mealPlanner" && (
            <div className="content-container">
              <IngredientSelector />
            </div>
          )}

          {view === "mealSelection" && (
            <div className="content-container">
              <MealSelection />
            </div>
          )}

          <footer className="app-footer">
            <p>{t('teamMembers')}</p>
          </footer>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
