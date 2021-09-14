import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Header.css"
import logo from "../../assets/logo.svg";
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BookShow from "../../screens/bookshow/BookShow"


function Header({showLogin, showBookShow}){
  const [login, setLogin] = useState(false);
  const history = useHistory();
  // console.log(history)
  const setText=()=>login? "LOG OUT" : "LOGIN";
  const handleLogin=()=>setLogin(!login);
  const handleBookShow=()=>{
    login ? history.push("/bookshow") : null;
  }
  return(
    <div className="header">
      <img id="logo-img" src={logo} alt= "logo" />
      <div className="btn-group">
        {showBookShow && (
          <Button
            id="bookshow-btn"
            className="btn"
            color="primary"
            variant="contained"
            onClick={handleBookShow}
          ><Typography>BOOK SHOW</Typography>
          </Button>
        )}
        {showLogin && (
          <Button
            className="btn login-btn"
            color="default"
            variant="contained"
            onClick={handleLogin}
          ><Typography>{setText()}</Typography>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header;