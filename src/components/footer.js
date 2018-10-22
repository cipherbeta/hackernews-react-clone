import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
    <footer className="footer">
        <p>Developed by Isaac Doud using the HackerNews API.</p>
        <div>
            <a href="https://gitlab.com/WaifuCannon/hackernews-clone" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'gitlab']}/>
            </a>
        </div>
    </footer>
)

export default Footer;