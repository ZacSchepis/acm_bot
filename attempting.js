const mysql = require('mysql')
const {mysqlInfo} = require('./config.json')
const test_example = {user:{id:"3002"},guild:{id:"30910"}}
const connection = mysql.createConnection({
    host:mysqlInfo.host,
    user:mysqlInfo.user,
    password:mysqlInfo.password,
    database:mysqlInfo.database
  })
// const {random} = require')
const pool = mysql.createPool({
    connectionLimit:40,
    host:mysqlInfo.host,
    user:mysqlInfo.user,
    password:mysqlInfo.password,
    database:mysqlInfo.database
})
function GenericQuery(sql, values){
    // pool.query(sql, values, (err, rows)=>{

    // })
    if(!pool){
        pool = mysql.createPool(mysqlInfo)
    }
    return new Promise((resolve, reject)=>{
      pool.query(sql, values, (err, rows)=>{
        if(err){
          reject(new Error(`Error during the query process\n${JSON.stringify({"sql":sql,"values":values,"error":err.sqlMessage},null, 2)}`))
        }
        else if (rows.length === 0 || rows === undefined) reject(new Error("No results were returned from query."))
        else{
            console.log(`Queried ${rows?.affectedRows || rows.length} row(s).`)
            resolve(rows)
        }
      })

    })
  }
function hanz(p){
    return p.then((res)=>{
        return res;
    }).catch((err)=>{
        console.error(err)
    })
}
// function GenericQuery(sql, values){
//     connection.connect((err)=>{
//         if(err){
//             console.error("Error while connecting.", err);
//         }
//         return new Promise((resolve, reject)=>{
//                 connection.query(sql, values, (err, rows)=>{
//                 if(err){
//                     reject(new Error(`Error during the retrieval process\n${JSON.stringify({"sql":sql, "values":values, "error":err.sqlMessage} ,null, 2)}`))}
//                 else if (rows.length === 0 || rows === undefined) reject(new Error("Nothing was retrieved."))
//                 resolve(rows)
//             })
//         })
//     })
// }
function getXP (test_){
    const sql = "SELECT * FROM experience  WHERE userid = ? AND serverid = ?";
    const values = [test_.user.id, test_.guild.id]
    return GenericQuery(sql, values)
}
module.exports = {
    create:{
        addGuildUser(loc){
            const sql = "INSERT INTO experience (userid, level, xp, serverid, hex_value) values (?,1,0,?,?)";
            const values = [loc.user.id, loc.guild.id, 42185]
            return GenericQuery(sql, values)
        }
    },
    read:{
        getGuildUserXP(loc){
            const sql = "SELECT * FROM experience WHERE userid = ? AND serverid = ?";
            const values = [loc.user.id, loc.guild.id];
            return GenericQuery(sql, values)
        },
//         SELECT *
// FROM your_table
// ORDER BY xp DESC
// LIMIT 10;
        getGuildTop10(loc){
            const sql = "SELECT * FROM experience WHERE serverid = ? ORDER BY xp DESC LIMIT 10"
            const values = [loc.guild.id]
            return GenericQuery(sql, values);
        }
    },
    update:{
        updateGuildUserXP(loc){
            return 
        }
    },
    delete_:{
        removeGuildUserFromXPTable(loc){
            const sql = "DELETE FROM experience WHERE userid = ? and serverid = ?"
            const values = [loc.user.id, loc.guild.id]
            return GenericQuery(sql, values) 
        },
        removeAllGuildFromXPTable(loc){
            const sql = "DELETE FROM experience WHERE serverid = ?"
            const values = [loc.guild.id]
            return GenericQuery(sql, values)
        },
    }
    // async Create(sql, values){

    // },
    

    // },
    // async Update(sql, values){
    //     return new Promise((resolve, reject)=>{
    //         connection.query(sql, values, (err, rows)=>{})
    //     })
    // },
    // async Delete(sql, values){

    }
