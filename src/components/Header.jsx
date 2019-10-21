import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, CardHeader, IconButton } from '@material-ui/core';

function Header({ title, url, icon }) {
  return (
    <CardActions>
      <CardHeader title={title} />
      <IconButton href={url}>{icon}</IconButton>
    </CardActions>
  );
}

Header.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Header;
