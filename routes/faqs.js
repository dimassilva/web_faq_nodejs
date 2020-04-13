const express   = require('express');
const router    = express.Router();
const Faq       = require('../models/Faq');

router.get('/test', (req, res) => {
    res.send('deu certo');
});

//detalhe do erro
router.get('/view/:id', (req, res) => Faq.findOne({
    where: {id: req.params.id}
}).then(faq => {
    res.render('view', {
        faq
    });
}).catch(err => console.log(err)));

//Rota da rota de envio
router.get('/add', (req, res) => {
    res.render('add');
})


//Adicionar Faq via post
router.post('/add', (req, res) => {
    let {titulo, solucao, servico, email, novo, descricao} = req.body;

    //Insert
    Faq.create({
        titulo,
        solucao,
        servico,
        email,
        novo,
        descricao
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router
