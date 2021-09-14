import { AppBar, Tabs, Tab, Box, Typography, FormControl, TextField, Button } from "@material-ui/core";
import React, { useReducer } from "react";
import ReactModal from "react-modal";
import "./Modal.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(()=>({
  root :{
    marginTop : "10%",
    // display : "none",
  }

}))

const modalStyle = {
  overlay:{
    backgroundColor : "grey",
  },
  content :{
    height : "max-content",
    width : "max-content",
    margin : "auto",
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div" >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const initialState ={
  username : "",
  password : "",
  tabValue : 0,
  firstName : "",
  lastName : "",
  email : "",
  regPassword : "",
  number : "",
  validate : false,
}

const CHANGE_LOGIN_USERNAME = "CHANGE_LOGIN_USERNAME";
const CHANGE_LOGIN_PASSWORD = "CHANGE_LOGIN_PASSWORD";
const CHANGE_TAB_VALUE = "CHANGE_TAB_VALUE";
const CHANGE_FIRST_NAME = "CHANGE_FIRST_NAME";
const CHANGE_LAST_NAME = "CHANGE_LAST_NAME";
const CHANGE_EMAIL = "CHANGE_EMAIL"
const CHANGE_REG_PASSWORD = "CHANGE_REG_PASSWORD";
const CHANGE_NUMBER = "CHANGE_NUMBER";
const USERNAME = "USERNAME";
const PASSWORD = "PASSWORD";
const EMAIL = "EMAIL";
const REGPASSWORD = "REGPASSWORD";
const NUMBER = "NUMBER";
const FIRSTNAME = "FIRSTNAME";
const LASTNAME = "LASTNAME";
const VALIDATE = "VALIDATE";

const formReducer=(state, action)=>{
  switch(action.type){
    case CHANGE_LOGIN_USERNAME : return {...state, username : action.username};
    case CHANGE_LOGIN_PASSWORD : return {...state, password : action.password};
    case CHANGE_TAB_VALUE : return {...state, tabValue : action.tabValue};
    case CHANGE_FIRST_NAME : return {...state, firstName : action.firstName};
    case CHANGE_LAST_NAME : return {...state, lastName : action.lastName};
    case CHANGE_EMAIL : return {...state, email : action.email};
    case CHANGE_REG_PASSWORD : return {...state, regPassword : action.regPassword};
    case CHANGE_NUMBER : return {...state, number : action.number};
    case VALIDATE : return {...state, validate : true}
    default : return state;
  }
}

const formActionCreator =(event, component) =>{
  const {name, value} = event.target;
  switch(component){
    case USERNAME : return {type : CHANGE_LOGIN_USERNAME, username : value};
    case PASSWORD : return {type : CHANGE_LOGIN_PASSWORD, password : value};
    case FIRSTNAME : return {type : CHANGE_FIRST_NAME, firstName : value};
    case LASTNAME : return {type : CHANGE_LAST_NAME, lastName : value};
    case EMAIL : return {type : CHANGE_EMAIL, email : value};
    case REGPASSWORD : return {type : CHANGE_REG_PASSWORD, regPassword : value};
    case NUMBER : return {type : CHANGE_NUMBER, number : value};
    case VALIDATE : return {type : VALIDATE};
    default : return {type : "DO NOTHING", ...initialState};
  }
}

const valueActionCreator = (tabValue)=>{
  return {type : CHANGE_TAB_VALUE, tabValue,}
}

function Modal() {
  const handleChange=(event, newValue)=>{
    dispatch(valueActionCreator(newValue))
  }
  const [formContent, dispatch] = useReducer(formReducer, initialState);
  const classes = useStyles();
  const helperTextContent = {
    Username : "",
    Password : "",
    Email : "",
    "First Name" : "",
    "Last Name" : "",
    "Contact Number" : "",
  }
  const handleError = (value, type) =>{
    if(formContent.validate){
      if(!value){
        helperTextContent[type] = `${type} required`;
        return true;
      }else{
        switch(type){
          case "Email" : {
            let regex = /.+@.+\..+/;
            if(regex.test(value)){
              helperTextContent[type] = "Invalid Email Address";
              return false;
            }
          };
        }
      }
      helperTextContent[type] = "";
      return false;
    }
    return false;
  }
  
  const handleBtnClick=(e)=>{
    dispatch(formActionCreator(e, VALIDATE))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    alert("submitted")
  }

  return (
    <ReactModal isOpen={true} style={modalStyle}>
      <AppBar position="static" color="transparent">
        <Tabs value={formContent.tabValue} onChange={handleChange} aria-label="login/register tab" centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </AppBar>
      <TabPanel  value={formContent.tabValue} index={0} >
        <form className="form-elements" onSubmit={handleSubmit}>  
          <FormControl>
              <TextField
                label="Username"
                value={formContent.username}
                onChange={(e)=>dispatch(formActionCreator(e, USERNAME))}
                error={handleError(formContent.username, "Username")}
                helperText={helperTextContent.Username}
                type="text"
              />
          </FormControl>
          <FormControl>
              <TextField
                label="Password"
                value={formContent.password}
                onChange={(e)=>dispatch(formActionCreator(e, PASSWORD))}
                error={handleError(formContent.password, "Password")}
                helperText={helperTextContent.Password}
                type="password"
              />
          </FormControl>
          <Button type="submit" className={classes.root} variant="contained" color="primary">Login</Button>
        </form>
      </TabPanel>
      <TabPanel value={formContent.tabValue} index={1} >
        <form onSubmit={handleSubmit} >
          <FormControl>
            <TextField
              label="First Name"
              type="text"
              value={formContent.firstName}
              onChange={(e)=>dispatch(formActionCreator(e, FIRSTNAME))}
              error={handleError(formContent.firstName, "First Name" )}
              helperText={helperTextContent["First Name"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Last Name"
              type="text"
              value={formContent.lastName}
              onChange={(e)=>dispatch(formActionCreator(e, LASTNAME))}
              error={handleError(formContent.lastName, "Last Name")}
              helperText={helperTextContent["Last Name"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Email"
              type="email"
              value={formContent.email}
              onChange={(e)=>dispatch(formActionCreator(e, EMAIL))}
              error={handleError(formContent.email, "Email")}
              helperText={helperTextContent.Email}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Password"
              type="password"
              value={formContent.regPassword}
              onChange={(e)=>dispatch(formActionCreator(e, REGPASSWORD))}
              error={handleError(formContent.regPassword, "Password")}
              helperText={helperTextContent.Password}
            />
          </FormControl>
          <FormControl>
            <TextField 
              label="Contact No"
              value={formContent.number}
              onChange={(e)=>dispatch(formActionCreator(e, NUMBER))}
              error={handleError(formContent.number, "Contact Number")}
              helperText={helperTextContent["Contact Number"]}
            />
          </FormControl>
          <Button type="submit" className={classes.root} variant="contained" color="primary" onClick={handleBtnClick}>Register</Button>
        </form>
      </TabPanel>
    </ReactModal>
  )
}

export default Modal;