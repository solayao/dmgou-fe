/**
 * @description 全局修改Material的Theme
 * @url https://material-ui.com/customization/themes/
 */
export default {
    palette: {
        primary: {
          light: '#F6FF9A',
          main: '#FFEB3B',
          contrastText: '#000000',
        },
    },
    typography: {
        useNextVariants: true,
        caption: {
            fontSize: 10,
        },
        body2: {
            fontSize: 12,
        },
        body1: {
            fontSize: 12,
        },
        button: {
            fontSize: 12,
        },
        subtitle2: {
            fontSize: 14,
        },
        subtitle1 : {
            fontSize: 16,
        },
        h6: {
            fontSize: 18,
        },
        h5: {
            fontSize: 21,
        },
        h4: {
            fontSize: 30,
        },
        h3: {
            fontSize: 40,
        },
        h2: {
            fontSize: 49,
        },
        h1: {
            fontSize: 98,
        }
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: 14,
            }
        },
        MuiInput: {
            root: {
                fontSize: 16,
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: 16,
            }
        },
        MuiOutlinedInput: {
            root: {
                fontSize: 16,
            }
        },
        MuiInputBase: {
            root: {
                fontSize: 16
            }
        },
        MuiExpansionPanelDetails: {
            root: {
                '&>*': {
                    flex: 1,
                    overflow: 'hidden'
                }
            }
        },
        MuiTab: {
            labelIcon: {
                minHeight: '50px'
            }
        },
        MuiDrawer: {
            paper: {
                background: '#FFF7B0',
            }
        }
    }
}