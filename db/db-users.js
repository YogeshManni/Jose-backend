class dbUsers {
  constructor(dao) {
    this.dao = dao;
    this.createTable();
  }

  createTable = async () => {
    let sql = `
        BEGIN;
        
        create table if not exists users(id serial primary key, username text, role text, datejoined text, img text, phoneno text, email text, fullname text);
        
        COMMIT;`;
    this.dao.run(sql);
  };

  addUser(data) {
    const sql = `insert into users(username, role, datejoined, img, phoneno, email, fullname) values(
        '${data.username}',
        '${data.role}',
        '${data.datejoined}',
        '${data.img}',
        '${data.phoneno}',
        '${data.email}',
        '${data.fullname}'
    )`;
    return this.dao.run(sql);
  }

  getUsers() {
    return this.dao.run(`select * from users`);
  }
}

module.exports = dbUsers;
