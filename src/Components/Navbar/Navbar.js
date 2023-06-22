import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Navbar = () =>{

    const navigate = useNavigate();
    const ecookie = Cookies.get('User');
    const [role,setRole] = useState('');

    // console.log((parseInt(parseInt(ecookie)/10000)));
    // 1: student.
    //2: instructor.
    //3: admin.
    
    useEffect(() => {
        const parsedCookie = parseInt(parseInt(ecookie) / 10000);
        switch (parsedCookie) {
          case 1:
            setRole('student');
            break;
          case 2:
            setRole('instructor');
            break;
          case 3:
            setRole('admin');
            break;
          default:
            setRole(''); // Set a default value if the parsed cookie is not within expected values
        }
      }, [ecookie]);

    const hrefLink = "/" + role + "/" + parseInt(ecookie);
    const handleclick = (e) =>{
        e.preventDefault();
        
        Cookies.remove('User')
        //protected route.
        navigate('/login');
    }

    // console.log(hrefLink);

    return(
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <a href={hrefLink} className="brand-logo">IIT H</a>
                <ul className="right">
                    {/* <li><Link to="/">Home</Link></li> */}
                    <button onClick={handleclick} >Logout</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar