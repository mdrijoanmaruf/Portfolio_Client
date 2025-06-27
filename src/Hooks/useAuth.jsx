import { AuthContext } from "../Contexts/AUthContext/AuthContext"

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
}

export default useAuth;