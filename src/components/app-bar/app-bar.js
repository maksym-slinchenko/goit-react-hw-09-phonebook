import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../navigation';
import UserMenu from '../user-menu/user-menu';
import AuthNav from '../auth-nav';
import AuthSelectors from '../../redux/auth/auth-selectors';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2A363B',
  },
};

export default function AppBar() {
  const isAuthenticated = useSelector(AuthSelectors.getIsAuthenticated);
  return (
    <header style={styles.header}>
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
