import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AdminNavbar from "./AdminNavbar"
import Adminhero from './Adminhero'
// import AddJob from './AddJob'

const AdminHome = () => {
  return (
    <div>
        <AdminNavbar/>
        {/* <p className='mt-32 font-bold text-purple-700'>hello i am admin homepage</p> */}
        <Adminhero />
        {/* <AddJob /> */}
        
      
    </div>
  )
}

export default AdminHome
