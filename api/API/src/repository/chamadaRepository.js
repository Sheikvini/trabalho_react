import conexao from "./connection.js";

export async function inserir(chamada) {
    let comando = 'insert into tb_chamada (nm_nome) value (?)'

    let [resposta] = await conexao.query(comando, [chamada.nome])


    chamada.id = resposta.insertId;
    return chamada;
}

export async function consulta() {
    let comando = 'select * from tb_chamada'

    const [resposta] = await conexao.query(comando)
    resposta[0]
    return resposta
}


export async function deletar(id) {
    try {
        const comando = 'DELETE FROM tb_chamada WHERE id_chamada = ?';

        const [resposta] = await conexao.query(comando, [id]);

    } catch (err) {
        throw new Error(err.message);
    }
}

export async function alterarchamada(id, chamada) {
    try {
        const comando = `UPDATE tb_chamada
                         SET nm_nome = ?
                         WHERE id_chamada = ?`;

        const [resposta] = await conexao.query(comando, [chamada.nome, id]);

        return resposta.affectedRows;
    } catch (error) {
        throw error;
    }
}
