## O que é projeto Trybe Futebol Club?

O Trybe Futebol Club é um site informativo sobre partidas e classificações de futebol.

Desenvolvi o `Backend` em `Docker` através do fluxo de `TDD` usando o framework `Express.js` com o `Node.js` para alimentar o `Frontend` já desenvolvido.

Desenvolvi em `Typescript` uma API RESTfull em fluxo de `TDD` utilizando arquitetura de camadas, `MSC` e também aplicando os principios do `SOLID`. Na camada Model, utilizei o `ORM Sequelize` que protege o banco de dados de SQL Insertion


## Diagrama de Entidade Relacionamento
![DER](https://dsm01pap008files.storage.live.com/y4mlsEz8XIK-ixXCK9MgUlp2Ut0smm6S7_-b8Q18_ZcFpNMK-99eotZ__-hjwiFMB6KblxxhyewXCn-AxWFpmTYWIvsf01E3MxmAp_dBqognA-gYI8Z9LfGSZbHG21CLk2DPyfxtatcOgE_a4YUmrzE3f0qeZwZXCHErDDrYrnAYZLs9a_A8ZnFYgCJyKbbBtDhMNJA3La_uqK1Q4eANG3pNlQX-RKJQO2a9DrYS-rXMs4?encodeFailures=1&width=610&height=419)

## Que desafios eu desenvolvi?
### 1. Configurei o Dockerfile do Frontend em `app/frontend/Dockerfile`
### 2. Configurei o Dockerfile do Backend em `app/backend/Dockerfile`
### 3. Fluxo 1 : __Teams__
    
    3.1 Configurando a __Migration__, __Model__ e disponibilizando a __Seeders__ em `app/backend/src/database` para a tabela __Teams__

    3.2 Desenvolvi testes de integração para `GET /teams`

    3.3 Implementei o endpoint `GET /teams`

    3.4 Desenvolvi testes de integração para `GET /teams/:id`

    3.5 Implementei o endpoint `GET /teams/:id`
### 4. Fluxo 2: __Users__ e __Login__

    4.1  D
    4.2 Desenvolvi testes de ingração para `POST /login`

    4.3 Implementei o endpoint `POST /login`

    4.4 Desenvolvi testes de integração para o middleware em `POST /login`

    4.5 Implementei o middleware o endpoint `POST /login`

    4.6 Desenvolvi testes de ingração para `GET /login/role`

    4.7 Implementei o endpoint `GET /login/role`

### 5. Fluxo 3: __Matches__

    5.1  Configurando a __Migration__, __Model__ e disponibilizando a __Seeders__ em `app/backend/src/database` para a tabela __Matches__

    5.2 Desenvolvi testes de integração para `GET /matches`

    5.3 Implementei o endpoint `GET /matches`

    5.4 Desenvolvi testes de integração para buscar partidas em andamento `GET /matches?inProgress=true`

    5.5 Adicionei a funcionalidade ao endpoint `GET /matches`

    5.5 Implementei o endpoint para finalizar partidas  `PATCH /matches/:id/finish`

    5.6 Implementei o endpoint para atualizar a partida em andamento em `PATCH /matches/:id`

    5.7 Desenvolvi testes de integração para `POST /matches`

    5.8 Implementei o endpoint para iniciar partidas `POST /matches`

    5.9 Implementei o middleware não criação de partidas em `POST /matches`

### 6. Fluxo 4: Leaderboard

    6.1 Implementei o endpoint `GET /leaderboard/home` 

    6.2 Implementei o endpoint `GET /leaderboard/away`

    6.3 Implementei o endpoint `GET /leaderboard`

## Como iniciar?
1. Clonando o projeto `git clone https://github.com/livio-lopes/trybe-futebol-club.git`
2. Acessando diretório `cd store-manager/app`
3. Subindo docker compose `docker-compose up -d`
4. `npm install` no diretório frontend e backend
