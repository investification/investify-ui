import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';

import logoLight from '../../assets/img/logo_light.png';
import './navbar.css';

const AuthNavbar = ({ activeTab }) => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={logoLight} />
          </NavbarBrand>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      <Navbar fixed="bottom" className="navbar-mobile">
        <Nav>
          <NavItem className={classnames({ active: activeTab === 'home' })}>
            <NavLink className="nav-link-icon" to="/" tag={Link}>
              <i className="ni ni-planet" />
              <span className="nav-link-inner--text">Home</span>
            </NavLink>
          </NavItem>
          <NavItem className={classnames({ active: activeTab === 'register' })}>
            <NavLink className="nav-link-icon" to="/auth/register" tag={Link}>
              <i className="ni ni-circle-08" />
              <span className="nav-link-inner--text">Register</span>
            </NavLink>
          </NavItem>
          <NavItem className={classnames({ active: activeTab === 'login' })}>
            <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
              <i className="ni ni-key-25" />
              <span className="nav-link-inner--text">Login</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};
AuthNavbar.propTypes = {
  activeTab: PropTypes.string,
};

export default AuthNavbar;
