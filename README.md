# API de controle de estoque

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Para esta aplicação foi desenvolvida uma API que administra dados de estoque, usuários e tickets com códigos de barras
Este apresenta fundamentos em NestJS e Prisma, além de conceitos como autenticação, bancos de dados relacionais, filtragem de buscas e documentação de projetos

## Pré-requisitos

-   **Node** com versão superior ou igual que 16.15.0 - [Node Download](https://nodejs.org/pt-br/download/)
-   **Nest.js** com versão superior ou igual que 8.5.5 - [Nest Download](https://docs.nestjs.com/)
-   **PostgreSQL** com versão superior ou igual que 8.2.6 - [PostgreSQL Download](https://www.postgresql.org/download/)

## Scripts disponíveis

Na pasta raíz do projeto podem ser executados os seguintes comandos:

## Instalando as dependências:

```
$ npm install
```

## Executando o projeto

### Produção

```
npm run start
```

### Desenvolvimento

```
npm run start:dev
```

Para conseguir trabalhar com o banco de dados você deverá criar um arquivo .env e adicionar uma url de conexão com seu Postgres local com a chave DATABASE_URL.

```
DATABASE_URL="postgresql://yourUser:0000000@localhost:PORT/database"
```

Acesse [http://localhost:3333](http://localhost:3333) para visualizá-lo em seu navegador de forma local

---

> > ## Autor
> >
> > -   [Alexandre dos Santos Pereira Neto](https://www.linkedin.com/in/alexandrespneto/)


## Execução

> ## Comandos úteis:
>
> > #### Gerar nova rota de recursos
> >
> > -   nest g resource {nome} --no-spec
>
> > #### Gerar arquivos.d.ts no PRISMA
> >
> > -   prisma generate
>
> > #### Atualizar banco de dados
> >
> > -   prisma db push
>
> ---
