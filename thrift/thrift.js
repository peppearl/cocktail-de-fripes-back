const fs = require('fs');

class Thrifts {
  constructor(filename = 'thrift.json') {
    this.path = `./data/${filename}`;

    try {
      fs.readdirSync('data');
    } catch (error) {
      fs.mkdirSync('data');
    }

    try {
      fs.accessSync(this.path);
    } catch (error) {
      fs.writeFileSync(this.path, '[]');
    }
  }

  createId() {
    return new Date().getTime().toString();
  }

  async create(data, id, imageName) {
    const totalData = JSON.parse(await fs.promises.readFile(this.path));
    const { content } = data;
    const desc = content.substr(0, 200) + '...';
    totalData.push({
      ...data,
      id,
      desc,
      thumbnail: `http://172.30.92.128:3000/${imageName}`,
    });

    await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
  }

  async getAll() {
    const data = JSON.parse(await fs.promises.readFile(this.path));
    return data.filter(thrift => delete thrift.content);
  }

  async searchThriftStore(query) {
    try {
      const data = await this.getAll();
      return data.filter(thrift =>
        thrift.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.log('Une erreur est survenue lors de la recherche de la friperie.');
    }
  }

  async getSingle(id) {
    const data = await JSON.parse(await fs.promises.readFile(this.path));
    return data.find(thrift => thrift.id === id);
  }

  async getByCity(city) {
    const data = await this.getAll();
    return data.filter(thrift => thrift.city === city);
  }

  async getByStyle(style) {
    const data = await this.getAll();
    return data.filter(thrift => thrift.style === style);
  }
}

module.exports = Thrifts;
