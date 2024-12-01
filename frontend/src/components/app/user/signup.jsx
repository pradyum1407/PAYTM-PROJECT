import React from 'react'
import axios from 'axios'

export const signupForm = async(Data) => {
 try {
    
     const response = await axios.post("http://localhost:3000/app/v1/user/signup",{
         username:Data.username,
         password:Data.password,
         firstName:Data.firstName,
         lastName:Data.lastName,
     })
     return response.data;
     
 } catch (error) {
    throw error
 }
}
