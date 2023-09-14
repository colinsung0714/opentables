import React, { useState, useEffect } from "react";
const moment = require('moment-timezone');

export const Test = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [userTime, setUserTime] = useState('');

    useEffect(() => {
        displayTimeInUserTimezone();
    }, []);

    function detectUserTimezone() {
        const userTimezoneOffset = new Date().getTimezoneOffset();
        const timezoneIdentifier = moment.tz.guess(); 
        return timezoneIdentifier;
    }

    function displayTimeInUserTimezone() {
        const userTimezone = detectUserTimezone();
        const nowInUserTimezone = moment.tz(userTimezone);
        const formattedTime = nowInUserTimezone.format('YYYY-MM-DD HH:mm:ss');
        setUserTime(formattedTime);
        console.log(`Time in User's Timezone: ${formattedTime}`);
    }

    const test1 = new Date().toLocaleString('en-US', { timeZone: timeZone });
    const test2 = new Date().toLocaleString();
    const test3 = new Date().toUTCString();
    const test4 = new Date(test3).toString();
    const test5 = new Date(test1);

    return (
        <div>
            <h1>{timeZone}</h1>
            <h1>{`test1:${test1}`}</h1>
            <h1>{`test2:${test2}`}</h1>
            <h1>{`test3:${test3}`}</h1>
            <h1>{`test4:${test4}`}</h1>
            <h1>{`test5:${test5}`}</h1>
            <h1>{`User's Timezone: ${userTime}`}</h1>
        </div>
    );
}