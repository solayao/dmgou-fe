import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mStyles from '../index.module.scss';
import shortid from 'shortid';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import LozadWrapper from '@/components/DizzyComponents/LozadWrapper';

const GridListTileBarClasses = {
    root: classNames(mStyles['Dui-gl-tilebar']),
    title: classNames(mStyles['Dui-gl-title'])
}
/**
 * 单行画廊
 * @param {*} props
 * @prop {Array} tileList [{img, title}]
 * @prop {Number} cols 显示多少张图片
 * @prop {Function} itemClick 点击画廊中的某图片,返回对应的title, (title)=>{}
 */
function RowGallery(props) {
    const { tileList, cols, itemClick } = props;
    function handleClickList (e) {
        let clickTitle = '';
        if (e.target.nodeName === 'IMG') {
            clickTitle = e.target.getAttribute('alt');
        } else {
            const eClasses = e.target.getAttribute('class');
            if (eClasses.includes('Dui-gl-title')) {
                clickTitle = e.target.innerHTML;
            }
            else if (eClasses.includes('MuiGridListTile-tile')) {
                clickTitle = e.target.children[0].getAttribute('alt');;
            }
        }
        itemClick(clickTitle);
    }
    
    return (
        <div className={mStyles["Dui-gl-root"]}>
            <GridList className={mStyles["Dui-gl"]} cols={cols} onClick={handleClickList}>
                {tileList.map(tile => (
                    <GridListTile key={shortid.generate()}>
                        <LozadWrapper src={tile.img} srcset={tile.srcset} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={GridListTileBarClasses}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

RowGallery.propTypes = {
    tileList: PropTypes.array.isRequired,
    cols: PropTypes.number,
    itemClick: PropTypes.func,
};
RowGallery.defaultProps = {
    tileList: [],
    cols: 2.5,
    itemClick: (title)=>{},
};

export default RowGallery;