import React from 'react';
import {Link,useNavigate} from 'react-router-dom'

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout=()=>{
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div className='header'>
            <ul className='nav-ul'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {
                    auth ?<li><Link  onClick={logout} to="/signup">Logout</Link></li>
                    :<>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}
export default Nav;