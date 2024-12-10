
import React, { useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { Transfer } from './Transfer';

export const SendMoney = () => {
    const [searchparams] = useSearchParams();
    const UserId = searchparams.get("id");
    const userName = searchparams.get("name");
    const [amount, setamount] = useState("");
    const  [loader,setloader]=useState(false)

const navigate=useNavigate()
    const handelTrasfer= async()=>{
        setloader(true)

        if(!amount || isNaN(amount)){
           console.log("please enter a valid amount")
            return
        }

        try{
            const  response =  await Transfer(UserId,amount)
            if(response.success === true){
                setTimeout(()=>{
                    setloader(false)
                    navigate("/transfer-succesfull", { state: { transaction: response.transaction } });
                },1000)
                
            }else{
                setloader(false)
                navigate("/transfer-failed",{state:{transaction:response.transaction ,  error: response.msg}})
            throw new Error(response.message|| "transfer failed")
            }

        }catch(error){
            setloader(false);
            console.error("Error during transfer:", error.message || error);
            navigate("/transfer-failed",{state:{error:error.message}})
        }

    }

    return (
        <>
        <h1>Send money</h1>
            <h3> {userName[0].toUpperCase()} {userName} </h3>
                <p> Amount ( in RS)</p>
        <input placeholder='enter the amount' onChange={(e) => { setamount(e.target.value) }} />
            
        <button onClick= {handelTrasfer} disabled={loader}>Initiate transfer</button>
       {loader && loadingComponent()}
        </>
    )
}


function loadingComponent(){
    return <div style={{ marginTop: "20px" }}>
          <p>Processing your transfer...</p>
          <div
            className="loader"
            style={{
              width: "30px",
              height: "30px",
              border: "4px solid #ccc",
              borderTop: "4px solid #007BFF",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
}