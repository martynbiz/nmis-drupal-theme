import React, { Component } from 'react';
import PageComponent from "./PageComponent";

import {
  Link,
} from 'react-router-dom';

import { 
  Breadcrumb
} from 'react-bootstrap';

class Page extends PageComponent {
  
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
            <Breadcrumb.Item active>{data && data.title}</Breadcrumb.Item>
          </Breadcrumb>}
        {data && data.attributes.body && 
          <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}} />}
      </div>
    );
  }
}

export default Page
