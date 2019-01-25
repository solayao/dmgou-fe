import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mStyles from "../index.module.scss";
import LozadWrapper from '../../DizzyComponents/LozadWrapper';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Fragment = React.Fragment;

function HeaderComponent(header) {
    return header
        ? <CardHeader {...header}/>
        : null;
}

function MediaComponent(media) {
    // const defaultClasses = {   root: 'Dui-cm-media', }; return media ? <CardMedia
    // classes={defaultClasses}   image={media.image}   title={media.title}
    // className={classNames(media.className)} /> : null;
    return media
        ? <LozadWrapper
            classes={mStyles["mc-cm-media"]}
            src={media.image}
            srcset={media.srcset}
            alt={media.title}
            imgErrCB={media.imgErrCB} />
        : null;
}

function ContentComponent(content) {
    return content
        ? <CardContent>{content.children}</CardContent>
        : null;
}

function ActionsComponent(actions) {
    return actions
        ? <CardActions>{actions.children}</CardActions>
        : null
}

// override样式
const caaClasses = {
    root: mStyles['mc-caa-root']
};
/**
 * 媒体卡片
 * @prop {String} layout
 * @prop {Object} header
 * @prop {Object} media
 * @prop {Object} content
 * @prop {Object} actions
 * @returns
 */
function MediaCard(props) {
    // 参数
    let {layout, header, media, content, actions} = props;
 
    // 控件渲染
    return (
        <Card className={mStyles["mc-root"]}>
            <CardActionArea classes={caaClasses} className={classNames(mStyles[layout])}>
                {HeaderComponent(header)}
                {MediaComponent(media)}
                {ContentComponent(content)}
            </CardActionArea>

            {ActionsComponent(actions)}
        </Card>
    );
}

MediaCard.propTypes = {
    layout: PropTypes.string, // 布局， default/img-left/img-right
    header: PropTypes.object, // 头部元素
    media: PropTypes.object, // 媒体元素
    content: PropTypes.object, // 内容元素
    actions: PropTypes.object, // 操作元素
};
MediaCard.defaultProps = {
    layout: 'default',
    header: {
        // avatar: '头像', action: '操作',
        title: 'Shrimp and Chorizo Paella',
        subheader: 'September 14, 2016'
    },
    media: {
        image: process.env.PUBLIC_URL + '/images/contemplative-reptile.jpg',
        title: '图片备注'
    },
    content: {
        children: (
            <Typography
                component="p"
                style={{
                    fontSize: 16
                }}>
                This impressive paella is a perfect party dish and a fun meal to cook together
                with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
        )
    },
    actions: {
        children: (
            <Fragment>
                <Button
                    size="small"
                    color="primary"
                    style={{
                        fontSize: 16
                    }}>
                    Share
                </Button>
                <Button
                    size="small"
                    color="primary"
                    style={{
                        fontSize: 16
                    }}>
                    Learn More
                </Button>
            </Fragment>
        )
    }
}

export default MediaCard;