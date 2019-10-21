import React from 'react';
import axios from 'axios';
import { Button, Card, CardContent, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from './Header';
import myConfig from '../config';

function BookForm() {
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isbn, setIsbn] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snack, setSnack] = React.useState(false);

  const handleCloseSnack = () => {
    setSnack(false);
  };

  const newBook = {
    author,
    description,
    isbn,
    publicationDate: new Date().toISOString(),
    reviews: [],
    title,
  };

  const handleSubmit = e => {
    e.preventDefault();
    return axios
      .post(`${myConfig.apiUrl}/books`, newBook)
      .then(() => {
        setSnack(true);
        setSnackMessage('new book has been added');
        setAuthor('');
        setDescription('');
        setIsbn('');
        setTitle('');
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
      <Header title="Create book" url="/" icon={<ArrowBackIcon />} />
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
export default BookForm;
