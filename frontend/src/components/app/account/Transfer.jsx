import axios from 'axios'
import React from 'react'

export const Transfer = async(to,amount) => {

    try{

        const response= await axios.post("http://localhost:3000/app/v1/account/transfer",
        {
            to:to,
            amount:amount
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("authtoken")}`
            }
        })

      return response.data;
    }catch(err){
        return err
    }

}
