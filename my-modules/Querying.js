const mariadb = require("../../discord-bot/node_modules/mariadb")
const {user, password, host} = require("../../info.json")
const pl = mariadb.createPool({
    host: `${host}`, 
    user:`${user}`, 
    password: `${password}`,
    database: 'discord',
    connectionLimit: 5
});
function CreateConnection(){
    // return //
}
class Querying{
    constructor(pool){
        this.pool = pool;
        // this.query = query;
    }
    async query(q){
        let conn = await this.pool.getConnection();
        let output;
        try{
            output = await conn.query(q) 
            console.log("thi")

        }catch(err){
            console.log(err);
        }finally{
            console.log("this is hit")
            conn.end()
            console.log("this is also hit")

            return output
        }
    }

}

let s = await new Querying(pl);
console.log(s.query("SELECT * FROM PASSWORD_VERIFY WHERE SERVER_ID = '613534490941325315'"))
