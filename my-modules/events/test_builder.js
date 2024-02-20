const {Event} = require('./event_builder.js')
// const {cron}
const { calcTime } = require('../google_calendar/calendar_test.js')
const cron = require("node-cron")





let jobsIdx = -1
let jobsQueue = []

const addCronJob = (cronExpression, timestamp, jobFunction) =>{
    console.log(`Adding job for time: '${cronExpression}' to be queued.`)
    const cronJob = cron.schedule(cronExpression, jobFunction, {timezone: 'America/Boise'})
    // console.log()
    jobsQueue.push({ cronJob, jobIdx: timestamp })
    // jobsIdx++
    // jobsQueue.push({ cronExpression, jobFunction })
    // jobsQueue.sort((a,b) => a.executeTime - b.executeTime);
}
const itsInThePast = (job) =>{
    return job.jobIdx <= Date.now()
}

const test = (time) =>{
    // console.log(`Adding job for time: ${Event.cronExpression(time)}`)
    let currentIdx = Date.now()
    console.log(Date.now() < time)
    addCronJob(Event.cronExpression(time), time, ()=>{
        // console.log(`Removing: ${currentIdx}`)
        // console.log(jobsQueue)
        // let currentIdx = jobsIdx
        // console.log(jobsQueue.filter((ele)=>ele.jobIdx !== currentIdx))
        // console.log(time)
        let toRemove = jobsQueue.filter((ele)=> itsInThePast(ele))
        console.log(`Removing job: ${toRemove}`)
        jobsQueue = jobsQueue.filter((ele) => !itsInThePast(ele))
        // jobsQueue = jobsQueue.filter((ele) => ele.jobIdx !== currentIdx)
        console.log(jobsQueue, jobsQueue.length)

    })
}
test(Date.parse(new Date())+calcTime.minute(1.5))
test(Date.parse(new Date())+calcTime.minute(3))
test(Date.parse(new Date())+calcTime.minute(4))
test(Date.parse(new Date())+calcTime.minute(5))
// jobsQueue.forEach((ele)=>{console.log(ele.jobIdx)})



// const currentTime = Date.parse(new Date())
// const cronTimeComp = [
//     {"value":"now", "time":Event.cronExpression(currentTime)},
//     {"value":"11 minutes before", "time": Event.cronExpression(currentTime - calcTime.minute(11))},
//     {"value":"11 hours before", "time": Event.cronExpression(currentTime - calcTime.hour(11))},
//     {"value":"11 days before", "time": Event.cronExpression(currentTime - calcTime.day(11))}
// ]
// console.log(cronTimeComp)

// const time_ = Date.parse(new Date()) + calcTime.day(1)
// const newEvent = Event.buildEvent(time_, 3, cb)
// console.log(newEvent.cronExpression, Event.cronExpression(time_ + calcTime.day(3) + calcTime.minute(30)) )
// console.log(newEvent)
// newEvent.callback()



/*
cron.schedule('00 07 * * 2,3', async ()=>{
    console.log("it's croning time")
    const {dunID} = require("./config.json")
    // const dunID = '294781978815889409'
    client.users.send(dunID, "Don't forget to bring your laptop before you leave town for work, and also your AirPods.").then(()=>{console.log(`Likely sent reminder to Dunya`)})
})
*/
// cron.schedule(newEvent.cronExpression, async ()=>{
//     // console.log('job executed')
//     if(newEvent.callback){
//         newEvent.callback()
//     }
// }, {timezone:'America/Boise'})


// cron.schedule('13 20 29 08 2', ()=>{
//     console.log('hard coded job hit')
// }, {timezone:'America/Boise'})

// cronJob.on('error', (err)=>{
//     console.log(err)
// })

