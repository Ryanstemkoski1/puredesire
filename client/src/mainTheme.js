import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: "#1C94A8",
            neutral: "#4C4C4C"
        },
        secondary: {
            main: "#1A9182"
        },
        background: {
            default: "#ffffff"
        }
    },

    components: {

        MuiButton: {
            styleOverrides: {
                root:
                    ({ ownerState }) => ({
                    ...(ownerState.variant === 'contained' &&
                        ownerState.color === 'primary' && {
                            background: 'linear-gradient(to right, #1C94A8, #1A9182)',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                background: 'linear-gradient(to right, #0B6776, #0D6257)',
                            }
                        }),
                    ...(ownerState.variant === 'contained' &&
                        ownerState.color === 'secondary' && {
                            transition: 'background-image 0.5s linear',
                            background: 'linear-gradient(to right, #FCA659, #E85E40)',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                background: 'linear-gradient(to right, #E85E40, #E85E40)',
                            }
                        }),
                        ...(ownerState.variant === 'outlined' &&
                            ownerState.color === 'primary' && {
                                boxShadow: 'none',
                                border: '2px solid #1C94A8',
                                transition: '0.3s all',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                    background: '#1C94A8',
                                    border: '2px solid #1C94A8',
                                    color: '#ffffff'
                                }
                            })
                }),
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: 'auto',
                    fontSize: '15px',
                    lineHeight: '1',
                    fontFamily: 'Montserrat',
                    color: '#4C4C4C',
                    fontWeight: '500'
                }
            }
        },

        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fill: '#1A9182'
                }
            }
        },

        MuiBox: {
            styleOverrides: {
                root: {
                    background: '#ffffff'
                }
            }
        },

        MuiToolbar: {
            styleOverrides: {
                root: {
                    background: '#ffffff',
                    boxShadow: 'none',
                    textAlign: 'left',
                    color: '#707070',
                    padding: '0 70px 0 45px !important'
                }
            }
        },

        MuiList: {
            styleOverrides: {
                root: {
                    padding: '30px 0 30px',
                    color: '#4C4C4C',
                    fontWeight: '500',
                    fontSize: '15px'
                }
            }
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    svg: {
                        padding: '5px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        fontSize: '35px'
                    },
                    marginTop: '20px',
                    "&.Mui-selected": {
                        svg: {
                            fill: '#ffffff',
                            boxShadow: 'none',
                        },
                        background: 'linear-gradient(to right, #FCA659, #E85E40)',
                        borderRadius: '10px',
                    },
                    "&.Mui-focusVisible": {
                        svg: {
                            fill: '#ffffff',
                            boxShadow: 'none',
                        },
                        background: 'linear-gradient(to right, #FCA659, #E85E40)',
                        borderRadius: '10px'
                    },
                    ":hover": {
                        svg: {
                            fill: '#ffffff',
                            boxShadow: 'none',
                        },
                        background: 'linear-gradient(to right, #FCA659, #E85E40)',
                        borderRadius: '10px',
                        color: '#ffffff'
                    },
                },

            }
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    background: '#ffffff',
                    boxShadow: 'none',
                    borderRight: '0 !important',
                }
            }
        },

        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#EBEBEB'
                },
                bar: {
                    backgroundColor: '#4791FF'
                }
            }
        },

        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '50px 60px 0 30px !important',
                    ['@media (max-width: 767px)']: {
                        padding: '50px 14px !important'
                    }
                }
            }
        },


        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '2.5rem',
                    fontWeight: '500',
                    color: '#4C4C4C'
                },
                p: {
                    color: "#4C4C4C"
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: '18px',
                    fontWeight: '500',
                    padding: '45px 0'
                },
                head: {
                    fontSize: '16px',
                    padding: '15px 0'
                }
            }
        }
    },


    typography: {
        fontSize: 14,
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(','),
    }
});
