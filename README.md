# Avvio del server

npm run start, dalla cartella radice del progetto. Volendo è presente anche un docker file che lo rende conteinerizzabile.

# Credenziali dimostrative
Nota bene: queste credenziali sono riportate per poter provare da chiamate API RESTful le varie rotte messe a 
disposizione dal Express in server.js.

username: admin, password: administrator
username: apitest, password: api

# Cosa è questo software-ino
Questo è un piccolo software che implementa un ipotetico server HTTPS (con un self signed certificate generato da me) di backend.
Il focus è stato posto sul cercare di implementare in maniera (sulla teoria perlomeno...) più completo possibile un server in node, che utilizzi Express e faccia uno di rotte e middlewares totalmente async.
Compreso di gestione di eccezioni a livello di eccezione verificatasi in un metodo async.

# Collezione postman
Ho messo nel progetto una collezione contenente tutte le chiamate possibili implementate, importabile in postman. Dovrebbe rendervi immediato l'utilizzo delle APIs del server.

# Considerazioni tecniche
Sono state implementate delle funzionalità teoriche di login, cambio password.

Il cambio password richiede che prima sia stato effettuato una operazione di login, che ritorna un token JWT.
Quindi, bisogna passare nel body di questa richiesta( l'ho messo nel body il token per motivo di rapidità. A livello di coerenza, sarebbe meglio inserire il jwt nell'header della richiesta HTTPS come bearer token).
Passato questo token, una volta passati nel body lo username, la vecchia password, la nuova password (e ovviamente, il token citato precedentemente) è possibile cambiare password.

L'accettazione del token JWT può avvenire in due modi, a run time (quindi senza salvataggio di settings a livello di database): senza controlli o con un controllo a livello di data di emissione del token.
Per attivare il controllo della data di emissione del JWT, esiste una rotta apposita(setJWTDateLimitValidation).

Ho cercato di rendere il codice il meno coupled possibile tra le varie parti, per poter effettuare più tests di unità possibili (ho messo focus sulle classi di servizio, e pochissimo sulle classi di infrastruttura).

Per le classi di infrastruttura (come il Server.js) ho cercato di effettuare più tests di integrazioni possibile, per coprire tutti i comportamenti possibili di tutte le rotte disponibili.

# Cosa avrei fatto, se potessi tornare indietro
- Avrei cercato di utilizzare rotte di diverso tipo, oltre a GET e POST. Ho avuto uno scope limitato a queste due richieste, ma sarebbe stato carino usare altri metodi REST.
- Avrei cercato di sviluppare il progetto con typescript. Con puro javascript è una tortura il fatto che non esiste un modo tipizzato per definire signature dei metodi. E il fatto che ogni variabile può assumere qualsiasi valore non è comodo, perché è molto facile perdere coerenza sul cosa ritornare da parte di metodi di classi. Ciò rende facile aumentare l'entropia a livello di comportamento del codice (se uno non è attento, una volta ritorna null, nell'altro false, nell'altro '', e via dicendo. Con Typescript definendo a livello di signature cosa ritornare, questa operazione viene resa più semplice.
- Implementare configurazioni che vengono salvate lato database. Così se venisse riavviato il server, alla ripartenza, le impostazioni non andrebbero perse.

# Esecuzione dei tests
npm run test: esegue sia test di integrazione che tests di unità.
npm run test-unit: esegue solo tests di unità.
npm run test-integration: esegue solo tests di integrazione.







# Database, migrations, seeds (non necessari per questo progetto, ma lo ho riportati per completezza)

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
