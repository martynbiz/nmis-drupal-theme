import React, { Component } from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './App.css';

import News from './Components/Views/News';
import Article from './Components/Article';
import Page from './Components/BasicPage';

import { 
  Navbar, 
  Nav, 
  Form,
  FormControl,
  NavDropdown,
  Button
} from 'react-bootstrap';
  
// const LIST_URL = 'http://localhost:8083/jsonapi/node/article?include=field_image';

class App extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
    };
  }
  
  render() {
    
    const {
      data
    } = this.state;
    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar expand="lg" variant="dark">
            <Navbar.Brand href="#home">
              <img src="https://nmis.is.strath.ac.uk/media/nationalmanufacturinginstitutescotland/logos/nmis-main.png" alt="National Manufacturing Institute Scotland" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav defaultActiveKey="/home" as="ul" className="navbar-nav mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <NavDropdown title="Abous us" id="dropdown02">
                  <Nav.Link as={Link} to="/about-us">What is NMIS</Nav.Link>
                </NavDropdown>
                <NavDropdown title="Our facilities" id="dropdown02">
                  <Nav.Link as={Link} to="/msa">Manufacturing Skills Academy</Nav.Link>
                </NavDropdown>
                <NavDropdown title="What's happening" id="dropdown02">
                  <Nav.Link as={Link} to="/news">News</Nav.Link>
                </NavDropdown>
                <Nav.Link as={Link} to="/get-in-touch">Get in touch</Nav.Link>
              </Nav>
              <form className="form-inline my-2 my-lg-0" action="/search/" method="get" id="site-search">
                <div className="position-relative">
                  <input className="form-control mr-sm-2 site-search__input" type="text" placeholder="Search" aria-label="Search" name="query" id="site-search__input" autoComplete="off" />
                  <div id="suggestions" className="suggestions" style={{display: 'block'}}>
                    <ul id="suggestions__list" className="suggestions__list" />
                  </div>
                </div>
                <button className="btn btn-light my-2 my-sm-0" type="submit">Search</button>
              </form>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Page}/>
            <Route exact path="/news" component={News}/>
            <Route path="/news" render={(match) => <Article key={match.location.pathname} {...match}/>}/>
            <Route render={(match) => <Page key={match.location.pathname} {...match}/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  // loadNews() {
  //   // Fetch News.
  //   fetch(LIST_URL, {mode:'cors'})
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then((data) => this.updateData(data))
  //     .catch(err => console.log('Fetching News Failed', err));
  // }

  // updateData(responseData) {
  //   this.setState({
  //     data: responseData.data,
  //     included: responseData.included
  //   });
  // }

  // componentWillMount() {
  //   this.loadNews();
  // }
}

export default App;
