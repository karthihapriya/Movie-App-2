import React from 'react';
import moviesData from "../../common/moviesData";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from '@material-ui/core/ImageListItem';
import "./Details.css";


class MoviePoster extends React.Component{
  render(){
    return(
      <ImageList rowHeight={450} cols={1}>
        <ImageListItem key="Demo id">
          <img src={moviesData[this.props.movieId].poster_url} alt={`${moviesData[this.props.movieId].title} poster`} />
        </ImageListItem>
      </ImageList>
    )
  }
}

export default MoviePoster;