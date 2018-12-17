import React from 'react';
import styles from './index.module.css';

const year = new Date().getFullYear();

/**
 * Footer部件
 * @class FooterComponent
 * @extends {Component}
 */
function FooterComponent(props) {
    return(
        <footer className={styles.footer}>
           ©Copyright 2017-{year} Design by <span className={styles.ower}>Solayao</span>
           <a href="http://www.miitbeian.gov.cn/" target="_blank"> [网站备案：粤ICP备18066176号-2]</a>
        </footer>
    );
}

FooterComponent.propTypes = {};
FooterComponent.defaultProps = {};

export default FooterComponent;
