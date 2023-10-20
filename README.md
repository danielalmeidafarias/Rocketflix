# ApiTMDB

Api feita para pegar os ID's de uma lista de json disponibilizados e atualizados diariamente no banco de dados 'The Movie Database'.
A api faz a leitura desse arquivo e manda cada id para o banco de dados.
Com esses id's é possível acessar todas as informações disponibilizadas pelo TMDB.

https://github.com/danielalmeidafarias/Rocketflix/assets/79728041/7ed33a2a-d771-4471-b15b-fd11e2ca5364

## Conexão com banco de dados pelo arquivo .env
## node getIDs.js
    - pega a lista de ids do TMBD e converte cada linha em um arquivo json

## npx prisma migrate dev --name init
    - faz a conexão do prisma com o banco de dados

## npx ts-node script.ts
    - manda os dados do arquivo "output.json" para o banco de dados
    

## npm start
    - Inicia a API na porta 5000 do localhost
        
    * localhost:5000/api
        - Lista de todos od IDs do banco
    * localhost:5000/api/random
        - ID aleatório do banco 

## No frontEnd

## npm run dev
    -Inicia a aplicação na porta 5173
    - Ao clicar no botão randomico sera obtido um id aleatório e as informações do filme
