const fs = require('fs');
const { promiseHooks } = require('v8');
function mod_temp(ID){
    return {
        "serverID": ID, 
        "logChannel" : null, 
        "welcomeChannel" : null, 
        "passwordRoles" : [], 
        "inviteLogging" : null,
        "leetCode" : "",
        "serverName": "",
        "passwordChannel" : null,
        "tempRole" : null,
        "signupForm" : null,
        "eventForm" : null
    }
}



class ServerSearch{
    constructor(path){
        this.path = path+"/server.json"
    }
    loadFile(){
        return JSON.parse(fs.readFileSync(this.path,'utf-8'))
    }
    findServerByID(ID){
        const servers = this.loadFile()['servers'];
        const res = servers.find(element => element['serverID'] === ID);
        return res
    }
    findServerPasswordRole(ID, pass){
        const server = this.findServerByID(ID)
        if(server != undefined){
            let res = server['passwordRoles'].find(element => element["password"] === pass);
            let temp_id = this.genericServerSearch('tempRole', ID);
            return [res, temp_id]
        }
    }
    verifyNotDupe(ID, roles){
        const server = this.findServerByID(ID);
        for(const pr of server['passwordRoles']){
            if(roles.includes(pr.role)) return true;
        }
        return false;
        // let res = server['passwordRoles'].find(element => element['role'] ===)
    }
    writeLocalChange(ID,column, change){
        // Write changes to....specific column for a server.
        let phil = this.loadFile();
        phil['servers'].forEach(element => {if(element['serverID'] === ID){element[column]=change}})
        fs.writeFileSync(this.path,JSON.stringify(phil,null,2));
        console.log(`Added changes: '${change}' to '${column}' for '${ID}'`)
    }
    addDefaultServer(ID){
        let phil = this.loadFile();
        if(this.findServerByID(ID)){
            console.log(`Cannot add '${ID}' as default. It already exists`)
            return
        }
        phil.servers.push(mod_temp(ID));
        fs.writeFileSync(this.path,JSON.stringify(phil, null, 2));
        console.log("Success")
    }
    genericServerSearch(column, ID){
        const server = this.findServerByID(ID)
        return server[column]
    }
    genericSearch(column, val){
        const servers = this.loadFile()['servers'];
        const res = servers.find(element => element[column] === val);
        console.log(res)
        return res
    }
    pushLocalChange(newCol,ID, as_=null){
        let phil = this.loadFile();
        
    }
    pushChanges(newCol,as_=null){
        let phil = this.loadFile();
        phil['servers'].forEach(element => {
            element[newCol] = as_;
        });
        fs.writeFileSync(this.path, JSON.stringify(phil, null, 2))
        console.log(`Added: '${newCol}', with '${as_}'`)
    }
}

module.exports = {ServerSearch}