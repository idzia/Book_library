import React from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import myConfig from '../config';

function ReviewList({ reviewList }) {
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snack, setSnack] = React.useState(false);

  const handleCloseSnack = () => {
    setSnack(false);
  };

  const handleDeleteReview = reviewId => {
    return axios
      .delete(`${myConfig.apiUrl}${reviewId}`)
      .then(() => {
        window.location.reload();
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

  return reviewList.map(rev => (
    <TableRow key={rev['@id']}>
      <TableCell>{rev.body}</TableCell>
      <TableCell>
        <IconButton href={rev['@id']}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteReview(rev['@id'])}>
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

export default ReviewList;
