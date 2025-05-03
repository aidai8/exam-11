import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Products from "./features/products/Products.tsx";
// import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
// import {useAppSelector} from "./app/hooks.ts";
// import {selectUser} from "./features/users/usersSlice.ts";


const App = () => {
    // const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Products/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        {/*<Route path="/posts/:id" element={<FullProduct>}/>*/}

                        {/*<Route path="/products/new" element={*/}
                        {/*    <ProtectedRoute isAllowed={Boolean(user)}><NewProduct/></ProtectedRoute>*/}
                        {/*}/>*/}

                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
