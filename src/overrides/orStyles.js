import { fade } from '@material-ui/core/styles/colorManipulator';

export default (theme) => ({
    // App.js
    appBar: {
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    appPCHeader: {
        zIndex: theme.zIndex.drawer + 1
    },
    appFooter: {
        paddingTop: '10px!important',
        fontSize: '12px!important',
        height: '100px',
        textAlign: 'center!important',
        background: '#F6FF9A!important',
    },
    appPCContentShift: {
        marginLeft: theme.spacing.unit * 10,
    },
    appPCDrawerShift: {
        overflowX: 'hidden',
        width: theme.spacing.unit * 10
    },
    search: {
        position: 'absolute',
        border: '1px solid white',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        right: '20px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit,
          width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        right: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 150,
          '&:focus': {
            width: 250,
          },
        },
    },
    // DrawlerList
    listItemIcon: {
        marginLeft: '10px',
    },
    listItemText: {
        maxHeight: '21px',
    },
    // PhoneToolBar
    phoneSearch: {
        zIndex: theme.zIndex.drawer + 10
    },
    phoneInputRoot: {
        color: 'white',
        width: '100%',
        height: '58px'
    },
    phoneInputEle: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
});