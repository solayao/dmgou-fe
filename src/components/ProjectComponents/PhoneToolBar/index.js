import React from 'react';
import classNames from 'classnames';
import {inject, observer} from 'mobx-react';
import { Icon } from 'antd';
import createStyled from 'material-ui-render-props-styles/index';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
import './index.css';
import 'antd/lib/back-top/style/index.css';
import SearchInput from '@proje/SearchInput';
import styles from '@/overrides/orStyles';

const Styled = createStyled(styles, {withTheme: true});

@inject(stores => ({
    addToolbars: stores.store.phoneToolbars
}))
@observer
class PhoneToolBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            open: false,
            search: false,
        }
    }

    handleChangeOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleShowSearch = () => {
        this.setState({
            search: true
        })
    }

    handleSearchClose = () => {
        this.setState({
            search: false
        })
    }

    render () {
        const {open, search} = this.state, {addToolbars} = this.props;

        return (
            <React.Fragment>
                <div className="ant-back-top ant-Dui-toolbar-phone" onClick={this.handleChangeOpen}>
                    {open ? 
                        <Icon type="loading" spin={true} style={{fontSize: 20}} /> :
                        <MoreVertIcon />}

                    <Collapse in={open} classes={{
                        container: classNames(
                            'ant-Dui-toolbar-phone-collapse',
                            !open && 'ant-Dui-toolbar-phone-hidden'
                        )}}>
                        <div className="Dui-toolbar-phone-btns">
                            {addToolbars.map((C, index) => (
                                <div key={'addBtns-'+index}>{C}</div>
                            ))}
                            <div onClick={this.handleShowSearch}><SearchIcon /></div>
                        </div>
                    </Collapse>
                </div>
                
                <Styled>
                    {({classes}) => (
                        <Modal open={search} onBackdropClick={this.handleSearchClose}>
                            <div className={classNames(
                                "Dui-phone-toolbar-search",
                                classes.phoneSearch,
                            )}>
                                <Collapse in={search}>
                                    <SearchInput  
                                        inputProps={{
                                            placeholder: 'Search…',
                                            classes: {
                                                root: classes.phoneInputRoot,
                                                input: classes.phoneInputEle,
                                            }
                                        }}
                                        historyClasses="Dui-phone-search-histroy"
                                        handleAfterSearch={this.handleSearchClose}
                                    />
                                </Collapse>
                            </div>
                        </Modal>
                    )}
                </Styled>
            </React.Fragment>
        )
    }
};

export default PhoneToolBar;
