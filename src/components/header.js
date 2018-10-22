import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {
        menuToggled: false
    }

    handleMenuToggle = () => {
        console.log("toggling menu");
        this.setState({menuToggled: !this.state.menuToggled});
    }

    render(){
        return(
            <header className="header">
                <div className={"header--toggle" + (this.state.menuToggled ? " active" : "")}
                     onClick={this.handleMenuToggle}>
                    <div className="sandwich"/>
                    <div className="sandwich"/>
                    <div className="sandwich"/>
                </div>
                <div className="header--title">
                <Link to="/">
                    <h1>HackerNews<br/><span>A clone by Isaac Doud</span></h1>
                </Link>
                </div>
                <div className="header--social">
                    <a href="https://gitlab.com/WaifuCannon/hackernews-clone" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={['fab', 'gitlab']}/>
                    </a>
                </div>
            </header>
        )
    }
}

export default Header;