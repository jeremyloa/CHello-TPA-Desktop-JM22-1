import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Workspace from "./Workspace"
import Board from "./Board"
export default function Main(){
    return(
        <Routes>
            <Route exact path="home" element={<Home/>}></Route>
            <Route exact path="workspace/:id" element={<Workspace/>}></Route>
            <Route exact path="board/:id" element={<Board/>}></Route>
        </Routes>
    )
}