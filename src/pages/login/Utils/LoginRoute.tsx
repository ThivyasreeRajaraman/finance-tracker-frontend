import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../Login/LoginComponent"

function LoginRoute(){
    return <Routes>
        <Route index element={<Login/>} />
    </Routes>
}

export default LoginRoute