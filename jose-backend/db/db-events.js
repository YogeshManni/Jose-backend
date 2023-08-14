class dbEvents {
  constructor(dao) {
    this.dao = dao;
    this.createTable();
  }

  createTable() {
    const sql = `create table if not exists events(id serial primary key, fronttext text, img text, avtSrc text,  
            userName text, content text)`;
    this.dao.run(sql);
  }

  getEvents() {
    return "sass";
  }
  addEvent() {
    const sql = "insert into events";
  }
}

module.exports = dbEvents;
