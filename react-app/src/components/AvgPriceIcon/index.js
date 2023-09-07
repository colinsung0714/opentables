import React from "react";

export const AvgPriceIcon = ({ avgPrice }) => {
    if (avgPrice === 1) return (
        <div>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign" style={{ color: '#d1d5d6' }}></i>
            <i className="fas fa-dollar-sign" style={{ color: '#d1d5d6' }}></i>
            <i className="fas fa-dollar-sign" style={{ color: '#d1d5d6' }}></i>
        </div>
    )
    else if (avgPrice === 2) return (
        <div>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign" style={{ color: '#d1d5d6' }}></i>
            <i className="fas fa-dollar-sign" style={{ color: '#d1d5d6' }}></i>
        </div>
    )
    else if (avgPrice === 3) return (
        <div>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign" style={{ color: '#d1d5d6' }}></i>
        </div>
    )
    else return (
        <div>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign"></i>
            <i className="fas fa-dollar-sign"></i>
        </div>

    )
}