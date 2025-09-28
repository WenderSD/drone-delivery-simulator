// initDatabase.js
const fs = require("fs");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

async function initDatabase() {
  try {
    // Conecta ao MySQL sem selecionar um banco
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true, // Permite executar várias queries do schema
    });

    // Cria o banco se não existir
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );

    // Seleciona o banco
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);

    // Lê o arquivo schema.sql
    const schema = fs.readFileSync("schema.sql", "utf-8");

    // Executa todas as queries do schema
    await connection.query(schema);

    console.log("Conectado ao banco de dados!");
    await connection.end();
  } catch (err) {
    console.error("Erro ao inicializar o banco:", err);
    process.exit(1);
  }
}

// Se este arquivo for rodado diretamente
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;
