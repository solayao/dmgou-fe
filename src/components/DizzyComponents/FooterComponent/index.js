import React from 'react';
import Proptypes from 'prop-types';
import styles from './index.moudle.css';

/**
 * Footer部件
 * @class FooterComponent
 * @extends {Component}
 */
function FooterComponent(props) {
    const year = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
           ©Copyright {year}} Design by <span className={styles.ower}>Solayao</span>
        </footer>
    );
}

FooterComponent.propTypes = {};
FooterComponent.defaultProps = {};

export default FooterComponent;
