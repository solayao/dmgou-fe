import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const year = new Date().getFullYear();

/**
 * Footer部件
 * @class FooterComponent
 * @extends {Component}
 */
function FooterComponent(props) {
    return(
        <footer className={classNames(styles.footer, props.orClassName)}>
            {props.children}
            <p>
                ©Copyright 2017-{year} Design by <span className={styles.ower}>DizzyL</span>
                {/* <a href="http://www.miitbeian.gov.cn/" target="_blank"> [网站备案：粤ICP备18066176号-2]</a> */}
            </p>
        </footer>
    );
}

FooterComponent.propTypes = {
    orClassName: PropTypes.string,
};
FooterComponent.defaultProps = {};

export default FooterComponent;
