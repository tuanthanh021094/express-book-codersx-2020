const db = require('../db')
const shortid = require('shortid')

const users = db.get("users").value();

module.exports.index =  (req,res) => res.render("users/index" ,{
    users: users,
})

module.exports.search = (req,res) => {
    let q = req.query.q;
    let filterUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render("users/index", {
        users: filterUsers,
        q : q
    })
}

module.exports.postCreate = (req,res) => {
    let id = shortid.generate();
    let newUser = {
        id: id,
        name: req.body.name,
        phone: req.body.phone
    }
    db.get("users").push(newUser).write();
    res.redirect("/users")    
}

module.exports.getUpdate = (req,res) => {
    let user = db.get("users").find({id: req.params.id}).value();
    res.render("users/update", {
        user: user
    }) 
}

module.exports.update = (req,res) => {
    db.get('users')
        .find({ id: req.params.id })
        .assign({name: req.body.name, phone: req.body.phone})
        .write();
    res.redirect("/users")
}

module.exports.delete = (req,res) => {
    db.get('users').remove({id : req.params.id}).write()
    res.redirect("/users")
}