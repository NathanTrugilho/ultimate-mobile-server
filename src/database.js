const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Aponta para a raiz do projeto
const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao SQLite:', err.message);
        return;
    }
    console.log('🚀 Conexão com o banco SQLite estabelecida!');

    // db.serialize garante que as queries rodem em sequência (uma após a outra)
    db.serialize(() => {
        // 1. Cria a tabela de teste
        db.run(`CREATE TABLE IF NOT EXISTS teste_conexao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mensagem TEXT NOT NULL,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // 2. Insere um dado de teste apenas se a tabela estiver vazia
        db.get(`SELECT COUNT(*) as count FROM teste_conexao`, (err, row) => {
            if (row && row.count === 0) {
                db.run(`INSERT INTO teste_conexao (mensagem) VALUES ('Banco de dados operando 100% no servidor mobile!')`);
            }
        });
    });
});

module.exports = db;