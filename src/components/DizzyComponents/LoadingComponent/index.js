import React from 'react';
import Proptypes from 'prop-types';
import './style.css';

/**
 * Loading控件
 * @class LoadingComponent
 * @prop {String} moduleType ['ball-spin-fade-loader' | 'line-scale' | 'ball-beat' | 'ball-scale-multiple']
 * @prop {Number} nullDivNum
 * @extends {Component}
 */
function LoadingComponent (props) {
    let nullDivNum;
    switch (props.moduleType) {
        case 'ball-spin-fade-loader': {
            nullDivNum = props.nullDivNum || 8;
            break;
        }
        case 'line-scale': {
            nullDivNum = props.nullDivNum || 5;
            break;
        }
        case 'ball-beat': 
        case 'ball-scale-multiple': 
        default: {
            nullDivNum = props.nullDivNum || 3;
        }
    }
    /**
     * 生成loading需要的空白DIV
     * 
     * @memberof LoadingComponent
     */
    const nullDiv = () => {
        let arr = [],
            num = nullDivNum;
        while (num > 0) {
            arr.push(<div key={num} />);
            num--;
        }
        return arr;
    };

    return (
        <div className="Dui-loading-default">
            <div className={`${props.moduleType}`}>
                {nullDiv()}
            </div>
        </div>
    )
}

LoadingComponent.propTypes = {
    moduleType: Proptypes.string,
    nullDivNum: Proptypes.number,
};
LoadingComponent.defaultProps = {
    moduleType: 'ball-beat',
};
export default LoadingComponent;
