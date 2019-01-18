import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {isNotEmpty} from 'dizzyl-util/lib/type';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

/**
 * @description 查询按钮
 * @prop {Function} handleSearch 处理查询的方法
 * @class SearchBtn
 * @extends {PureComponent}
 */
@inject((stores) => ({
    searchInputVal: stores.store.searchInputVal,
    changeSearchInputVal: stores.store.changeSearchInputVal
}))
@observer
class SearchBtn extends React.Component {
    constructor (props) {
        super (props);
        this.inputRef = null;
    }

    componentDidMount() {
        if (this.inputRef) {
            this.inputRef.addEventListener('keypress', this.handleInput, true)
        }
        if (isNotEmpty(this.props.searchInputVal))
            this.inputChange(this.props.searchInputVal);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchInputVal !== this.props.searchInputVal)
            this.inputChange(nextProps.searchInputVal);
    }

    componentWillUnmount() {
        if (this.inputRef) {
            this.inputRef.removeEventListener('keypress', this.handleInput)
        }
        this.props.changeSearchInputVal('');
        this.inputRef = null;
    }

    inputChange = (val) => {
        this.inputRef.value = val;
        this.inputRef.focus();

        this.props.handleSearch();
    }

    handleInput = (event) =>　{
        if(event.keyCode === 13){ //为按下回车时调用的方法
            event.preventDefault();

            this.props.changeSearchInputVal(this.inputRef.value);
            this.props.handleSearch();
        }
    }

    handleClickBtn = () =>　{
        this.props.handleSearch();
    }

    textFieldInputProps = ({
        endAdornment: (
            <InputAdornment position="end">
                <IconButton aria-label="查询" onClick={this.handleClickBtn}>
                    <SearchIcon />
                </IconButton>
            </InputAdornment>
        )
    })

    textFieldRefBind = ref => { this.inputRef = ref }

    render () {
        return (
            <form autoComplete="off">
                <TextField
                    id="search-input"
                    fullWidth
                    autoFocus
                    label="输入查询"
                    placeholder="请输入用户名称、作者"
                    margin="normal"
                    type="search"
                    variant="outlined"
                    inputRef={this.textFieldRefBind}
                    InputProps={this.textFieldInputProps}
                />
            </form>
        )
    }
} 

SearchBtn.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};
SearchBtn.defaultProps = {
    handleSearch: () => {},
};

export default SearchBtn;