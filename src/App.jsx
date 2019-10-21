import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import BookTable from './components/BookTable';
import BookEdit from './components/BookEdit';
import BookForm from './components/BookForm';
import ReviewForm from './components/ReviewForm';
import ReviewEdit from './components/ReviewEdit';

const mainStyle = {
  marginTop: '80px',
};

function App() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography>Books app</Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <div style={mainStyle}>
          <Route exact path="/" component={BookTable} />
          <Route exact path="/create" component={BookForm} />
          <Route exact path="/books/:id" component={BookEdit} />
          <Route path="/books/:id/reviews/create" component={ReviewForm} />
          <Route path="/reviews/:id" component={ReviewEdit} />
        </div>
      </Router>
    </div>
  );
}

export default App;
