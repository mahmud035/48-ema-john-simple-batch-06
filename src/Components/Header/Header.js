import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.warning(`You just logged out`);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  return (
    <div>
      <nav className="header">
        <img src={logo} alt="" />
        <div>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="/shop"
          >
            Shop
          </NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/inventory">Inventory</NavLink>
          <NavLink to="/about">About</NavLink>

          {user && user?.uid ? (
            <NavLink onClick={handleLogOut} to="/login">
              Log Out
            </NavLink>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign up</NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
