import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

export default function DefaultLayout(){
    const {token}=useStateContext()
    
    if(!token){
        return <Navigate to='/login'/>
    }else{
        return(
            <div>
            <aside>
                <Link to={'/users'}>Users</Link>
            </aside>
            <div>
                <header>
                    <div>header</div>
                    <div>User Info</div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
}