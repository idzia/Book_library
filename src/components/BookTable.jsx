import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import BookList from './BookList';
import Header from './Header';

function BookTable() {
  return (
    <Card>
      <Header title="Books" url="/create" icon={<CreateIcon />} />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>isbn</TableCell>
              <TableCell>title</TableCell>
              <TableCell>author</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <BookList />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default BookTable;
