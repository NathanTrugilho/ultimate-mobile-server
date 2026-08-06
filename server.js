const app = require('./src/app');
const db = require('./src/database'); // Inicializa e conecta ao banco

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🌐 Servidor rodando na porta ${PORT}...`);

    // Consulta de teste disparada após o servidor ligar
    db.get(`SELECT * FROM teste_conexao LIMIT 1`, (err, row) => {
        if (err) {
            console.error('❌ Erro ao consultar o banco de teste:', err.message);
        } else if (row) {
            console.log('✅ TESTE DO BANCO DE DADOS BEM-SUCEDIDO:');
            console.log(`   -> ID: ${row.id}`);
            console.log(`   -> Mensagem: ${row.mensagem}`);
            console.log(`   -> Data: ${row.data_criacao}`);
        } else {
            console.log('⚠️ Banco conectado, mas nenhuma linha encontrada na tabela de teste.');
        }
    });
});