import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Balance = () => {
    const [balance, setbalance] = useState("")
const [error,seterror]=useState("")
    useEffect(() => {

        const fetchbalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/app/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authtoken")}`
                    }
                })

                if(response.status==200){
                    setbalance(response.data.balance)
                }
            } catch (err) {
                seterror(err.response?.data?.error || "an error occurred")
            }
        }
    fetchbalance()
    }, [])

    return (
        <>
        <h3>your balance = {balance}</h3>
        <p style={{color:"red"}}>{error}</p>
        </>
    )
}
