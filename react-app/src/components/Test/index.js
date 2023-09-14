import React from "react";

export const Test = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
   
    const test1 = new Date().toLocaleString('en-US',{timeZone:`${timeZone}`})
    const test2 = new Date().toLocaleString()
    const test3 = new Date().toUTCString()
    const test4 = new Date(test3).toString()
    const test5 = new Date(test1)
    return (
        <div>
            <h1>{timeZone}</h1>
            <h1>{`test1:${test1}`}</h1>
            <h1>{`test2:${test2}`}</h1>   
            <h1>{`test3:${test3}`}</h1>
            <h1>{`test4:${test4}`}</h1> 
            <h1>{`test4:${test5}`}</h1>   
                   
        </div>
    )
}