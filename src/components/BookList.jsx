import React from 'react';
import axios from 'axios';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import myConfig from '../config';

function BookList() {
  const [bookList, setData] = React.useState([]);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snack, setSnack] = React.useState(false);

  const handleCloseSnack = () => {
    setSnack(false);
  };

  React.useEffect(() => {
    axios
      .get(`${myConfig.apiUrl}/books`)
      .then(response => {
        setData(response.data['hydra:member']);
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
  }, []);

  const handleDeleteBook = bookId => {
    return axios
      .delete(`${myConfig.apiUrl}${bookId}`)
      .then(() => {
        setData(bookList.filter(book => book['@id'] !== bookId));
        setSnack(true);
        setSnackMessage('the book has been deleted');
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

  return bookList.map(book => (
    <TableRow key={book['@id']}>
      <TableCell>{book.isbn}</TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>
        <IconButton href={book['@id']}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteBook(book['@id'])}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
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
    </TableRow>
  ));
}

export default BookList;
