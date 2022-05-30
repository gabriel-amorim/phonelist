const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
require("dotenv-safe").config();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'lista'
});

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], (err, result) => {
        if(err) {
            res.send({message: err});
        } else {
            res.send(result)
        }
    })
})

app.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if(err) 
            res.send({err: err});

        if(result.length > 0) {
            const id = result.id;
            const token = jwt.sign({id}, process.env.SECRET, {
                expiresIn : 600
            });
            res.status(200).json({auth: true, token: token});
        }
        else
            res.send({auth: false, message: "Wrong username/password combination"});
    })
})

app.get('/contacts', verifyJWT, (req, res) => {
    db.query("SELECT * FROM contatos", (err, result) => {
        res.status(200).send(result);
    })
})

app.post('/contacts', verifyJWT, (req, res) => {
    const name = req.body.name
    const phone = req.body.phone

    console.log("caiu no post contatos: " + name, phone)

    db.query("INSERT INTO contatos (name, phone) VALUES (?,?)", [name, phone], (err, result) => {
        if(err)
            res.status(400).send({message: err.message});
        else 
            res.status(200).json(result)
    })
})

app.put('/contacts', verifyJWT, (req, res) => {
    const username = req.body.name
    const userphone = req.body.phone
    const userid = req.body.id

    console.log(userid, username, userphone)

    db.query("UPDATE contatos SET name = ?, phone = ? WHERE id = ?", [username, userphone, userid], (err, result) => {
        if(err)
            res.status(400).send({message: err.message});
        else 
            res.status(200).json(result)
    })
})

app.post('/logout', (req, res) => {
    res.json({auth: false, token: null})
})

app.listen(3001, () => {
    console.log('server running')
})

function verifyJWT(req, res, next){
    const token = req.headers['token'];
    console.log("caiu no verifyjwt: " + token)
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}