import React from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import MovieList from "./MovieList";
import MovieFilter from "./MovieFilter";
import SingleLineImageList from "./SingleLineImageList";

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      artist: [],
      genre: [],
      movieName: "",
      releaseDateStart: "",
      releaseDateEnd: ""
    }
  }
  copyState = (otherState) =>{
    this.setState({
      artist: otherState.artist.slice(),
      genre: otherState.genre.slice(),
      movieName: otherState.movieName,
      releaseDateStart: otherState.releaseDateStart,
      releaseDateEnd: otherState.releaseDateEnd
    })
  }
  render(){
    return(
      <div id="home-main">
        <Header showBtns={false}/>
        <span id="upcoming-mov">Upcoming Movies</span>
        <SingleLineImageList />
        <div className="flex-container">
          <div className="left">
            <MovieList parameters={this.state} />
          </div>
          <div className="right">
            <MovieFilter func={this.copyState} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;