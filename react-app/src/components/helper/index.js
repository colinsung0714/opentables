const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const userTime = new Date().toLocaleString("en-US", { timeZone: userTimeZone })

export const today = new Date(userTime)

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
    let phoneParts = phone?.split('-')
    if(phoneParts) {
    if (phoneParts[0]?.length !== 3 || phoneParts[1]?.length !== 3 || phoneParts[2]?.length !== 4) return true
    for (let num of phoneParts) {
        if (isNaN(num)) return true
    }
    if (phone[0] === '-' || phone[phone.length - 1] === '-' || phoneParts.length !== 3 || phone.length !== 12) {
        return true
    }
    return false
}
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

    const hourNow = today.getHours()
    const minNow = today.getMinutes()
  
    if (minNow >= 30) {
        for (let i = 0; i < ((hourNow * 2 + 1) + 1) * 30; i += 30) {
            const newTime = new Date(newDate.getTime() + i * 60 * 1000)

            res.push(newTime.toString().split(' ')[4].slice(0, 5))

        }
    } else {

        for (let i = 0; i < (hourNow * 2 + 1) * 30; i += 30) {
            const newTime = new Date(newDate.getTime() + i * 60 * 1000)

            res.push(newTime.toString().split(' ')[4].slice(0, 5))

        }
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
    return list?.sort((a, b) => {

        const aTime = new Date(a.createAt).getTime()
        const bTime = new Date(b.createAt).getTime()

        if (aTime > bTime) return -1
        if (bTime > aTime) return 1
        return 0
    })
}

export const convertIntMonthtoStringMonth = month => {
    switch (Number(month)) {
        case 1:
            return 'January'
        case 2:
            return 'Feburary'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
        default:
            return;
    }
}

export const dateCalculatortoString = (targetDate) => {
    const today = new Date().toLocaleDateString()
    const todayParts = today.split('/')
    const todayMonth = todayParts[0]
    const todayDay = todayParts[1]
    const todayYear = todayParts[2]

    const visitedDay = new Date(targetDate).toLocaleDateString()

    const visitedDayParts = visitedDay.split('/')
    const visitedDayMonth = visitedDayParts[0]
    const visitedDayDay = visitedDayParts[1]
    const visitedDayYear = visitedDayParts[2]


    if (todayDay === visitedDayDay && todayMonth === visitedDayMonth && todayYear === visitedDayYear) return 'Dined today'
    else if (todayDay !== visitedDayDay && todayMonth === visitedDayMonth && todayYear === visitedDayYear) {
        if (Number(todayDay) - Number(visitedDayDay) === 1) return `Dined yesterday`
        else return `Dined ${Number(todayDay) - Number(visitedDayDay)} days ago`
    }
    else {
        return `Dined on ${convertIntMonthtoStringMonth(visitedDayMonth)} ${visitedDayDay}, ${visitedDayYear}`
    }

}

export const sortHighest = list => {
    return list?.sort((a, b) => {
        const aRating = a.rating
        const bRating = b.rating

        if (aRating > bRating) return -1
        if (bRating > aRating) return 1
        return 0
    })
}


export const sortLowest = list => {
    return list?.sort((a, b) => {
        const aRating = a.rating
        const bRating = b.rating

        if (aRating > bRating) return 1
        if (bRating > aRating) return -1
        return 0
    })
}

export const filterMenuTypeNumber = list => {
    const total_menuType = []

    for (let item of list) {
        if (total_menuType.indexOf(item.item_type) < 0) total_menuType.push(item.item_type)
    }
    return total_menuType
}

export const sameTypeMenuList = (menuType, list) => {
    const sameTypeMenu = list?.filter(item => item.item_type === menuType)
    return sameTypeMenu
}

export const priceDigitChecker = (menus) => {
    for (let menu of menus) {
        const price = menu?.price
        const priceParts = price.split('.')
        const digit = priceParts[1]
        const integer = priceParts[0]
        if (digit?.length > 2 || integer.length > 4) return true
    }
    return false
}

export const sumAllPhotos = (restaurant, reviewList) => {
    const res = []
    if( restaurant.restaurantImages?.length) {
        for(let img of restaurant.restaurantImages) {
            res.push(img)
        }
    }
 
    for(let review of reviewList) {
        if(review.reviewImages?.length) {
            for(let reviewImage of review.reviewImages) {
                res.push(reviewImage)
            }
        }
    }
 
    return res
}

export const anHourMapper = (list, time) =>{
    const timeIndex = list?.indexOf(time)
    const newList = list?.slice(timeIndex, timeIndex+3)
    return newList
}