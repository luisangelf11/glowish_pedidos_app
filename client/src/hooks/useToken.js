import {useAuthContext} from '../context/authContext'

export const useToken=()=> {
    const {logout} = useAuthContext();
    const invalidToken =()=>{
        setTimeout(()=>{
            logout();
        }, 3000);
    }

    return {invalidToken}
}
