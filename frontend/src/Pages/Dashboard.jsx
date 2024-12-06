import React from "react";
import Appbar from "../components/app/account/Appbar";
import { Users } from "../components/app/account/Users";
import { Balance } from "../components/app/account/Balance";

const Dashboard = () => {

return(
<>
<Appbar/>
<Users/>
<Balance/>
</>
)

}

export default Dashboard;
