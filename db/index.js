var pg = require('pg')
module.exports = 
class appDb
{
    constructor()
    {
        this.db = new pg.Client({
            user:'postgres',
            database:'jose-nic',
            password:'cityDb',
            port:'5432',
            host:"localhost"
        })
        this.db.connect((err) =>
        {
            if(!err)
                console.log("Successfully connected to db!") 
            else
                console.log("error occured connecting to db!")
        })    
    }


    run(sql,params=[])
    {
      return new Promise((resolve,reject) =>
      {
        this.db.query(sql, params,(err,res) =>
        {
            if(err)
            {
                console.log("error running sql" + sql)
                console.log(err)
                reject(err)
            }
            else
            {
                resolve(res.rows)
            }
        })   
      })
        
    }
        stop()
        {
            this.db.end()
        }
    
}