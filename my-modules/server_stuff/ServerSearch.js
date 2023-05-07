const fs = require('fs');
const { promiseHooks } = require('v8');
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
            console.log('tis')
        }
    }
    // writeChanges(changes){
    //     let phil = this.loadFile();
    //     phil.servers.push(changes);
    //     fs.writeFileSync('./server.json','utf-8');
    //     console.log(`Added changes: ${changes}`)
    // }
    addDefaultServer(ID){
        let phil = this.loadFile();
        if(this.findServerByID(ID)){
            console.log(`Cannot add '${ID}' as default. It already exists`)
            return
        }
        phil.servers.push({"serverID": ID, "logChannel" : null, "welcomeChannel" : null, "passwordRoles" : [], "inviteLogging" : null});
        fs.writeFileSync(this.path,JSON.stringify(phil, null, 2));
        console.log("Success")
    }
    genericServerSearch(column, ID){
        const server = this.findServerByID(ID)
        // const server = 
        return server[column]
    }
    genericSearch(column, val){
        const servers = this.loadFile()['servers'];
        const res = servers.find(element => element[column] === val);
        console.log(res)
        return res
    }
}

module.exports = {ServerSearch}