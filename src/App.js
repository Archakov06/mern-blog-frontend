import Container from "@mui/material/Container";
import {Routes, Route} from 'react-router-dom';

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login, GridLesson} from "./pages";


function App() {

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
                    <Route path='/gridlesson' element={<GridLesson/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
