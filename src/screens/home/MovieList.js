import React from "react";
import { ImageList } from '@material-ui/core';
import moviesData from  "../../common/moviesData";
import { ImageListItem } from '@material-ui/core';
import { ImageListItemBar } from '@material-ui/core';
import { Link } from "react-router-dom";

class MovieList extends React.Component{
  dateConverter=dateEntry=>{
    let myDate = new Date(dateEntry);
    return myDate.toDateString();
  }
  getDateTime=date=>{
    let newDate = new Date(date);
    return newDate.getTime();
  }
  render(){
    let movieTitle = this.props.parameters.movieName;
    let genreArr = this.props.parameters.genre;
    let artistArr = this.props.parameters.artist;
    let dateStart = this.props.parameters.releaseDateStart;
    let dateEnd = this.props.parameters.releaseDateEnd;
    let filteredMovies = [...moviesData];
    if(movieTitle.length > 0){
      filteredMovies = filteredMovies.filter((item)=>item.title.toLowerCase().includes(movieTitle.toLowerCase()));
    }
    if(genreArr.length > 0){
      filteredMovies = filteredMovies.filter((item)=>item.genres.some((element)=>genreArr.includes(element)));
    }
    if(artistArr.length > 0){
      filteredMovies = filteredMovies.filter((item)=>item.artists.some(element=>artistArr.includes(element.first_name + " " + element.last_name)))
    }
    if(dateStart.length > 0){
      filteredMovies = filteredMovies.filter((item)=>this.getDateTime(item.release_date) >= this.getDateTime(dateStart));
    }
    if(dateEnd.length > 0){
      filteredMovies = filteredMovies.filter((item)=>this.getDateTime(item.release_date) <= this.getDateTime(dateEnd));
    }
    return (
      <ImageList rowHeight={350} cols={4} gap={10}>
        {filteredMovies.map((item, index)=>(
          <ImageListItem key={item.id}>
            <Link to={`/detail?id=${index}`}>
            <img className="img-link" src={item.poster_url} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>{"Release Date:  " + this.dateConverter(item.release_date)}</span>}
            />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    )
  }
}

export default MovieList;