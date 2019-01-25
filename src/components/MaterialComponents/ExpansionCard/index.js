import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * 可收起卡片
 * @class ExpansionCard
 * @prop {Boolean} defaultExpanded [=false]
 * @prop {Node} expand
 * @prop {Node} header
 * @prop {Node} content
 * @prop {Node} actions
 */
function ExpansionCard(props) {
    let { expand, header, content, actions, defaultExpanded } = props;

    return (
        <ExpansionPanel defaultExpanded={defaultExpanded}>
            <ExpansionPanelSummary expandIcon={expand}>
                {header}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {content}
            </ExpansionPanelDetails>
            {
                actions ? (
                    <ExpansionPanelActions>
                        {actions}
                    </ExpansionPanelActions>
                ) : null
            }   
        </ExpansionPanel>
    );
}

ExpansionCard.propTypes = {
    defaultExpanded: PropTypes.bool,
    expand: PropTypes.node,
    header: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    actions: PropTypes.node,
}
ExpansionCard.defaultProps = {
    defaultExpanded: false,
    expand: (<ExpandMoreIcon />),
    header: (<Typography>标题</Typography>),
    content: (<Typography>内容</Typography>),
    actions: (<Typography>操作</Typography>)
}

export default ExpansionCard;