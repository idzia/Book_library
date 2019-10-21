import React from 'react';
import axios from 'axios';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import Header from './Header';
import ReviewTable from './ReviewTable';
import myConfig from '../config';

function BookEdit({ match }) {
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isbn, setIsbn] = React.useState('');
  const [publicationDate, setPublicationDate] = React.useState('');
  const [reviews, setReviews] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snack, setSnack] = React.useState(false);

  const handleCloseSnack = () => {
    setSnack(false);
  };

  React.useEffect(() => {
    axios
      .get(`${myConfig.apiUrl}/books/${match.params.id}`)
      .then(response => {
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setIsbn(response.data.isbn);
        setPublicationDate(response.data.publicationDate);
        setReviews(response.data.reviews);
        setTitle(response.data.title);
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

  const updateBook = {
    author,
    description,
    isbn,
    publicationDate,
    reviews,
    title,
  };

  const handleSubmit = e => {
    e.preventDefault();
    return axios
      .put(`${myConfig.apiUrl}/books/${match.params.id}`, updateBook)
      .then(() => {
        setSnack(true);
        setSnackMessage('the book has been updated');
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
      <Header title={title} url="/" icon={<ArrowBackIcon />} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            id="book_title"
            label="title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="book_isbn"
            label="isbn"
            value={isbn}
            onChange={e => {
              setIsbn(e.target.value);
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="book_description"
            label="description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="book_author"
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
            id="book_publicationDate"
            label="publicationDate"
            value={publicationDate}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Button variant="outlined" type="submit">
            UPDATE
          </Button>
        </form>
        <ReviewTable reviewList={reviews} bookId={match.params.id} />
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

BookEdit.propTypes = {
  match: PropTypes.object.isRequired,
};

export default BookEdit;
