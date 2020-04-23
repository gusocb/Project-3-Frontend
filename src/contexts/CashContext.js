// import React, { createContext, useState } from 'react';

// const CashContext = createContext();

// const CashContextProvider = props =>{
//     const [contextState, setContextState] = useState({
//         sales:[],
//         total:0
//     })

//     return(
//         <CashContext.Provider value={{contextState,setContextState}}>
//             {props.children}
//         </CashContext.Provider>
//     )
// }


// export default CashContextProvider;

import {createContext} from 'react'

  const MyContext = createContext({
  sales: [{}],
  updateSales: () => {}
})
export {MyContext}



