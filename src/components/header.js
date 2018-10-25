import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';

let OffCanvasMenu = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
})

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
            <>
            <header className="header">
                <div className={"header--toggle" + (this.state.menuToggled ? " active" : "")}
                     onClick={this.handleMenuToggle}>
                    <div className="sandwich"/>
                    <div className="sandwich"/>
                    <div className="sandwich"/>
                </div>
                <div className="header--title">
                <NavLink to="/">
                    <h1>HackerNews<br/><span>A clone by Isaac Doud</span></h1>
                </NavLink>
                </div>
                <div className="header--social">
                    <a href="https://gitlab.com/WaifuCannon/hackernews-clone" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={['fab', 'gitlab']}/>
                    </a>
                </div>
            </header>
            <PoseGroup>
                {this.state.menuToggled && [
                    <OffCanvasMenu className="offcanvas-menu" key="ofcmenu">
                        <NavLink to="/" onClick={this.handleMenuToggle}>
                            Top Stories
                        </NavLink>
                        <hr/>
                        <a href="https://github.com/HackerNews/API" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'github']}/> HackerNews API
                        </a>
                    </OffCanvasMenu>
                ]}
            </PoseGroup>
            
            </>
        )
    }
}

export default Header;