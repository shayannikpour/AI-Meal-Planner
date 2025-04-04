import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../translations';
import './Navigation.css';

const Navigation: React.FC = () => {
    const { t } = useTranslation();

    return (
        <nav className="navigation">
            <Link to="/" className="nav-link">{t('home')}</Link>
            <Link to="/meal-selection" className="nav-link">{t('mealSelection')}</Link>
            <Link to="/team" className="nav-link">{t('team')}</Link>
        </nav>
    );
};

export default Navigation; 