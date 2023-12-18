import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {getAuthMe, selectIsAuth} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(getAuthMe());
    }, []);

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/posts/:id' element={<FullPost/>}/>
                    <Route path='/add-post' element={<AddPost/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Registration/>}/>
                </Routes>
            </Container>
        </>
    );
}


export default App;
