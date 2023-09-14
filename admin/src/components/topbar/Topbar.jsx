import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/userRedux';
import styled from "styled-components";
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${'' /* ${mobile({ fontSize: "12px", marginLeft: "10px" })} */}
`;
export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  // const user = JSON.parse(localStorage.getItem('user'));

 
  const dispatch = useDispatch();
  const handleSignOut = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    user ? console.log("hey"): console.log("no user");
    history.push('/');
  };
  return (

    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">charAdmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
          {/* <Link to="/register" style={{ textDecoration: 'none',color:"black" }}>
          <MenuItem>REGISTER</MenuItem>
          </Link> */}
          {user ? <MenuItem onClick={handleSignOut}>SIGN OUT</MenuItem> : <Link to="/login" style={{ textDecoration: 'none',color:"black" }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>}
        </div>
      </div>
    </div>
  );
}