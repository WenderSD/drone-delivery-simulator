require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const initDatabase = require("./initDatabase");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", api);

const PORT = process.env.PORT || 4000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(async () => {
  try {
    // Inicializa o banco (cria banco e tabelas se não existirem)
    await initDatabase();

    // Depois que o banco estiver pronto, inicia o servidor
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Erro ao inicializar o banco:", err);
    process.exit(1); // encerra o processo se houver falha
  }
})();
