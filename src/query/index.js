import gql from 'graphql-tag';

export const cacheRedirects = {
    
};

export const getHomeComicList = gql`
    query getHomeComicList($type: String!) {
        comicList(type: $type) {
            name
            icon
            last
        }
    }
`;

export const getComicDetail = gql`
    query getComicDetail($name: String!) {
        comicDetail(name: $name) {
            id
            name
            description
            author
            icon
            state
            type
            last
            lastUpdate
            mainChapter {
                id
                name
            }
            otherChapter {
                id
                name
            }
        }
    }
`;

export const getChapterGallery = gql`
    query getChapterGallery($id: String!) {
        chapterDetailGallery(id: $id) {
            name
            imgList
        }
    }
`;

export const getAllComicType = gql`
    query getAllComicType {
        allComicTypeList {
            state
            type
        }
    }
`;

export const getSearchComicList = gql`
    query searchComic($kv: String!, $id: String, $no: Int, $size: Int, $pageType: Int, $sort: String) {
        searchComicList(kv: $kv, id: $id, no: $no, size: $size, pageType: $pageType, sort: $sort) {
            result {
                id
                author
                name
                icon
                last
                type
                state
                lastUpdate
            }
            page {
                total
                no
            }
        }
    }
`;

export const getOneDayCommend = gql`
    query getOneDayCommend ($keys: [String]) {
        oneDayCommend (keys: $keys) {
            id
            icon
            author
            name
            type
            state
            description
        }
    }
`;

export const getNotice = gql`
    query getNotice {
        getNotice
    }
`;

export const getComicListByName = gql`
    query getComicListByName ($name: String!) {
        comicListByName (name: $name) {
            id
            name
        }
    }
`;