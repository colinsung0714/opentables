export const today = new Date()

const newDate = new Date(today.getFullYear(), today.getMonth(), today.getDay(), 0, 0)

export const selectionMapper = () => {
    const res = []
    for (let i = 0; i < 48 * 30; i += 30) {
        const newTime = new Date(newDate.getTime() + i * 60 * 1000)

        res.push(newTime.toString().split(' ')[4].slice(0, 5))

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
    for (let reservation of reservations) {
        const reservationTime = new Date(reservation.reservationDate)
        if (today.getTime() < reservationTime.getTime()) {
            res.push(reservation)
        }
    }
    return res
}

export const pastReservations = reservations => {
    const res = []
    for (let reservation of reservations) {
        const reservationTime = new Date(reservation.reservationDate)
        if (today.getTime() >= reservationTime.getTime()) {
            res.push(reservation)
        }
    }
    return res
}

export const convertTimetoString = datetime => {
    const stringTime = new Date(datetime)
    return stringTime.toString()
}

export const convertIntDaytoStringDay = datetime => {
    switch (datetime.getDay()) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        default:
            return 'Saturday'
    }
}

export const normalizationListOfreservationDateTime = arr => {
    const ans = []
    for (let el of arr) {
        const date = new Date(el)
        ans.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString())
    }
    return ans
}

export const matchingDay = (timeList, target) => {
    const ans = []
    for (let el of timeList) {
        if (el === target) ans.push(el)
    }
    if (ans.length) return true
    else return false
}

export const filterTimeMatchDay = (reservationDates, targetDate) => {
    const ans = []
    const year = String(targetDate.getFullYear());
    const month = String(targetDate.getMonth() + 1).length === 1 ? `0${String(targetDate.getMonth() + 1)}` : String(targetDate.getMonth() + 1)
    const day = String(targetDate.getDate()).length === 1 ? `0${String(targetDate.getDate())}` : String(targetDate.getDate())
    const ansDate = year + '-' + month + '-' + day
    for (let el of reservationDates) {
        const elParts = el.split(' ')
        if (elParts[0] === ansDate) ans.push(elParts[1])
    }
    return ans
}

export const filterFinalList = (businessHourList, deleteArray) => {
    for (let el of deleteArray) {
        if (businessHourList.indexOf(el) >= 0)
            businessHourList.splice(businessHourList.indexOf(el), 1)
    }
    return businessHourList
}

export const convertTofullDateString = (year, month, day) => {
    return `${year}-${month}-${day}`
}

export const currentSelectionMapper = () => {
    const res = []

    for (let i = 0; i < (today.getHours() * 2 + 2) * 30; i += 30) {
        const newTime = new Date(newDate.getTime() + i * 60 * 1000)

        res.push(newTime.toString().split(' ')[4].slice(0, 5))

    }
    return res
}

export const dateformatConverter = (dateform, time) => {
    const year = dateform.getFullYear()
    const month = dateform.getMonth() + 1
    const date = dateform.getDate()
    return `${year}:${month}:${date}:${time}`
}

export const sortList = list => {
  return list.sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime()
        const bTime = new Date(b.createdAt).getTime()
      
        if(aTime > bTime) return -1
        if (bTime > aTime) return 1
        return 0
    })
}