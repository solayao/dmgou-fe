import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';

import mStyles from '../index.module.scss';

const styles = {
    root: {
        fontSize: '.3rem',
    },
    label: {
        fontSize: '.3rem',
    },
};


/**
 * @description 标签页
 * @author Dizzy L
 * @class IconTabs
 * @prop {Array} tabList
 * @prop {*} defaultTab
 * @prop {object} tabClasses
 * @prop {Function} afterChangeTag
 * @extends {React.Component}
 */
@withStyles(styles)
class IconTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.defaultTab,
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.currentTab !== this.state.currentTab) {
            if (this.props.afterChangeTag) {
                this.props.afterChangeTag(nextState.currentTab);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.defaultTab === nextState.currentTab) return false;
        return true;
    }
    
    handleChange = (event, value) => {
        this.setState({ 
            currentTab: value,
        });
    };

    render() {
        const { currentTab } = this.state;
        
        if (this.props.tabList.length === 0) return null;
        return (
            <Paper>
                <Tabs
                    value={currentTab}
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons="auto"
                    indicatorColor="secondary"
                    textColor="secondary"
                >   
                    {this.props.tabList.map(tab => 
                        <Tab
                            key={tab.value}
                            value={tab.value}
                            disabled={tab.disabled || false}
                            classes={{
                                root: this.props.classes.root,
                                label: this.props.classes.label,
                            }}
                            icon={tab.icon || ''}
                            label={tab.badgeContent ? 
                                (<Badge color="secondary" badgeContent={tab.badgeContent}
                                    classes={{badge: mStyles['badge-num']}}>{tab.label}</Badge>
                                ) : tab.label
                            } 
                        />
                    )}
                </Tabs>
            </Paper>
        )
    }
}

IconTabs.propTypes = {
    tabList: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        icon: PropTypes.node,
        disabled: PropTypes.boolean,
        badgeContent: PropTypes.number,
    })),
    defaultTab: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    tabClasses: PropTypes.object,
    afterChangeTag: PropTypes.func,
};
IconTabs.defaultProps = {
    tabList: [],        // 模块列表
    defaultTab: '',     // 默认模块
    tabClasses: {},    // tab样式的overrides
    afterChangeTag: (key)=>{},  // 改变tag后执行的方法
};

export default IconTabs;