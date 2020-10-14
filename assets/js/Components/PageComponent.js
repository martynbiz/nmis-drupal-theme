import React, { Component } from 'react';

class PageComponent extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
      currentPath: null,
      isHomePath: false,
    };
  }
  
  render() {
    return (
        <div>...</div>
    )
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
        currentPath: location.pathname
      }));
  }

  loadContent(translateData) {
    const { location } = this.props;
    fetch(translateData.jsonapi.individual, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((jsonapiData) => this.updateContent(jsonapiData, translateData))
      .catch(err => this.setState({
        data: null,
        currentPath: location.pathname,
      }));
  }

  updateContent(jsonapiData, translateData) {
    const { location } = this.props;
    console.log(translateData)
    this.setState({
      data: jsonapiData.data,
      currentPath: location.pathname,
      isHomePath: translateData.isHomePath
    });
  }
}

export default PageComponent
