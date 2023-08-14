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
    return this.dao.run(`select * from events`);
  }
  addEvent(data) {
    let fronttext = data.frontText.replaceAll("'", "''");
    // fronttext = fronttext.replaceAll('"', '""');

    let content = data.content.replaceAll("'", "''");
    //  content = content.replaceAll('"', '""');
    const sql = `insert into events(fronttext, img, avtSrc,userName, content) values(
                  '${fronttext}',
                  '${data.img}',
                  '${data.avtSrc}',
                  '${data.userName}',
                  '${content}')`;

    return this.dao.run(sql);
  }
}

module.exports = dbEvents;
