# Drone Delivery Simulator

Simulador de delivery por drones!

## Como executar

Passo 1 - Após clonar o reposítório para sua máquina, abra a pasta principal na sua IDE.

Passo 2 - Para adaptar as variáveis de ambiente do banco de dados à sua máquina, escreva o seguinte comando no terminal da pasta /server:

```bash
cp .env.example .env
```

Então, entre no arquivo .env e altere o que for necessário.

Passo 3 - Instale os módulos do back-end e então inicie o servidor com os respectivos comandos:

```bash
npm install
node src/index.js
```

Passo 4 - Mantenha esse terminal aberto e abra outro na pasta /client, e então instale também os módulos e inicie a página web:

```bash
npm install
npm run dev
```

Passo 5 - Então tudo estará pronto e você poderá clicar no link que aparecerá no terminal ou então escrever no seu navegador:

```bash
http://localhost:5173/
```
