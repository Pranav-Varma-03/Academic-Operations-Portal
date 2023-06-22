import React from "react";

const Admin = ()=>{

    return( 
        <div className="container">
            <h2 className="center">Admin Page</h2>
            <div className="collection" >
                <a href="/studentlist" className="collection-item" style={{ color: "black" }}>Manage Students</a>
                <a href="/instructorlist" className="collection-item" style={{ color: "black" }}>Manage Instructors</a>
                <a href="/courselist" className="collection-item" style={{ color: "black" }}>Manage Courses</a>
            </div>
        </div>
    )
}   

export default Admin