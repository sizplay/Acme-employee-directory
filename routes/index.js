const app = require('express').Router();
const db = require('../db');
// const { models } =  db;
// const { Employee } = models;
const { Employee } = db.models;

app.use((req, res, next) => {
  Employee.findAll()
    .then(employees => {
      const nickNameCount = employees.reduce((sum, employee) => {
        return sum + employee.nicknames.length;
      }, 0);

      res.locals.employeeCount = employees.length;
      res.locals.nicknameCount = nickNameCount;
      res.locals.path = req.url;
      next();
    })
    .catch(next);
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

app.get('/employees', (req, res, next) => {
  Employee.findAll()
    .then(employees =>
      res.render('employees', { title: 'Employees', employees }))
    .catch(err => next(err));
});

app.get('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.sendStatus(404);
      }
      res.render('employee', { title: employee.fullName, employee });
    })
    .catch(err => next(err));
});

app.delete('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => employee.destroy())
    .then(() => res.redirect('/employees'))
    .catch(err => next(err));
});

app.post('/employees', (req, res, next) => {
  Employee.create(req.body)
    .then(employee => res.redirect(`/employees/${employee.id}`))
    .catch(err => next(err));
});

app.put('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then(employee => {
      Object.assign(employee, req.body);
      return employee.save();
    })
    .then(() => {
      res.redirect('/employees');
    })
    .catch(err => next(err));
});

module.exports = app;
