import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import './LanguageSelector.css';

interface Language {
    code: string;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w20/es.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'zh', name: '中文', flag: 'https://flagcdn.com/w20/cn.png' },
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
                <img 
                    src={currentLanguage.flag} 
                    alt={`${currentLanguage.name} flag`}
                    className="language-flag"
                />
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
                            <img 
                                src={lang.flag} 
                                alt={`${lang.name} flag`}
                                className="language-flag"
                            />
                            <span className="language-name">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector; 