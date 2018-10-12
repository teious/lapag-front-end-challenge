import * as React from 'react'
import './Header.css';
import * as logo from '../../logo-white.png'
export default class Header extends React.Component {
  render() {
    return (
      <div className="header primary-bg ">
        <img src={logo} width="100" height="35"/>
        <span>Front end Challenge</span>
      </div>
    )
  }
}
