import React from 'react';

export default class Footer extends React.Component {

  constructor() {
    super();
    this.renderLink = this.renderLink.bind(this);
  }

  renderLink(text, link) {
    return <a class='margins' href={link}>{text}</a>
  }

  renderListItems() {
    return [
      this.renderLink('disclaimer', 'https://www.google.com'),
      this.renderLink('about', 'about'),
      this.renderLink('github', 'https://github.com/dylanpark/resistro')
    ];
  }

  render() {

    var listItems = this.renderListItems();

    return (
      <div id='footer'>
        <ul class='table'>
          {listItems}
        </ul>
      </div>
    );
  }
}
