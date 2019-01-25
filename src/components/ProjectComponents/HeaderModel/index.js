import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import Collapse from '@material-ui/core/Collapse';
import SearchInput from '@proje/SearchInput';
import createStyled from 'material-ui-render-props-styles/index';
import styles from '@/overrides/orStyles';
import MyHeader from '@mui/AppBarHeader';
import {isPhoneContext} from '@/store/context';
import mStyle from './index.module.scss';

const Styled = createStyled(styles, {withTheme: true});

const HOtherPC = () => (
    <Styled>
        {({classes}) => (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <SearchInput inputProps={{
                    placeholder: 'Search…',
                    classes: {
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }
                }}/>
            </div>
        )}
    </Styled>
)

class HOtherPhone extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            search: false
        }
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
        let {search} = this.state;
        return (
            <React.Fragment>
                <div className={mStyle['phone-btn']} onClick={this.handleShowSearch}>
                    <SearchIcon />
                </div>

                <Styled>
                    {({classes}) => (
                        <Modal open={search} onBackdropClick={this.handleSearchClose}>
                            <div className={classNames(
                                mStyle['phone-top-search'],
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
                                        historyClasses={mStyle['phone-top-search-histroy']}
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
}

function HeaderModel (props) {
    let {showDrawler, changeDrawlerState} = props;
    return (
        <isPhoneContext.Consumer>
            {isPhone => (
                <Styled>
                    {({classes}) => (
                        <MyHeader 
                            title='DMGOU'
                            orClassName={classNames(
                                showDrawler  && mStyle['abh-shift'],
                                showDrawler ? classes.appBarShift : classes.appBar,
                                !isPhone && classes.appPCHeader
                            )}
                            handleClickMenuIcon={changeDrawlerState}
                            otherNode={isPhone ? (<HOtherPhone />) : (<HOtherPC />)}
                        />           
                    )}
                </Styled>
            )}
        </isPhoneContext.Consumer>
    )
}

HeaderModel.propTypes = {
    showDrawler: PropTypes.bool,
    changeDrawlerState: PropTypes.func,
}

export default (
    inject(stores => ({
        showDrawler: stores.store.showDrawler,
        changeDrawlerState: stores.store.changeDrawlerState
    }))(
        observer(
            HeaderModel
        )
    )
);
