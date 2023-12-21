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
    const currentDateTime = new Date();
    const query = `insert into posts(username,email,likes, img, caption, date) values(
      $1,$2,$3,$4,$5,CURRENT_TIMESTAMP)`;

    return await this.dbo.run(query, [
      data.username,
      data.email,
      data.likes,
      data.img,
      data.caption,
    ]);
  }

  async getPosts(email) {
    const query = `select pt.*,count(cm.discussionid) totalcomments from posts pt left join comments cm on pt.id=cm.discussionid and cm.type='posts'  group by pt.id order by pt.date desc`;
    return await this.dbo.run(query);
  }

  async updateLikes(postId) {
    const query = `update posts set likes = likes + 1 where id='${postId}'`;
    return await this.dbo.run(query);
  }
}

module.exports = dbPosts;
