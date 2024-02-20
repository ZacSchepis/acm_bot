// Discord Imports 
const { Client, GatewayIntentBits, Partials ,IntentsBitField, DiscordAPIError, PermissionsBitField } = require('discord.js');
const { ChannelType } = require('discord-api-types/v10');
const Discord = require('discord.js')
// imports from node
// const rp = require('request-promise');
var fs = require("fs");


let jobsIdx = 0
const jobsQueue = []
//Can you tell where memory might be leaking with this code?
const cron = require('node-cron');
const { Console } = require('console');
const { exit } = require('process');
const EventEmitter = require('events');
const event = new EventEmitter();
const EVENTS = {JOB_COMPLETE: 'JOB COMPLETE'}
//TODO: Add a job complete event
event.on(EVENTS.JOB_COMPLETE, ()=>{
    //Use some method to remove teh job from the stack
    if(jobsQueue.length === 0){
        return;
    }
    jobsQueue.shift().stop();

    // and then it is all good
})

const addCronJob = (cronExpression, jobFunction) =>{
    console.log(`Adding job for time: '${cronExpression}' to be queued.\n`)
    const cronJob = cron.schedule(cronExpression, ()=>{
        jobFunction();
        event.emit(EVENTS.JOB_COMPLETE);
        return;
    }, {timezone: 'America/Boise'})
    jobsQueue.push({ cronJob, jobIdx: jobsIdx++ })
    // jobsIdx++
    // jobsQueue.push({ cronExpression, jobFunction })
    // jobsQueue.sort((a,b) => a.executeTime - b.executeTime);
}





const executeJobs = ()=>{
    const currentTime = Date.now();
    jobsQueue.forEach((jobInfo)=>{
        const { cronExpression, jobFunction } = jobInfo;
        if(cron.schedule(cronExpression).next().isSameOrBefore(currentTime)){
            jobFunction();
        }
    })
}
const jobFu = () =>{
    console.log(jobsQueue, jobsQueue.length)
}
[1,2,3,4].map((ele)=>{
    addCronJob(`*/${4+(ele % 4)} * * * *`, ()=>{
        console.log(`This is a test job ${ele}`);
        jobFu();
    })
})


// executeJobs();