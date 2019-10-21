import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Header from './Header';
import myConfig from '../config';

function ReviewEdit({ match }) {
  const [author, setAuthor] = React.useState('');
  const [body, setBody] = React.useState('');
  const [publicationDate, setPublicationDate] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [book, setBookId] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snack, setSnack] = React.useState(false);

  const handleCloseSnack = () => {
    setSnack(false);
  };

  React.useEffect(() => {
    axios
      .get(`${myConfig.apiUrl}/reviews/${match.params.id}`)
      .then(response => {
        setAuthor(response.data.author);
        setBody(response.data.body);
        setPublicationDate(response.data.publicationDate);
        setRating(response.data.rating);
        setBookId(response.data.book['@id']);
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
  }, [match]);

  const updateReview = {
    author,
    body,
    book,
    publicationDate,
    rating,
  };

  const handleSubmit = e => {
    e.preventDefault();
    return axios
      .put(`${myConfig.apiUrl}/reviews/${match.params.id}`, updateReview)
      .then(() => {
        setSnack(true);
        setSnackMessage('the review has been updated');
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
      <Header title="Reviews" url={book} icon={<ArrowBackIcon />} />
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
          <TextField
            id="rev_publicationDate"
            label="publication date"
            value={publicationDate}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Button variant="outlined" type="submit">
            UPDATE
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

ReviewEdit.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ReviewEdit;
