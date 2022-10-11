const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); //если отключить, то мы не увидим запросы с фронта

app.use((req, res, next) => {
    console.log('URL =', req.url);
    console.log('Original_URL =', req.originalUrl);
    console.log('METHOD =', req.method);
    console.log('HOST =', req.headers.host);
    console.log('IsSecure', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);

    next()
})

app.all('/test', (req, res) => {
    res.status(200).json({ message: 'OK' })
})

app.all('/sum', (req, res) => {
    const a = Number(req.body.a);
    const b = Number(req.body.b);

    const sum = a + b;

    res.json({
        sum
    });
})

app.all('/reverseCase', (req, res) => {
    const str = String(req.body.str);

    let reverseStr = String("");

    for (let i=0; i<str.length; i++){
        if (str[i].toLowerCase() == str[i]){
            reverseStr += str[i].toUpperCase();
        }
        else {
            reverseStr += str[i].toLowerCase();
        }
    }

    res.json({
        reverseStr
    });
})

app.all('/reverseArray', (req, res) => {
    const arr = req.body.arr;

    let reverseArr = arr.reverse();

    res.json({
        reverseArr
    });
})

http.createServer(app).listen(3000, () => {
    console.log('Server is working on port 3000')
})

// http://localhost:3000/test

// http - протокол(80)
// https(443)

// localhost - домен(хост)
// 127.0.0.1 === localhost

// :3000 - порт
// 2 в 16 портов = 65536
// 22 - ssh протокол

// GET - получить данные
// POST - создать
// PUT - заменить
// PATCH - обновить
// DELETE - удалить

