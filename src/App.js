import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchUserInfo } from './redux/slices/auth';
import { CircularProgress } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const isReady = useSelector((state) => state.auth.status) !== 'loading';

  React.useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  if (!isReady) {
    return (
      <center>
        <CircularProgress />
      </center>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<AddPost />} path="/posts/create" />
          <Route element={<AddPost />} path="/posts/:id/edit" />
          <Route element={<FullPost />} path="/posts/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Registration />} path="/register" />
        </Routes>
      </Container>
    </>
  );
}

export default App;
