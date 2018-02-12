const conn = require('./conn');
const Employee = require('./Employee');

const sync = ()=> {
  return conn.sync({ force: true });
};

const seed = ()=> {
  return Promise.all([
    Employee.create({ firstName: 'Chaehoon', lastName: 'Lim', nicknames: ['chae'] }),
    Employee.create({ firstName: 'Barack', lastName: 'Obama', nicknames: ['Obababa', 'OBBA'] }),
    Employee.create({ firstName: 'Jeanine', lastName: 'Pirro', nicknames: ['kakaka', 'pipipi', 'ririri'] })
  ]);
};

module.exports = {
  sync,
  seed,
  models: {
    Employee
  }
};
