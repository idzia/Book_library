import React from 'react';
import { Button, Card, CardContent, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';
import myConfig from '../config';

function ReviewForm({ match }) {
  const bookId = match.params.id;

  const [author, setAuthor] = React.useState('');
  const [body, setBody] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snack, setSnack] = React.useState(false);

  const newReview = {
    author,
    body,
    book: `/books/${bookId}`,
    publicationDate: new Date().toISOString(),
    rating: +rating,
  };

  const handleCloseSnack = () => {
    setSnack(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    return axios
      .post(`${myConfig.apiUrl}/reviews`, newReview)
      .then(() => {
        setSnack(true);
        setSnackMessage('new review has been added');
        setAuthor('');
        setBody('');
        setRating(0);
      })
      .catch(error => {
        if (error.response && error.response.data['hydra:description']) {
          setSnack(true);
          setSnackMessage(error.response.data['hydra:description']);
        } else {
          setSnack(true);
          setSnackMessage('error');
        }
      });
  };

  return (
    <Card>
      <Header
        title="Create Book's review"
        url={`http://localhost:3000/books/${bookId}`}
        icon={<ArrowBackIcon />}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            id="rev_author"
            label="author"
            value={author}
            onChange={e => {
              setAuthor(e.target.value);
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="rev_body"
            label="body"
            value={body}
            onChange={e => {
              setBody(e.target.value);
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="rev_rating"
            label="rating"
            value={rating}
            onChange={e => {
              setRating(e.target.value);
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Button variant="outlined" type="submit">
            CREATE
          </Button>
        </form>
      </CardContent>
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={snack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snackMessage}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnack}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Card>
  );
}

ReviewForm.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ReviewForm;
