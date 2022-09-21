import React from 'react';
import { MovieCard } from './movie-card/movie-card';
import { MovieView } from './movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        {"_id":{"$oid":"631a90c1ad0d80d1c3abab9c"},"Title":"Captain America","Description":"A young man dreaming to become a soldier, but he has a bit of super soldier serum help.","Genre":{"Name":"Thriller","Description":"Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."},"Director":{"Name":"Joe Johnston","Birthday":"May 13, 1950"},"ImagePath":"img/hi.jpeg","Featured":true},
        {"_id":{"$oid":"631a926dad0d80d1c3abab9d"},"Title":"Iron Man","Description":"A billionaire finding his true calling to life.","Genre":{"Name":"Suspense","Description":"The film is often chilling, edgy, disturbing, unsettling, moody, ominous and foreboding."},"Director":{"Name":"Jon Favreau","Birthday":"October 19, 1966","Bio":"Initially an indie film favorite, actor Jon Favreau has progressed to strong mainstream visibility into the millennium and, after nearly two decades in the business, is still enjoying character stardom as well as earning notice as a writer/producer/director."},"ImagePath":"ironman.png","Featured":false},
        {"_id":{"$oid":"631aa85cad0d80d1c3abab9e"},"Title":"Iron Man 2","Description":"Tony Stark, now revealed as Iron Man, faces a threat with familiar technology.","Genre":{"Name":"Suspense","Description":"The film is often chilling, edgy, disturbing, unsettling, moody, ominous and foreboding."},"Director":{"Name":"Jon Favreau","Birthday":"October 19, 1966","Bio":"Initially an indie film favorite, actor Jon Favreau has progressed to strong mainstream visibility into the millennium and, after nearly two decades in the business, is still enjoying character stardom as well as earning notice as a writer/producer/director."},"ImagePath":"ironman2.png","Featured":false},
        {"_id":{"$oid":"631aa914ad0d80d1c3abab9f"},"Title":"Thor","Description":"A young God aspiring to protect the Realms","Genre":{"Name":"Comedy","Description":"A subgenre of fantasy that is primarily humorous in intent and tone."},"Director":{"Name":"Kenneth Branagh","Birthday":"December 10, 1960"},"ImagePath":"thor.png","Featured":true},
        {"_id":{"$oid":"631aaabdad0d80d1c3ababa0"},"Title":"The Incredible Hulk","Description":"A Calm man finds that when he is angry, it is not good for anyone.","Genre":{"Name":"Action","Description":"An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations including explosions, fight scenes, daring escapes, etc."},"Director":{"Name":"Louis Leterrier","Birthday":"June 17, 1973"},"ImagePath":"hulk.png","Featured":false},
        {"_id":{"$oid":"631acea8ad0d80d1c3ababa1"},"Title":"The Black Panther","Description":"After his father dies, young prince has to step up to defend his nation.","Genre":{"Name":"Action","Description":"An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations including explosions, fight scenes, daring escapes, etc."},"Director":{"Name":"Ryan Coogler","Birthday":"May 23, 1986"},"ImagePath":"blackpanther.png","Featured":false},
        {"_id":{"$oid":"631acf57ad0d80d1c3ababa2"},"Title":"The Guardians of the Galaxy","Description":"A group of unusual criminals team up to save the galaxy.","Genre":{"Name":"Comedy","Description":"A subgenre of fantasy that is primarily humorous in intent and tone."},"Director":{"Name":"James Gunn","Birthday":"August 5, 1966"},"ImagePath":"guardiansofthegalaxy.png","Featured":true},
        {"_id":{"$oid":"631ad02bad0d80d1c3ababa3"},"Title":"Shang-Chi","Description":"A thought-to-be nobody takes on the problems of his immortal father.","Genre":{"Name":"Action","Description":"An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc."},"Director":{"Name":"Destin Daniel Cretton","Birthday":"November 23, 1978"},"ImagePath":"shangchi.png","Featured":false},
        {"_id":{"$oid":"631ad0d5ad0d80d1c3ababa4"},"Title":"Avengers: Infinity War","Description":"The Avengers face their biggest threat yet, a mad Titan with the power of a god","Genre":{"Name":"Action","Description":"An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc."},"Director":{"Name":"Anthony & Joe Russo","Birthday":"February 3, 1970 & July 18, 1971"},"ImagePath":"avengersinfinitywar.png","Featured":true},
        {"_id":{"$oid":"631ad122ad0d80d1c3ababa5"},"Title":"Avengers: End Game","Description":"After being defeated by Thanos, the Avengers must AVENGE once again!","Genre":{"Name":"Action","Description":"An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc."},"Director":{"Name":"Anthony & Joe Russo","Birthday":"February 3, 1970 & July 18, 1971"},"ImagePath":"avengersendgame.png","Featured":true}
        
      ],
      selectedMovie: null
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}


