import Typography from "@material-ui/core/Typography";
import React from "react";
import YouTube from "react-youtube";
import moviesData from "../../common/moviesData";
import "./Details.css";


class MovieTrailer extends React.Component{
  topMargin = {marginTop: 16};
  dateConverter=dateEntry=>{
    let myDate = new Date(dateEntry);
    return myDate.toDateString();
  }
  ready = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render(){
    return(
      <>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
        >
          {moviesData[this.props.movieId].title.toLocaleUpperCase()}
        </Typography>
        {/* <br /> */}
        <Typography>
          <strong>Genre: </strong>
          {moviesData[this.props.movieId].genres.join(", ")} 
        </Typography>
        {/* <br /> */}
        <Typography>
          <strong>Duration: </strong>
          {moviesData[this.props.movieId].duration + " min"} 
        </Typography>
        {/* <br /> */}
        <Typography>
          <strong>Release Date: </strong>
          {this.dateConverter(moviesData[this.props.movieId].release_date)} 
        </Typography>
        {/* <br /> */}
        <Typography>
          <strong>Rating: </strong>
          {moviesData[this.props.movieId].critics_rating} 
        </Typography>
        {/* <br /> */}
        <Typography style={this.topMargin}>
          <strong>Plot: </strong>
          <a href={moviesData[this.props.movieId].wiki_url}>[Wiki Link]</a>
          {moviesData[this.props.movieId].storyline} 
        </Typography>
        {/* <br /> */}
        <Typography style={this.topMargin}>
          <strong>Trailer: </strong>
        </Typography>
        <YouTube className="trailer"
          videoId={moviesData[this.props.movieId].trailer_url.split("?v=")[1]}
          onReady={this.ready}
          id="sY1S34973zA"
        />
      </>
    )
  }
}
export default MovieTrailer;