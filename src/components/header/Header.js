import React from 'react';
import logo from '../../img/logo.svg';

const Header = () => {
  return (
    <header className="App__header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <h2>PLACES</h2>
    </header>
  );
};

export default Header;
