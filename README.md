# Drone Delivery Simulator

Simulador de delivery por drones!

## Como executar

### Passo 1

Instalação do Se você não tem o mySQL instalado na sua máquina, você deve seguir os passos a seguir. Se voc~E já tem essa ferramenta, pule para o passo X.

#### 1.1 Instalar o mySQL installer:

🔗 https://dev.mysql.com/downloads/installer/

- Opte pelo Full Installer.

#### 1.2 Iniciar a instalação

- Execute o arquivo baixado (mysql-installer-community-...exe).

- Aparecerá o instalador com opções de setup:

- Developer Default — recomendado para quem vai desenvolver (instala: MySQL Server, Workbench, Shell,etc.)

- Ou Full que faz a intalação completa.

👉 Escolha “Developer Default” e clique em Next.

#### 1.3 Instalar os produtos selecionados

- O instalador mostrará uma lista (MySQL Server, Workbench, Connector, etc.).

- Clique em Execute → ele fará download e instalação de todos.

- Quando terminar, clique em Next.

#### 1.4 Configurar o mySQL Server

Agora vem a configuração do servidor MySQL:

##### a) Config Type

- Escolha: Standalone MySQL Server / Classic MySQL Replication

- Em seguida: Development Computer (menos uso de recursos)

##### b) Network

- Deixe a porta padrão: 3306

- Mantenha TCP/IP habilitado

- Clique Next

##### c) Authentication Method

- Escolha Use Strong Password Encryption (RECOMMENDED)
  (Caso o Node.js dê erro depois, podemos trocar para “Legacy” via Workbench, mas tente forte primeiro.)

##### d) Criar usuário root

- Defina uma senha para o usuário root. Ex: root123
- Clique Next

##### e) Windows Service

- Marque Configure MySQL Server as a Windows Service

- Nome: MySQL80 (padrão)

- Marque Start MySQL Server at System Startup

- Escolha Run as Standard System Account

- Clique Next.

##### f) Apply Configuration

- Clique Execute e aguarde concluir todos os passos.
- Clique em Finish.

Passo 2 - Após clonar o reposítório para sua máquina, abra a pasta principal na sua IDE.

##### g) Connect to Server

- Insira a senha que você definiu
- Clique em Check e então em Next

Dependendo da versão haverão algumas configurações a mais para ser feitas, mas essas podem ser concluídas clicando em Next apenas.

Pronto! Seu servidor estará pronto para o projeto.

### Passo 2

Para adaptar as variáveis de ambiente do banco de dados à sua máquina, escreva o seguinte comando no terminal da pasta /server:

Para Linux / macOS / Windows Powershell:

```bash
cp .env.example .env
```

Para Windows CMD:

```bash
copy .env.example .env
```

Então, entre no arquivo .env e altere o que for necessário, como o usuário e senha do seu mySQL.

### Passo 3

Instale os módulos do back-end e então inicie o servidor com os respectivos comandos:

```bash
npm install
node src/index.js
```

### Passo 4

Mantenha esse terminal aberto e abra outro na pasta /client, e então instale também os módulos e inicie a página web:

```bash
npm install
npm run dev
```

### Passo 5

Então tudo estará pronto e você poderá clicar no link que aparecerá no terminal ou então escrever no seu navegador:

```bash
http://localhost:5173/
```

## Tecnologias utilizadas

As tecnologias que foram utilizadas para esse projeto foram:

- Node.js (Express)
- React (com Vites)
- mySQL

## Imagens do projeto

## Sobre o projeto

## Desenvolvimento com IAs

## Licença

MIT License
