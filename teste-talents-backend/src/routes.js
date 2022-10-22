const { Router } = require("express");
const { or } = require("sequelize");
const Livro = require('./database/models/Livros');
const router = Router();
const { Op } = require("sequelize");

router.get('/', async (req, res) => {

    Livro.findAll()
    .then((parm)=>{
        return res.json (parm);
    }).catch((error) =>{
        console.log(error);
        return res.json({
            erro: true,
            mensagem: error
        });
    });
        
})

router.get('/buscar/:search', async (req, res) => {

    const { search } = req.params;

    if(search){

        Livro.findAll( { where : { [Op.or]: [{ title: search },  {isbn: search},  {authorid: search}] } } )
            .then((parm) => {
                return res.json(parm);
            }).catch((error) => {
                console.log(error);
                return res.json({
                    erro: true,
                    mensagem: error
                });
            });

    }
        
})


router.post('/', async (req, res) => {

    await Livro.create(req.body)
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Salvo com Sucesso"
        });
    }).catch(() =>{
        return res.json({
            erro: true,
            mensagem: "Erro ao Salvar"
        });
    });

})

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    Livro.findOne( { where : { id: id } })
    .then((parm)=>{
        return res.json (parm);
    }).catch((error) =>{
        console.log(error);
        return res.json({
            erro: true,
            mensagem: error
        });
    });
        
})

router.put('/:id', async (req, res) => {

    const { id } = req.params;

    Livro.update( {

        title: req.body.title,
        isbn: req.body.isbn,
        authorid: req.body.authorid

    },
    { 
        where : {
            id: id 
        } 
    })
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "atualizado com Sucesso"
        });
    }).catch(() =>{
        return res.json({
            erro: true,
            mensagem: "Erro ao atualizar"
        });
    });
        
})


router.delete('/:id', async(req, res) => {

    const { id } = req.params;

    await Livro.destroy( { where : { id } } )
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "deletado com Sucesso"
        });
    }).catch(() =>{
        return res.json({
            erro: true,
            mensagem: "Erro ao deletar"
        });
    });
})


module.exports = router;