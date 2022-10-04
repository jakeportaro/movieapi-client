import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://marvel-movies.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    return (
      <Router>
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
            return movies.map((m) => (
              <Col md={8} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
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
          path="/movies/:movieId"
          render={({ match, history }) => {
            console.log("movies route user", user);
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
                />
              </Col>
            );
          }}
        />

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
