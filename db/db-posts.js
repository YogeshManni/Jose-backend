class dbPosts {
  constructor(dbo) {
    this.dbo = dbo;
    this.createTable();
  }

  async createTable() {
    const query = `
        create table if not exists posts(id serial primary key,
        username text, email text,likes int, img text, caption text,
        date text)
        `;
    await this.dbo.run(query);
  }

  async addPost(data) {
    data.img = data.img.replaceAll(":", "-");
    const query = `insert into posts(username,email,likes, img, caption, date) values(
        '${data.username}','${data.email}',
        '${data.likes}','${data.img}','${data.caption}','${data.date}')`;
    return await this.dbo.run(query);
  }

  async getPosts(email) {
    const query = `select * from posts where email='${email}'`;
    return await this.dbo.run(query);
  }
}

module.exports = dbPosts;
