import React,{useContext} from 'react'
import {MyContext} from '../../contexts/CashContext'

const CashClose = () => {

    const context = useContext(MyContext)

    return(
        <div>
            Las ventas son {context.sales}
            El total es {context.total}
        </div>
    )
}

export default CashClose