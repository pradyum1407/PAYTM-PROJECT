import React, { useEffect, useState } from 'react';

const Appbar = () => {
  const [userInitial,setuserInitials]=useState("")
  
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))
    
    console.log(user);
    if(user && user.firstName)
    setuserInitials(
      user.firstName[0].toUpperCase()
    )

  },[])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f8f9fa' }}>
      <h3 style={{ margin: 0 }}>PayTM App</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <p style={{ margin: 0 }}>hello</p>
        <p style={{ margin: 0 }} >{userInitial}</p>
      </div>
    </div>
  );
};

export default Appbar;
