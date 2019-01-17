import React from 'react';
import mStyles from './index.module.scss';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const RandomRead = React.lazy(() => import('./part/randomRead'));
const TodayCommend = React.lazy(() => import('./part/todayCommend'));
const TodayUpdate = React.lazy(() => import('./part/todayUpdate'));

const menuList = [
    { key: 'tu', title: '今日更新' },
    { key: 'tc', title: '今日推荐' },
    { key: 'rr', title: '随机看看' },
]

class HomePhone extends React.PureComponent {
    constructor (props) {
        super (props);
        this.state = {
            active: 'tu',   // tu, tc, rr
        }
    }

    handleSelect = (key) => () => {
        this.setState({
            active: key
        })
    }

    render() {
        let { active } = this.state;
        return (
            <React.Fragment>
                {active === 'tu' && <TodayUpdate />}
                {active === 'tc' && <TodayCommend />}
                {active === 'rr' && <RandomRead />}
            </React.Fragment>
        );
    }
}

export default HomePhone;