import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                <h1>HackerNews</h1>
                </div>
                <div className="header--social">
                created by ike
                </div>
            </header>
        )
    }
}

export default Header;