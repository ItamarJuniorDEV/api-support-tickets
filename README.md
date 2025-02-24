# API de Gerenciamento de Tickets de Suporte

API RESTful simples para gerenciamento de tickets de suporte técnico, construída com Node.js puro, sem frameworks externos.

## 🚀 Funcionalidades

- Criação de tickets de suporte
- Listagem de tickets (com filtro por status)
- Atualização de informações do ticket
- Fechamento de tickets com solução
- Remoção de tickets
- Persistência de dados em arquivo JSON

## 🛠️ Tecnologias

- Node.js
- JavaScript (ESM)
- File System API (fs)
- HTTP Server nativo

## 📋 Estrutura do Projeto

```
├── src/
│   ├── controllers/
│   │   └── tickets/
│   │       ├── create.js
│   │       ├── index.js
│   │       ├── remove.js
│   │       ├── update.js
│   │       └── updateStatus.js
│   ├── database/
│   │   ├── database.js
│   │   └── db.json
│   ├── middlewares/
│   │   ├── jsonHandler.js
│   │   └── routesHandler.js
│   ├── routes/
│   │   ├── index.js
│   │   └── tickets.js
│   └── utils/
│       ├── extractQueryParams.js
│       └── parseRoutePath.js
└── server.js
```

## 🔄 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/tickets` | Cria um novo ticket |
| GET | `/tickets` | Lista todos os tickets (opção: `?status=open` ou `?status=closed`) |
| PUT | `/tickets/:id` | Atualiza informações de um ticket |
| PATCH | `/tickets/:id/close` | Fecha um ticket com solução |
| DELETE | `/tickets/:id` | Remove um ticket |

## 📄 Formato dos Dados

### Ticket
```json
{
  "id": "uuid",
  "equipment": "Nome do equipamento",
  "description": "Descrição do problema",
  "user_name": "Nome do usuário",
  "status": "open/closed",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "solution": "Solução aplicada (apenas tickets fechados)"
}
```

## 🚦 Como Executar

1. Clone este repositório
2. Navegue até a pasta do projeto
3. Execute o servidor:
```bash
node server.js
```
4. A API estará disponível em `http://localhost:3333`

## 📝 Exemplos de Uso

### Criar um ticket
```bash
curl -X POST http://localhost:3333/tickets \
  -H "Content-Type: application/json" \
  -d '{"equipment": "Mouse", "description": "Não funciona", "user_name": "Carlos"}'
```

### Listar tickets abertos
```bash
curl http://localhost:3333/tickets?status=open
```

### Fechar um ticket
```bash
curl -X PATCH http://localhost:3333/tickets/ID_DO_TICKET/close \
  -H "Content-Type: application/json" \
  -d '{"solution": "Trocamos o equipamento"}'
```

## 📌 Notas

- A API utiliza um sistema de rotas personalizado com suporte a parâmetros de rota e query strings
- Os dados são persistidos em um arquivo JSON local (db.json)
- Não há dependências externas, apenas módulos nativos do Node.js