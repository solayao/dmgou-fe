import React from 'react';
import shortid from 'shortid';
import Proptypes from 'prop-types';
import Query from '@gql/Query';
import {getOneDayCommend} from '@/query';
import NoWrapTypography from '@mui/NoWrapTypography';
import {Link} from 'react-router-dom';

const loadingProps = {
    avatar: false,
    title: false,
}

function OneDayCommend(props) {
    return (
        <Query query={getOneDayCommend} variables={{keys: props.qList}}
            loadingType="s" loadingProps={loadingProps}>
            { ({data}) => {
                return (
                    <div className="Dui-home-doc">
                        {
                            data.oneDayCommend.map(comic => (
                                <Link key={shortid.generate()}
                                    to={{
                                        pathname: '/detail',
                                        search: `cn=${encodeURIComponent(comic.name)}`
                                    }}>
                                    <NoWrapTypography>{`[${comic.type}] ${comic.name}`}</NoWrapTypography>
                                </Link>
                            ))
                        }
                    </div>
                );
            } }
        </Query>
    );
}

OneDayCommend.propTypes = {
    qList: Proptypes.array
};

export default OneDayCommend;
