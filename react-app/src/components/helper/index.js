export const today = new Date()

const newDate = new Date(today.getFullYear(), today.getMonth(), today.getDay(), 0, 0) 

export const selectionMapper = () => {
    const res =[]
    for(let i = 0 ; i < 48*30; i += 30) {
        const newTime = new Date(newDate.getTime()+i*60*1000)
        
           res.push(newTime.toString().split(' ')[4].slice(0,5))
        
    }
    return res
}

export const phoneValidate = phone => {
    let phoneParts = phone.split('-')
    for (let num of phoneParts) {
        if (isNaN(num)) return true
    }
    return false
}

export const upcomingReservations = reservations => {
    const res = []
    for(let reservation of reservations) {
        const reservationTime = new Date(reservation.reservationDate)
        if(today.getTime() < reservationTime.getTime()) {
            res.push(reservation)
        }
    }
    return res
}

export const pastReservations = reservations => {
    const res = []
    for(let reservation of reservations) {
        const reservationTime = new Date(reservation.reservationDate)
        if(today.getTime() >= reservationTime.getTime()) {
            res.push(reservation)
        }
    }
    return res
}

export const convertTimetoString = datetime => {
    const stringTime = new Date(datetime)
    return stringTime.toString()
}