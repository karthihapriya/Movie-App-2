import React from "react";
import "./Header.css"
import logo from "../../assets/logo.svg";
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BookShow from "../../screens/bookshow/BookShow"


class Header extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoggedIn: false
    }
  }
  setText = () => this.state.isLoggedIn? "LOG OUT" : "LOGIN";
  setLogin = () => {
    this.setState((prevState)=>({
      isLoggedIn : !prevState.isLoggedIn
    }))
  }
  handleBookShow = () => {
    this.state.isLoggedIn
      ? location.href="/bookshow"
      : {/*open Modal*/};
  }
  render(){
    return(
      <div className="header">
        <img id="logo-img" src={logo} alt= "logo" />
        <div className="btn-group">
          {this.props.showBookShow && (
            <Button
              id="bookshow-btn"
              className="btn"
              color="primary"
              variant="contained"
              onClick={this.handleBookShow}
            ><Typography>BOOK SHOW</Typography>
            </Button>
          )}
          {this.props.showLogin && (
            <Button
              className="btn login-btn"
              color="default"
              variant="contained"
              onClick={this.setLogin}
            ><Typography>{this.setText()}</Typography>
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default Header;