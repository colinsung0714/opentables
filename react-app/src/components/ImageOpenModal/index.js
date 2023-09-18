import React from "react";

import '../ImageOpenModal/ImageOpenModal.css'

export const ImageOpenModal = (url) => {
    return (
        <div style={{width:"500px", height:"500px", borderRadius:"10px"}}>
            <img style={{width:"500px", height:"500px", borderRadius:"10px"}} src={url.url}/>
        </div>
    )
}