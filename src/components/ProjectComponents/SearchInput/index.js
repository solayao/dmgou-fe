import React from 'react';
import {withRouter} from 'react-router';
import {inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Query from '@gql/Query';
import {getComicListByName} from '@/query';
import mStyles from './index.module.scss';
import {isNotEmpty} from 'dizzyl-util/lib/type';

const NON_COMIC = '没有该漫画';

@inject(stores => ({
    changeSearchInputVal: stores.store.changeSearchInputVal
}))
@withRouter
class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryProp: '',
            showHistory: false,
        }
        this.inputRef = null;
        this.historyRef = React.createRef();
        this.queryResultList = null;
    }

    componentDidMount() {
        if (this.inputRef.clientHeight) {
            this.inputRef.addEventListener('keypress', this.handleKeyPress);
            this.historyRef.current.style = `top:${this.inputRef.clientHeight}px`;
        }
    }

    componentWillUnmount() {
        this.inputRef.removeEventListener('keypress', this.handleKeyPress);
        this.inputRef = this.historyRef = this.queryResultList = null;
    }

    handleChangeShowText = (event) => {
        let val = event.target.value;
        this.setState({
            queryProp: val,
            showHistory: Boolean(val)
        })
    }

    handleSelectHistory = (event) => {
        if (event.target.localName !== 'ul') {
            let val = event.target.innerText
            let v = val.replace(/(^\s*)|(\s*$)/g, "");
            if (v !== NON_COMIC) {
                this.setState({
                    showHistory: false,
                }, () => {
                    this.inputRef.value = v;
                    this.inputRef.focus();
                })
            }
        }
    }
    
    handleKeyPress = (event) =>{
        if (event.keyCode === 13 || event.charCode === 13) {
            let inputVal = this.inputRef.value;
            if (this.queryResultList && isNotEmpty(this.queryResultList.find(o => o.name === inputVal))) {
                this.props.history.push({
                    pathname: '/detail',
                    search: `cn=${encodeURIComponent(inputVal)}`
                });
            } else {
                this.props.changeSearchInputVal(inputVal);
                this.props.history.push('/search');
            }

            this.setState({
                showHistory: false,
            }, () => {
                this.inputRef.value = '';
                if (this.props.handleAfterSearch) {
                    this.props.handleAfterSearch(inputVal)
                }
            })
        }
    }

    inputBindRef = ref => { this.inputRef = ref; }

    render() {
        const {queryProp, showHistory} = this.state, {inputProps, historyClasses} = this.props;
 
        return (
            <div className={mStyles["search-input"]}>
                <InputBase inputRef={this.inputBindRef} onChange={this.handleChangeShowText}
                    {...inputProps} />

                <div ref={this.historyRef} 
                    className={classNames(mStyles["search-history"],
                        !showHistory && mStyles["search-history-hidden"], historyClasses)}>
                    <Query query={getComicListByName} variables={{name: queryProp}} skip={!Boolean(showHistory)}>
                        {({data}) => {
                            const {comicListByName} = data;
                            this.queryResultList = comicListByName;
                            return (
                                <List onClick={this.handleSelectHistory}>
                                    { isNotEmpty(comicListByName) ?
                                        comicListByName.map(o => (
                                            <ListItem button key={o.id}>
                                                <ListItemText primary={o.name} />
                                            </ListItem>
                                        ))
                                        :
                                        <ListItem disabled button key="none-comic">
                                            <ListItemText primary={NON_COMIC} />
                                        </ListItem>
                                    }
                                </List>
                            )
                        }}
                    </Query>
                </div>
     
            </div>
        )
    }
}

SearchInput.propTypes = {
    inputProps: PropTypes.object.isRequired,
    historyClasses: PropTypes.string,
    handleAfterSearch: PropTypes.func,
};
SearchInput.defaultProps = {};

export default SearchInput;
