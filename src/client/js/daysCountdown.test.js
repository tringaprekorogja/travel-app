import {daysCountdown} from './daysCountdown';


test ('check if daysCountdown returns the exact num of days', ()=> {
    const tripDate = new Date('2020-04-21').getTime()
    const now = new Date().getTime()
    const t = tripDate - now
    const expectedDays = Math.floor(t / (1000 * 60 * 60 * 24)) + 1;
    const result = daysCountdown(tripDate)
    expect(result).toBe(expectedDays);
})