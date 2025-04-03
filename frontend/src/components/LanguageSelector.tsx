import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import './LanguageSelector.css';

interface Language {
    code: string;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useContext(LanguageContext);

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    const handleLanguageSelect = (code: string) => {
        setLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="language-selector">
            <button 
                className="language-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="language-flag">{currentLanguage.flag}</span>
                <span className="language-name">{currentLanguage.name}</span>
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`language-option ${lang.code === language ? 'active' : ''}`}
                            onClick={() => handleLanguageSelect(lang.code)}
                        >
                            <span className="language-flag">{lang.flag}</span>
                            <span className="language-name">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector; 