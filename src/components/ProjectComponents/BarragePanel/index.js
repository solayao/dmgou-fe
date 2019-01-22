import React from 'react';
import PropTypes from 'prop-types';
import mStyle from './index.module.scss';

class BarragePanel extends React.PureComponent {
    constructor (props) {
        super (props);

        this.root = React.createRef();

        this.canvas = React.createRef();

        this.timer = null;
    }

    componentDidMount () {
        let {barrageList} = this.props;

        let canvas = this.canvas.current;

        let ctx = canvas.getContext('2d');

        canvas.width = this.root.current.clientWidth;

        canvas.height = this.root.current.clientHeight;

        let width = canvas.width;
        //get color of all barrage
        let colorArr = this.getColor();
        //get the initial left for all barrage
        let numArrL = this.getLeft();
        //get the initial top for all barrage
        let numArrT = this.getTop();
        // get speed of all barrage
        let speedArr = this.getSpeed();

        this.timer = setInterval(() => {
            ctx.clearRect(0, 0, width, canvas.height);

            ctx.save();

            for(let j=0; j < barrageList.length; j++){
                numArrL[j] -= speedArr[j];

                ctx.fillStyle = colorArr[j]

                ctx.fillText(barrageList[j], numArrL[j], numArrT[j]);

                if(numArrL[j] <=- width){
                    numArrL[j] = width;
                }
            }

            ctx.restore();
        }, 15);
    }

    componentWillUnmount () {
        clearInterval(this.timer);

        this.canvas = this.timer = null;
    }

    getTop(){
        let {barrageList} = this.props;

        let canvas = this.canvas.current;

        let height = canvas.height;

        let len = barrageList.length;

        let arr = new Array(len).fill(1);

        return arr.map(() => {
            let tagHeight = Math.random() * height;

            if(tagHeight < 0.2*height){
                return 0.2*height
            }

            if(tagHeight > 0.8*height){
                return 0.8*height
            }

            return tagHeight
        });
    }

    getLeft(){
        let {barrageList} = this.props;

        let canvas = this.canvas.current;

        let width = canvas.width;

        let len = barrageList.length;

        return new Array(len).fill(width);
    }

    getColor(){
        let {barrageList} = this.props;

        let len = barrageList.length;

        //random color
        let arr = new Array(len).fill(1);
        return arr.map(() => {
          return '#'+Math.floor(Math.random()*0xffffff).toString(16);
        });
    }

    getSpeed(){
        let {barrageList} = this.props;

        let len=barrageList.length;

        //random speed
        let arr = new Array(len).fill(1);
        return arr.map(() => {
            return parseInt(Math.random() * 5)
        })
    }

    render () {
        return (
            <div className={mStyle['barrage-root']} ref={this.root}>
                <canvas className={mStyle['barrage-canvas']} ref={this.canvas}></canvas>
            </div>
        )
    }
}

BarragePanel.propTypes = {
    barrageList: PropTypes.array.isRequired,
};
BarragePanel.defaultProps = {
    barrageList: [
        'fdsfsdfsdfds',
        'fsdfdsfdsfdsffffff',
        '123',
        'jssoos',
        'sdfsjdflk',
        '时间段看雷锋精神的李开复'
    ]
};

export default BarragePanel;