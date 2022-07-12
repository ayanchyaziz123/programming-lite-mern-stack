import React, { useEffect } from 'react';
import store from './api/store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import BlogsListScreen from './screens/BlogsListScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import BlogAddScreen from './screens/BlogAddScreen';
import BlogEditScreen from './screens/BlogEditScreen';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import NotFoundPage from './components/NotFoundPage';
import Profile from './screens/auth/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { green, purple } from '@mui/material/colors';
import { GlobalStyles } from '@mui/material';
import EmailVerify from './screens/auth/EmailVerify';
import ForgetPasswordScreen from './screens/auth/ForgetPasswordScreen';
import PasswordVerify from './screens/auth/PasswordVerify';
import TimeAgo from 'javascript-time-ago'
import UsersListScreen from './screens/UsersListScreen';
import UserEditScreen from './screens/UserEditScreen';

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  
});

const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
});



const  App = () => {

  const dis = localStorage.getItem('theme');

  const [darkMode, setDarkMode] = React.useState(true);
  const set = () =>{
    if(darkMode)
    {
      setDarkMode(false);
      localStorage.setItem('theme', 'false');
    }
    else{
      setDarkMode(true);
      localStorage.setItem('theme', 'true');
    }
    
  }

  React.useEffect(() => {
    if(dis==='true')
    {
      setDarkMode(true);
    }
    else if(dis==='false'){
      setDarkMode(false);
    }
    else{
      setDarkMode(true);

    }
  }, [dis])

  const display = (
    <FormGroup>
      <FormControlLabel control={<Switch checked={darkMode ? false : true} color="secondary"/>} label={darkMode ? 'dark' : 'light'} onClick={set} />
    </FormGroup>
  );

  
  
  return (
    <Provider store={store}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: darkMode ? 'black': null }
        }}
      />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <React.Fragment>
      <CssBaseline />
     <BrowserRouter>
    
            <AppBar display={display}/>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact/>
      </Routes>
        <Routes>
            <Route path="/blogsListScreen" element={<BlogsListScreen />} />
        </Routes>
        <Routes>
            <Route path="/blogAddScreen" element={<BlogAddScreen />} />
        </Routes>
        <Routes>
            <Route path='/blogDetailScreen/:id' element={< BlogDetailScreen/>} />
        </Routes>
          <Routes>
            <Route path='/blogEditScreen/:id' element={<BlogEditScreen />} />
          </Routes>
          <Routes>
            <Route path='/signIn_screen' element={<SignInScreen/>} />
          </Routes>
          <Routes>
            <Route path='/signUp_screen' element={<SignUpScreen />} />
          </Routes>
          <Routes>
            <Route path='/forgetPassword_screen' element={<ForgetPasswordScreen />} />
          </Routes>
          <Routes>
            <Route path='/api/user/password/verify/:id/:token' element={<PasswordVerify />} />
          </Routes>
          <Routes>
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <Routes>
            <Route path='/api/user/verify/:id/:token' element={<EmailVerify />} />
          </Routes>
          <Routes>
            <Route path="/usersListScreen" element={<UsersListScreen />} />
        </Routes>
        <Routes>
            <Route path="/userEditScreen/:id" element={<UserEditScreen />} />
        </Routes>
          {/* <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes> */}
          
        <Footer/>
    </BrowserRouter>
    </React.Fragment>
      </ThemeProvider>

  </Provider>
    
  );
}

export default App;
