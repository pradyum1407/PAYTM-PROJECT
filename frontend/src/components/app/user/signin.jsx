import React from 'react'
import axios from 'axios'

export const signinform = async(data) => {
try{
    const response= await axios.post("http://localhost:3000/app/v1/user/signin",{
    username:data.username,
    password:data.password
})
return response.data
}catch(err){
    throw(err)
}
}
