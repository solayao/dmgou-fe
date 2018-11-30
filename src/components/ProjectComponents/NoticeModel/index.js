import React from 'react';
import Proptypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ExpansionCard from '@mui/ExpansionCard';
import mStyles from './index.module.scss';

function NoticeModel(props) {
    const {title, children} = props;
    const header = (
        <Typography
            align="left"
            color="primary"
            variant="subtitle1"
            classes={{
                root: mStyles['Dui-notice-title']
            }}
            noWrap={true}>{title}</Typography>
    );
    const content = (
        <Typography align="left" variant="body2" component="div">{children}</Typography>
    )
    return (
        <ExpansionCard defaultExpanded={true}
            header={header} content={content} actions={null}
        ></ExpansionCard>
    )
}

NoticeModel.propTypes = {
    title: Proptypes.string.isRequired
};
NoticeModel.defaultProps = {
    title: '标题'
}

export default NoticeModel;
