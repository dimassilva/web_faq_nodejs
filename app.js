const express   = require('express');
const exphbs    = require('express-handlebars');
const app       = express();
const path      = require('path');
const db        = require('./db/connection');
const bodyParser = require('body-parser');
const Faq      = require('./models/Faq');
const Sequelize = require('sequelize');
const Op        = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com banco
db
.authenticate()
.then(() => {
    console.log("Conectou ao banco com sucesso");
})
.catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
});

// Rotas
app.get('/', (req, res) => {

    let search = req.query.faq;
    let query = '%'+search+'%';

    if(!search){
        Faq.findAll({order: [
            ['createdAt','DESC']
        ]})
        .then(faqs => {
            res.render('index', {
                faqs
            });
    
        })
        .catch(err => console.log(err));
    } else {
        Faq.findAll({
            where:{titulo: {[Op.like]: query}},
            order: [
            ['createdAt','DESC']
        ]})
        .then(faqs => {
            res.render('index', {
                faqs, search
            });
    
        })
        .catch(err => console.log(err));;
    }


});

//faqs routes
app.use('/faqs', require('./routes/faqs'));