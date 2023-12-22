class dbUsers {
  constructor(dao) {
    this.dao = dao;
    this.createTable();
  }

  createTable = async () => {
    let sql = `
        BEGIN;
        
        create table if not exists users(id serial primary key, username text, datejoined text, img text, phoneno text, email text, fullname text, password text);
        
        COMMIT;`;
    this.dao.run(sql);
  };

  addUser(data) {
    const sql = `insert into users(username, datejoined, img, phoneno, email, fullname, password) values(
      $1,CURRENT_TIMESTAMP,$2,$3,$4,$5,$6
    )`;
    return this.dao.run(sql, [
      data.username,
      data.profilepic,
      data.phone,
      data.email,
      data.fullname,
      data.password,
    ]);
  }

  getUsers() {
    return this.dao.run(`select * from users`);
  }

  getUser(data) {
    return this.dao.run(`select * from users where username=$1`, [
      data.username,
    ]);
  }
}

module.exports = dbUsers;
