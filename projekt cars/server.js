const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
app.use(express.static('static'))
const Datastore = require('nedb')
const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

app.get("/", function (req, res) {
    res.render('Cars.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/Add", function (req, res) {
    res.render('Add.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/List", function (req, res) {
    res.render('List.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/Delete", function (req, res) {
    res.render('Delete.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})
app.get("/Edit", function (req, res) {
    res.render('Edit.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})

app.get("/handleForm", function (req, res) {
    coll1.insert(req.query, function (err, newDoc) {
        console.log("dodano dokument (obiekt):")
        console.log(newDoc)
        console.log("unikalne id dokumentu: " + newDoc._id)
        res.render('Add.hbs')
    });
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})