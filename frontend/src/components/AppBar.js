import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailIcon from '@mui/icons-material/Mail';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HomeIcon from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useLocation } from 'react-router-dom';
import { logout } from '../api/slices/users';
import { useDispatch } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '45ch',
        },
    },
}));

export default function PrimarySearchAppBar(props) {

    const location = useLocation();
    const dispatch = useDispatch();
    const user = localStorage.getItem('user_info') ?
        JSON.parse(localStorage.getItem('user_info')) : null


    const navigate = useNavigate();
    const [keyword, setKeyword] = React.useState('')

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const searchHandler = (e) => {
        if (e.key === "Enter") {
            navigate(`/?keyword=${keyword}&page=1`);
        }

    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const work = (event) => {
        navigate("/blogsListScreen");
        handleMenuClose();
    }
    const userHandle = (event) => {
        navigate("/usersListScreen");
        handleMenuClose();
    }
    const logIn = (event) => {
        const des = window.location.pathname;
        console.log("des ", des);
        navigate("/signIn_screen", { state: des });
        // navigate("/signIn_screen");
        handleMenuClose();
    }
    const signUp_screen = (event) => {
        navigate("/signUp_screen");
        handleMenuClose();
    }
    const handle_logOut = (event) => {
        dispatch(logout())
        // navigate(location.pathname, { state: true });
        navigate('/')
        handleMenuClose();
    }
    const profile = (event) => {
        navigate("/profile");
        handleMenuClose();
    }
    const home = (event) => {
        navigate("/");
        handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >


            {
                !user ?
                    <>
                        <MenuItem onClick={logIn}>LogIn</MenuItem>
                        <MenuItem onClick={signUp_screen}>signUp_screen</MenuItem>
                    </>
                    : <>
                         <MenuItem onClick={profile}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <AccountBoxIcon />
                                </Badge>
                            </IconButton>
                            <p>profile</p>
                        </MenuItem>
                        {
                            user.isAdmin ? <>
                            <MenuItem onClick={work}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <LocalPostOfficeIcon />
                                </Badge>
                            </IconButton>
                            <p>post</p>
                        </MenuItem>
                        <MenuItem onClick={userHandle}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <SupervisedUserCircleIcon/>
                                </Badge>
                            </IconButton>
                            <p>user</p>
                        </MenuItem>

                            </> : null
                        }
                        <MenuItem onClick={handle_logOut}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <LogoutIcon />
                                </Badge>
                            </IconButton>
                            <p>log out</p>
                        </MenuItem>
                    </>

            }

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={home}>


                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge color="error">
                        <HomeIcon />
                    </Badge>
                </IconButton>
                <p>Home</p>
            </MenuItem>
            {/* <MenuItem>
            
            
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge  color="error">
                        <ContactSupportIcon />
                    </Badge>
                </IconButton>
                <p>Contact</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge color="error">
                        <InfoIcon />
                    </Badge>
                </IconButton>
                <p>About Me</p>
            </MenuItem> */}

            {/* <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Authentication</p>
            </MenuItem> */}
            {
                !user ?
                    <>
                        <MenuItem onClick={logIn}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <LoginIcon />

                                </Badge>
                            </IconButton>
                            <p>sign in</p>
                        </MenuItem>
                        <MenuItem onClick={signUp_screen}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <AccountBalanceWalletIcon />
                                </Badge>
                            </IconButton>
                            <p>join now</p>
                        </MenuItem>
                    </>
                    : <>
                        <MenuItem onClick={profile}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <AccountBoxIcon />
                                </Badge>
                            </IconButton>
                            <p>profile</p>
                        </MenuItem>
                        {
                            user.isAdmin ? <>
                            <MenuItem onClick={work}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <LocalPostOfficeIcon />
                                </Badge>
                            </IconButton>
                            <p>post</p>
                        </MenuItem>
                        <MenuItem onClick={userHandle}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <SupervisedUserCircleIcon/>
                                </Badge>
                            </IconButton>
                            <p>user</p>
                        </MenuItem>
                            </> :
                            null
                        }
                        <MenuItem onClick={handle_logOut}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge color="error">
                                    <LogoutIcon />
                                </Badge>
                            </IconButton>
                            <p>log out</p>
                        </MenuItem>
                    </>

            }
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="inherit">
                <Container>
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', color: 'inherit', textDecoration: 'none' } }}
                            component={Link} to="/"
                        >
                            ProgrammingLite

                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…."
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyPress={searchHandler}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {/* for theme */}
                            {props.display}

                            <IconButton size="small" aria-label="show 4 new mails" color="inherit" sx={{ mr: 1 }} component={Link} to="/">
                                <Badge >
                                    <HomeIcon />

                                </Badge>
                                <span>home</span>

                            </IconButton>



                            {
                                user ? <>
                                    <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        
                                         <Avatar sx={{width: 30, height: 30, bgcolor: deepPurple[500], mr: 0.5}} alt="Remy Sharp" src={`http://localhost:4000/${user.profile_pic}`} /> <span >hii {user.firstName}</span>
                                    </IconButton>
                                </> : <>
                                    <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={logIn}
                                        color="inherit"
                                    >
                                        <AccountBoxIcon />
                                        <span>sign in</span>
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={signUp_screen}
                                        color="inherit"
                                    >
                                        <AccountBalanceWalletIcon />
                                        <span>join now</span>
                                    </IconButton>
                                </>

                            }



                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            {/* for theme */}
                            {props.display}
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {renderMobileMenu}
            {renderMenu}

        </Box>
    );
}