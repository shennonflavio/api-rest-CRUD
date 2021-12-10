const router = require('express').Router();

const Person = require('../models/Person');

// rotas da api - Create
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body;

    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório' });
    }
    if (!salary) {
        return res.status(422).json({ msg: 'O salário é obrigatório' });
    }
    if (!approved) {
        return res.status(422).json({ msg: 'A aprovação é obrigatória' });
    }

    const person = {
        name,
        salary,
        approved
    }

    // criar os dados no banco
    try {
        await Person.create(person);
        return res.status(201).json({ msg: 'Pessoa inserida no sistema com sucesso' })
    } catch (error) {
        return res.status(500).json({ error: error })

    }
});

// rotas api - Read
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        return res.status(200).json({ people });

    } catch (error) {
        return res.status(500).json({ error: error });
    }

});

router.get('/:id', async (req, res) => {

    console.log(req)
    // extrair o dado da requisição
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id });

        if (!person) {
            return res.status(422).json({ msg: 'Usuário não encontrado' });

        }

        res.status(200).json(person)

    } catch (error) {
        return res.status(500).json({ error: error });

    }

});

// update - atualização de dados

router.patch('/:id', async (req, res) => {
    // extrair o dado da requisição
    const id = req.params.id;


    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    };

    try {

        const updatePerson = await Person.updateOne({ _id: id }, person);

        if (updatePerson.matchedCount === 0) {
            return res.status(422).json({ msg: 'Usuário não encontrado' });
        }
        return res.status(200).json(person);

    } catch (error) {
        return res.status(500).json({ error: error })

    }
});

// delete - deletar dados
router.delete('/:id', async (req, res) => {
    // extrair o dado da requisição
    const id = req.params.id;

    const person = await Person.findOne({ _id: id });

    if (!person) {
        return res.status(422).json({ msg: 'Usuário não encontrado para deletar' });
    }

    try {
        await Person.deleteOne({ _id: id });

        return res.status(200).json({ msg: 'Usuário removido com sucesso' });

    } catch (error) {
        return res.status(500).json({ error: error })
    }


})

module.exports = router;