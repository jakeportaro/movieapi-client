import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { setMovies } from "../../actions/actions";

// we haven't written this one yet
import MoviesList from "../movies-list/movies-list";

import { NavBar } from "../navbar/navbar";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

import "../main-view/main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMovies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  getMovies(token) {
    axios
      .get("https://marvel-movies-api.herokuapp.com//movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  handleFavorite = (movieId, action) => {
    const { user: username, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null && username !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === "add") {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://marvel-movies-api.herokuapp.com/users/${username}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://marvel-movies-api.herokuapp.com/users/${username}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    const { selectedMovie, user, favoriteMovies } = this.state;
    const { movies } = this.props;

    return (
      <Router>
        <NavBar user={user} />
        <Route
          exact
          path="/"
          render={() => {
            if (!user)
              return (
                <Col>
                  <LoginView
                    md={4}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList md={4} movies={movies} />;
          }}
        />

        <Route
          path="/register"
          render={() => {
            console.log("Registering User");
            if (user) return <Redirect to="/" />;
            return (
              <Col>
                <RegistrationView
                  onLoggedIn={(user) => this.onLoggedIn(user)}
                />
              </Col>
            );
          }}
        />

        <Route
          path={`/users/:username`}
          render={({ history }) => {
            if (!user) return <Redirect to="/" />;
            return (
              <Col>
                <ProfileView
                  movies={movies}
                  goBack={history.goBack}
                  favoriteMovies={favoriteMovies || []}
                  handleFavorite={this.handleFavorite}
                />
              </Col>
            );
          }}
        />

        <Route
          path={`/user-update/:username`}
          render={({ match, history }) => {
            if (!user) return <Redirect to="/" />;
            return (
              <Col>
                <UserUpdate user={user} onBackClick={() => history.goBack()} />
              </Col>
            );
          }}
        />

        <Route
          path="/movies/:movieId"
          render={({ match, history }) => {
            // console.log("movies route user", user);
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()}
                  handleFavorite={this.handleFavorite}
                />
              </Col>
            );
          }}
        />

        <Route
          path="/directors/:directorName"
          render={({ match, history }) => {
            console.log("movies route director", user);
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView
                  movie={movies.find(
                    (m) => m.Director.Name === match.params.directorName
                  )}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />

        <Route
          path="/genres/:genreName"
          render={({ match, history }) => {
            console.log("movies route genre", user);
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView
                  movie={movies.find(
                    (m) => m.Genre.Name === match.params.genreName
                  )}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />

        {/* <Route
          path={`/users/:${user}`}
          render={({ history }) => {
            if (!user) return <Redirect to="/" />;
            return (
              <ProfileView
                movies={movies}
                goBack={history.goBack}
                favoriteMovies={favoriteMovies || []}
                handleFavorite={this.handleFavorite}
              />
            );
          }}
        /> */}

        <Route
          path="/home"
          render={() => {
            console.log("Selecting Movie");
            if (user) return <Redirect to="/" />;
            return (
              <Row className="main-view justify-content-md-center">
                {selectedMovie ? (
                  <Col md={8}>
                    <MovieView
                      movie={selectedMovie}
                      onBackClick={(newSelectedMovie) => {
                        this.setSelectedMovie(newSelectedMovie);
                      }}
                    />
                  </Col>
                ) : (
                  movies.map((movie) => (
                    <Col md={4}>
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          this.setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))
                )}
              </Row>
            );
          }}
        />
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
