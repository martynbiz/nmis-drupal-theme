import React, { Component } from 'react';

import { 
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { 
  Breadcrumb
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

class Article extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
      currentPath: null,
    };
  }
  
  render() {
    const { location } = this.props;
    const { data, currentPath, isHomePath } = this.state;
    if (location.pathname !== currentPath) {
      this.translatePath(location);
    }
    
    return (
      <div>
        {!isHomePath && 
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/news"}}>News</Breadcrumb.Item>
            <Breadcrumb.Item active>{data && data.attributes.title}</Breadcrumb.Item>
          </Breadcrumb>}
        {data && data.attributes.body && 
          <Container className="py-5">
            <Row>
              <Col>
                <h1>{data.attributes.title}</h1>
                <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}} />
              </Col>
            </Row>
          </Container>}
      </div>
    );
  }

  translatePath() {
    const { location } = this.props;
    fetch('http://localhost:8083/router/translate-path?path=' + location.pathname, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.loadContent(data))
      .catch(err => this.setState({
        data: null,
        currentPath: location.pathname,
      }));
  }

  loadContent(data) {
    const { location } = this.props;
    fetch(data.jsonapi.individual, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.updateContent(data))
      .catch(err => this.setState({
        data: null,
        currentPath: location.pathname,
      }));
  }

  updateContent(responseData) {
    const { location } = this.props;
    this.setState({
      data: responseData.data,
      currentPath: location.pathname,
    });
  }
}

export default Article
