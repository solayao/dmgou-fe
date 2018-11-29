import gql from 'graphql-tag';

export default gql`
query getUser {
    users {
        id
        name
    }
}
`;
