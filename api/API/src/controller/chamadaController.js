import { Router } from "express";
import { alterarchamada, consulta, deletar, inserir } from '../repository/chamadaRepository.js'

let endpoint = Router();

endpoint.post('/inserir', async (req, res) => {
    try {
        const chamada = req.body;

        const resultado = await inserir(chamada);

    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

endpoint.get('/consulta', async (req, resp) => {
    let dados = await consulta()
    resp.send(dados)
})

endpoint.delete('/deletar/:id', async (req, resp) => {
    try {

        const id = req.params.id
        const resposta = await deletar(id)
        resp.send('id apagado')

    } catch (err) {
        resp.send({
            erro: err.message
        })
    }
})

endpoint.put('/alterar/:id', async (req, resp) => {
    try {

        const id = req.params.id
        const chamada = req.body


        const resposta = await alterarchamada(id, chamada)

    } catch (err) {
        resp.status(202).send({
            erro: err.message
        })
    }
})

export default endpoint;