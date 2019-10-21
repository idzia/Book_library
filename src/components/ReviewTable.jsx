import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PropTypes from 'prop-types';
import ReviewList from './ReviewList';
import Header from './Header';

function ReviewTable({ reviewList, bookId }) {
  return (
    <Card>
      <Header
        title="Book's reviews"
        url={`${bookId}/reviews/create`}
        icon={<CreateIcon />}
      />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>body</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ReviewList reviewList={reviewList} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

ReviewTable.propTypes = {
  bookId: PropTypes.string.isRequired,
  reviewList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReviewTable;
