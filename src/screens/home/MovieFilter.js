import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import genres from "../../common/genre";
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import artists from "../../common/artists";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles';



class MovieFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movieName: "",
      genre: [],
      artist: [],
      releaseDateStart: "",
      releaseDateEnd: ""
    }
  }
  handleChange = (event) =>{
    const {name, value, type} = event.target;
    switch(type){
      case "select": this.setState(prevState => ({
        [name] : [...prevState[name], value]
      }));
      break;
      default: this.setState({
        [name] : value
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(this.state) !== JSON.stringify(nextState)){
      return true;
    }
    return false;
  }
  renderInside = (item) =>{
    return this.state[item].length > 1 ? this.state[item].join(", ") : this.state[item];
  }
  render(){
    let theme = createTheme();
    let titleColor = theme.palette.primary.light;
    let componentMargin = theme.spacing(1);
    let componentStyle={
      minWidth: 240,
      maxWidth: 240,
      margin: componentMargin
    }
    return (
      <Card>
        <CardHeader style={{...componentStyle, color: titleColor}}title="FIND MOVIES BY: "/>
        <CardContent>
          <FormControl style={componentStyle}>
          <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
          <Input id="movie-name" name="movieName" value={this.state.movieName} onChange={this.handleChange} aria-describedby="enter-movie-name" />
          </FormControl>
          <br/>
          <FormControl style={componentStyle}>
            <InputLabel htmlFor="genres-list">Genres</InputLabel>
            <Select
              onChange={this.handleChange}
              value={this.state.genre}
              inputProps={{
                name: "genre",
                id: "genres-list"
              }}
              multiple
              renderValue={()=>this.renderInside("genre")}
              autoWidth={true}
              >
                {genres.map((item, index)=>(
                  <MenuItem
                    key={item.id}
                    label={item.name}
                    value={item.name}
                  >{<Checkbox key={index} name={item.name} value={item.name} checked={this.state.genre.includes(item.name)} />}{item.name}
                  </MenuItem>
                ))}
               </Select>
          </FormControl>
          <br />
          <FormControl style={componentStyle}>
            <InputLabel htmlFor="artists-list">Artists</InputLabel>
            <Select
              onChange={this.handleChange}
              value={this.state.artist}
              inputProps={{
                name: "artist",
                id: "artists-list"
              }}
              multiple
              renderValue={()=>this.renderInside("artist")}
              autoWidth={true}
              >
                {artists.map((item, index)=>(
                  <MenuItem
                    key={item.id}
                    label={item.first_name}
                    value={item.first_name + " " + item.last_name}
                  >{<Checkbox key={index} name={item.first_name} value={item.first_name} checked={this.state.artist.includes(item.first_name + " " + item.last_name)} />}{item.first_name + " " + item.last_name}
                  </MenuItem>
                ))}
               </Select>
          </FormControl>
          <br />
          <FormControl style={componentStyle}>
            <TextField
              label ="Release Date Start"
              InputLabelProps={{shrink: true}}
              type="date"
              name="releaseDateStart"
              onChange={this.handleChange}
              value={this.state.releaseDateStart}
              />
          </FormControl>
          <FormControl style={componentStyle}>
            <TextField
              label ="Release Date End"
              InputLabelProps={{shrink: true}}
              type="date"
              name="releaseDateEnd"
              onChange={this.handleChange}
              value={this.state.releaseDateEnd}
              />
          </FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            style={componentStyle}
            onClick={()=>this.props.func(this.state)}
          >APPLY</Button>
        </CardContent>
      </Card>
    )
  }
}

export default MovieFilter;