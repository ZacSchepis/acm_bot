const fs = require("fs")
class ReminderStuff{
    constructor(){
        this.data = fs.readFileSync("/home/appsro/CodingStuff/ACM/my-modules/ReminderInfo.json")
        this.json = JSON.parse(this.data)
        this.status = this.getStatus();
        this.isSent = this.getIsSent();
    }
    getStatus(){
        return this.json.status;
    }
    getIsSent(){
        return this.json.isSent;
    }
    
    updateFile(){
        fs.writeFileSync("/home/appsro/CodingStuff/ACM/my-modules/ReminderInfo.json",JSON.stringify(this.json))
    }
    updateStatus(num){
        this.json.status = num;
        this.updateFile()
    }
    updateIsSent(bool){
        this.json.isSent = bool;
        this.updateFile();
    }
    canSend(day){
        console.log(day)
        if(day===3 && this.isSent === false){
            this.updateIsSent(true);
            this.updateStatus(0);
            return true;
        }
        if(day !== 3 && this.isSent === true){
            this.updateIsSent(false);
            this.updateStatus(0);
        }
        else return false;
    }
}
//let pat = new RegExp("[+](https://www.leetcode+)");
//let st = /[[\+]\(\^https:/\/\www.leetcode+)\]/
// console.log()
//console.log(st.test("[Stuff](https://leetcode.com/problems/network-delay-time/)"))
module.exports = { ReminderStuff }

/*

let temp = new ReminderStuff();
console.log(`Status : ${temp.getStatus()}\tIsSent : ${temp.getIsSent()}`);
temp.updateStatus(5);
temp.updateIsSent("th3e");
console.log(`Status : ${temp.getStatus()}\tIsSent : ${temp.getIsSent()}`)
*/