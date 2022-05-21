import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import { FullPost } from "./pages/FullPost";
import { Home } from "./pages/Home";
import { AddPost } from "./pages/AddPost";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        {/*<FullPost />*/}
        {/*<AddPost />*/}
        {/*<Login />*/}
        {/*<Registration />*/}
      </Container>
    </>
  );
}

export default App;
