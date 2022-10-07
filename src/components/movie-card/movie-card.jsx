import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Card.Text>{movie.Genre.Description}</Card.Text>
          <Card.Text>{movie.Featured}</Card.Text>
        </Card.Body>
        <Card.Footer class="card-footer">
          <Link to={`/movies/${movie._id}`}>
            <Button class="open-button" variant="link">
              Open
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}
