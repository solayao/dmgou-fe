import React from 'react';
import createStyled from 'material-ui-render-props-styles/index';
import styles from '@/overrides/orStyles';
import MyFooter from '@dizzy/FooterComponent';
import PhoneFooter from '@proje/PhoneFooter';
import {isPhoneContext} from '@/store/context';

const Styled = createStyled(styles, {withTheme: true});

function FooterModel (props) {
    return (
        <isPhoneContext.Consumer>
            {isPhone => (
                <Styled>
                    {({classes}) => isPhone ? (<PhoneFooter />) : (
                            <MyFooter orClassName={classes.appFooter}>
                                <p>
                                免责声明            |                隐私政策                      |               联系我们
                                </p>
                                <p>
                                    本站漫画等相关内容均来自互联网，以供漫画爱好者研究漫画画法技巧和构图方式，若侵犯到您的权益，请立即联系我们删除。本站不负任何相关责任。
                                </p>
                            </MyFooter>
                        )
                    }
                </Styled>
            )}
        </isPhoneContext.Consumer>
    )
}

export default FooterModel;