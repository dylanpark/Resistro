import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const footerLinkMap =   {
  'about': 'https://github.com/dylanpark/resistro#about',
  'disclaimer': 'https://github.com/dylanpark/resistro/blob/dev/LICENSE#L15',
  'github': 'https://github.com/dylanpark/resistro'
}

export default class Footer extends React.Component {
  render() {
    return (
      <div id='footer'>
        <LinkList links={footerLinkMap}/>
      </div>
    );
  }
}

class LinkList extends React.Component {
  render() {
    const linkItems = _.map(this.props.links, (url, text) =>
      <LinkItem key={text} text={text} link={url} />
    );

    return (
      <ul class='horizontal'>
        {linkItems}
      </ul>
    )
  }
}

LinkList.propTypes = {
  links: PropTypes.object
}

class LinkItem extends React.Component {
  render() {
    return (
      <li>
        <a class='lg-margin' href={this.props.link}>{this.props.text}</a>
      </li>
    )
  }
}

LinkItem.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}
