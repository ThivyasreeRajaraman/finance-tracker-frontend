import { Route, Routes } from "react-router-dom"
import Home from "../Home/HomeComponent"

function HomeRoute(){
    return <Routes>
        <Route index element={<Home/>} />
    </Routes>
}

export default HomeRoute