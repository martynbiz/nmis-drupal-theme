import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  Card, 
  Button, 
  CardDeck, 
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

import { 
  Container, 
  Row, 
  Col,
  Breadcrumb,
} from 'react-bootstrap';
  
const NEWS_LIST_URL = 'http://localhost:8083/jsonapi/node/article?include=field_image';

const SITE_URL = 'http://localhost:8083';

class NewsItem extends Component {

  render() {
    
    const {
      id,
      attributes,
      relationships,
      included,
    } = this.props;

    // get the image for this article 
    const img = relationships.field_image.data && included.find(inc => inc.id === relationships.field_image.data.id);
    
    return (
      <Card>
        {img && 
          <Card.Img variant="top" src={SITE_URL + img.attributes.uri.url}/>
        }
        <Card.Body className="">
          <Card.Title>{attributes.title}</Card.Title>
          <Button as={Link} to={attributes.path.alias} variant="secondary" size="lg" disabled>
            Read more
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

class NewsList extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
      included: null,
    };
    this.loadNews = this.loadNews.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  
  render() {

    const { data, included, isHomePath } = this.state;

    return (
      <div>
        {!isHomePath && 
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>News</Breadcrumb.Item>
          </Breadcrumb>}
        <Container fluid className="bg-light py-5">
          <Container>
            <Row>
              <Col> 
                <h1>News</h1>
                <CardDeck>
                  {data !== null && data !== undefined && data.length > 0 ?
                    data.slice(0, 3).map(item => <NewsItem {...item} key={item.id} included={included}/>)
                    :
                    <div>No News found.</div>}
                </CardDeck>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }

  loadNews() {
    // Fetch News.
    fetch(NEWS_LIST_URL, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.updateData(data))
      .catch(err => console.log('Fetching News Failed', err));
  }

  updateData(responseData) {
    this.setState({
      data: responseData.data,
      included: responseData.included
    });
  }

  componentWillMount() {
    this.loadNews();
  }
}

export default NewsList;
