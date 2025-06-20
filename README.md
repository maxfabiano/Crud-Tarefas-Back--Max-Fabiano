Para executar use os comandos projeto feito em nodeks com framework nestjs
config do banco
.env


1 - npm install
2 - npx prisma migrate dev --name init_mysql
3 - npm run start



//Max Fabiano Carlis Nunes Da SIlva
Guia Rápido: Configuração e Execução do Backend
Este guia resume os passos essenciais para você rodar o projeto backend em sua máquina.

🚀 Primeiros Passos
Certifique-se de ter Node.js e npm instalados.

Acesse a Pasta do Projeto:
Abra seu terminal e navegue até a pasta raiz do projeto backend.

Instale as Dependências:

Bash

npm install
⚙️ Configuração do Banco de Dados
Usamos Prisma para gerenciar o banco de dados.

1. Configure o .env
   Crie um arquivo chamado .env na raiz do projeto. Dentro dele, adicione sua string de conexão do banco de dados (ex: MySQL):

Snippet de código

DATABASE_URL="mysql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"
# Ex: DATABASE_URL="mysql://root:password@localhost:3306/meu_banco"

JWT_SECRET="suaChaveSecretaDoJWT"
2. Prepare o Banco de Dados com Prisma
   Aplique as migrações e gere o cliente Prisma:

Bash

npx prisma migrate dev --name initial_setup
▶️ Rodando o Backend
Iniciar o Servidor:
Desenvolvimento (com hot-reload):
Bash

npm run start:dev
Produção (após build):
Bash

npm run build
npm run start
🛠️ Comandos Úteis do Prisma
Gerar o Prisma Client (se precisar):
Bash

npx prisma generate
Abrir o Prisma Studio (visualizador de dados):
Bash

npx prisma studio
