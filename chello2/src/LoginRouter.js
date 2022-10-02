import { useContext } from "react";
import { UserContext } from "./contexts/User"
const LoginRouter = ({ }) => {
    const {currUser} = useContext(UserContext)
    return (
        console.log("tes")
    )
};

export default LoginRouter