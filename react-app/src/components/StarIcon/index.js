import React from "react";

export const StarIcon = ({ avgRating }) => {
    if (avgRating <= 0.25) return (
        <div>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating > 0.25 && avgRating < 1) return (
        <div>
            <i className="fas fa-star-half-alt" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 1 && avgRating < 1.5) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 1.5 && avgRating < 2) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star-half-alt" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 2 && avgRating < 2.5) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 2.5 && avgRating < 3) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star-half-alt" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 3 && avgRating < 3.5) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 3.5 && avgRating < 4) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star-half-alt" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 4 && avgRating < 4.5) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="far fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
    else if (avgRating >= 4.5 && avgRating < 4.75) return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star-half-alt" style={{color:"#da3743"}}></i>
        </div>
    )
    else return (
        <div>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
            <i className="fas fa-star" style={{color:"#da3743"}}></i>
        </div>
    )
}