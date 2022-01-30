This readme will be filled during the new development iterations.

# Credenziali dimostrative
Nota bene: queste credenziali sono riportate per poter provare da chiamate API RESTful le varie rotte messe a 
disposizione dal Express in server.js. Tutto qui.
Questo in quanto questo è un software demo ad uso didattico.

E' doveroso sottolineare di non riportare mai per iscritto nessuna informazione di sicurezza nè privata.


username: admin, password: administrator
Rotta di login: /login (come riportato da allegata collezione di postman). 
# Database, migrations, seeds

#### Creazione da zero del database sqlite
Posizionarsi con il terminale della cartella radice del progetto, poi eseguire:
```
npx knex --knexfile ./db/knexfile.cjs migrate:latest
```
verrà generato un db locale su file, ovvero "db.sql3".
#### Inserimento dati default nel database sqlite
Posizionarsi con il terminale della cartella radice del progetto, poi eseguire:
```
npx knex  --knexfile ./db/knexfile.cjs seed:run
```
#### Drop del database
Posizionarsi con il terminale della cartella radice del progetto, poi eseguire:
```
npx knex  --knexfile ./db/knexfile.cjs migrate:rollback
```


# Docker

#### Build dell'immagine da docker file
Eseguire:
```
docker build --tag node-docker-grabber .
```

#### RUN dell'immagine da docker file
Eseguire:
```
docker run -d -p 3003:3003 node-docker-grabber
```