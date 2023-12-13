class dbPosts {
  constructor(dbo) {
    this.dbo = dbo;
    this.createTable();
  }

  createTable() {
    const query = `
        create table if not exists posts(id serial primary key,
        username text, email text,likes number, img text, caption text,
        date timestamp)
        `;
    this.dbo.run(query);
  }
}

module.exports = dbPosts;
