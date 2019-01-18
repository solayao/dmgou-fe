import React from 'react';
import mStyles from './index.module.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplitOutlined';
import Fab from '@material-ui/core/Fab';
import PopperModel from '@mui/PopperModel';
import BackTopModel from '@antd/BackTopModel';

const RandomRead = React.lazy(() => import('./part/randomRead'));
const TodayCommend = React.lazy(() => import('./part/todayCommend'));
const TodayUpdate = React.lazy(() => import('./part/todayUpdate'));

const menuList = [
    { key: 'tu', title: '今日更新' },
    { key: 'tc', title: '今日推荐' },
    { key: 'rr', title: '随机看看' },
]

const MenuNode = (handleClick) => (
    <List>
        {menuList.map(m => (
            <ListItem button onClick={handleClick(m.key)}>{m.title}</ListItem>
        ))}
    </List>
)

function FabModel () {
    return (
        <Fab color="primary" aria-label="菜单">
            <VerticalSplitIcon />
        </Fab>
    )
}

class HomePhone extends React.PureComponent {
    state = {
        active: 'tu',   // tu, tc, rr
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
                <PopperModel
                    btnNode={(<FabModel />)}
                    popNode={MenuNode(this.handleSelect)}
                    positionTop="50"
                    popPlacement="right"
                />
                <BackTopModel />
                {active === 'tu' && <TodayUpdate />}
                {active === 'tc' && <TodayCommend />}
                {active === 'rr' && <RandomRead />}
            </React.Fragment>
        );
    }
}

export default HomePhone;