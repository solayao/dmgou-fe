import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import SortIcon from '@material-ui/icons/Sort';
import UpdateIcon from '@material-ui/icons/Update';
import ShortTextIcon from '@material-ui/icons/ShortText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Query from '@gql/Query';
import {getAllComicType, getSearchComicList} from '@/query';
import BoxHeader from '@proje/BoxHeader';
import ExpansionCard from '@mui/ExpansionCard';
import mStyle from '../index.module.scss';

const otStyle = {
    icon: mStyle['h-icon'],
    action: mStyle['h-action']
}

function SortHeader() {
    return (
        <BoxHeader icon={(<SortIcon />)} message="" action={(<span>排序</span>)} orStyle={otStyle} />
    )
}

function StateHeader() {
    return (
        <BoxHeader icon={(<UpdateIcon />)} message="" action={(<span>状态</span>)} orStyle={otStyle} />
    )
}

function TypeHeader() {
    return (
        <BoxHeader icon={(<ShortTextIcon />)} message="" action={(<span>类型</span>)} orStyle={otStyle} />
    )
}

const sortItmeList = [
    { show: '时间降序', value: 't_dom' },
    { show: '时间升序', value: 't_up' },
    { show: '随机', value: 'random' },
]

@inject(stores => ({
    changeCleanModal: stores.store.changeCleanModal
}))
class ToolBox extends React.PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            sortVal: props.defaultSort,
            typeVal: props.defaultType,
            stateVal: props.defaultState,
        }
    }
    
    handleChange = (key, value, cb = () => {}) => {
        this.setState({
            [key]: value
        }, () => {
            cb();
        })
    }

    handleChangeSort = (event, value) => {
        this.handleChange('sortVal', value)
    }

    handleChangeState = (event, value) => {
        this.handleChange('stateVal', value)
    }

    handleChangeType = (value) => () => {
        let {typeVal} = this.state;
        let result = [...typeVal];

        if (result.includes(value)) {
            let index = result.indexOf(value);
            result.splice(index, 1);
        } else {
            result.push(value);
        }

        this.handleChange('typeVal', result, () => {
            result = null;
        });
    }

    handleMakeSure = () => {
        let {setParentProps, changeCleanModal} = this.props;
        let {sortVal: sort, typeVal: type, stateVal: state} = this.state;

        setParentProps({
            sort,
            type,
            state,
        });

        changeCleanModal(true);
    }

    render () {
        let {sortVal, typeVal, stateVal} = this.state;

        return (
            <FormControl className={mStyle['tool-box-root']}>
                <div className={mStyle['tool-box-btns']}>
                    <Button variant="contained" size="small" color="primary" onClick={this.handleMakeSure}>确认</Button>
                </div>
                <Query query={getAllComicType}>
                    {({data}) => {
                        let {state, type} = data.allComicTypeList;
                        return (
                            <div className={mStyle["tool-box"]}>
                                <ExpansionCard header={(<SortHeader />)} content={(
                                    <RadioGroup value={sortVal} onChange={this.handleChangeSort} 
                                        row={true} className={mStyle['tool-group']}>
                                        {
                                            sortItmeList.map(o => (
                                                <FormControlLabel
                                                    key={o.value}
                                                    control={(<Radio />)}
                                                    label={o.show}
                                                    value={o.value}
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                )} actions={null} defaultExpanded={!!sortVal} />

                                <ExpansionCard header={(<StateHeader />)} content={(
                                    <RadioGroup value={stateVal} onChange={this.handleChangeState}
                                        row={true} className={mStyle['tool-group']}>
                                        {
                                            Array.isArray(state) && state.filter(v => v).map(s => (
                                                <FormControlLabel
                                                    key={s}
                                                    control={
                                                        <Radio />
                                                    }
                                                    label={s}
                                                    value={s}
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                )} actions={null} defaultExpanded={!!stateVal} />

                                <ExpansionCard header={(<TypeHeader />)} content={(
                                    <FormGroup row={true} className={mStyle['tool-group']}>
                                        {
                                            Array.isArray(type) && type.map(t => (
                                                <FormControlLabel
                                                    key={t}
                                                    control={
                                                        <Checkbox
                                                        checked={typeVal.includes(t)}
                                                        onChange={this.handleChangeType(t)}
                                                        value={t}
                                                        />
                                                    }
                                                    label={t}
                                                />
                                            ))
                                        }
                                    </FormGroup>
                                )} actions={null} defaultExpanded={typeVal.length > 0}/>
                            </div>
                        );
                    }}
                </Query>
            </FormControl>
        )
    }
};

ToolBox.propTypes = {
    setParentProps: PropTypes.func,
    defaultSort: PropTypes.string,
    defaultState: PropTypes.string,
    defaultType: PropTypes.array,
};
ToolBox.defaultProps = {
    setParentProps: () => {},
    defaultSort: 't_dom',
    defaultState: '',
    defaultType: []
};

export default ToolBox;