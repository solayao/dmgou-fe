import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import logo from './logo.svg';

/**
 * Header部件
 * 
 * @class HeaderComponent
 * @extends {Component}
 */
class HeaderComponent extends Component {
    render() {
        let { logoClass, logoAlt } = this.props;
        return (
            <header className={styles.h}>
                <span className={styles.left}>
                    <img src={logo} className={logoClass} alt={logoAlt} />
                </span>
                <span className={styles.right}>
                    LoginMess
                </span>
            </header>
        )
    }
}

HeaderComponent.propTypes = {
    logoClass: PropTypes.string,
    logoAlt: PropTypes.string,
}
HeaderComponent.defaultProps = {
    logoClass: 'App-logo',
    logoAlt: 'Logo',
}
export default HeaderComponent;