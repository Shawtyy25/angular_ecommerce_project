# NestJS + PostgreSQL 17 fejlesztői környezet Dockerrel

Ez az útmutató nulláról indulva mutatja be, hogyan állíts fel egy fejlesztői környezetet Linuxon Dockerrel, NestJS-sel és PostgreSQL 17-tel.

---

## 1. Előkészületek

Győződj meg róla, hogy a célgépen telepítve van:

- Docker
- Docker Compose
- Node.js (ajánlott LTS verzió)
- npm vagy yarn

Ellenőrzés:

```bash
docker --version
docker compose version
node -v
npm -v
```

## `1` Docker telepítés

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker --now
docker --version
docker compose version

##adminJogok 
sudo usermod -aG docker $USER
newgrp docker
```
## 

## `2` Project klónozása Githubról
```bash
git clone <git_repo_url> angular_ecommerce_project
cd angular_ecommerce_project/server/nest-backend
```

## `3` client.env létrehozása a nest-backend könyvtárban
```dotenv
DB_USER=dev_user_test
DB_PASSWORD=dev_password_test
DB_NAME=dev_ecommerce_db
DB_HOST=localhost
DB_PORT=dev_port #Ne ütközzön semmilyen porttal (pl: Postgres: 5432)
```

## `4` Docker compose futtatása
```bash
#Éppen futó docker konténer leállítása
sudo docker compose -f docker-compose.dev.yml down

#Indítsd el a konténert a .env.development fájl használatával:
sudo docker compose --env-file .env.development -f docker-compose.dev.yml up -d

#Konténerek állapotának ellenőrzése
sudo docker ps
```

## `5` Backup fájl másolása a konténerbe
```bash
sudo docker cp dev_ecommerce_db.backup dev_ecommerce_db/dev_ecommerce_db.backup
```

## `6` Backup visszaállítása
```bash
pg_restore -U dev_user_test -d dev_ecommerce_db /dev_ecommerce_db.backup
```
>**Figyelem: Ha a backup PostgreSQL 17-ből származik, a konténernek is PostgreSQL 17-nek kell lennie, különben `unsupported version` hiba fog jelentkezni.**


## `7`  Tesztelés
_Opcionális_

Csatlakozás a konténerben lévő adatbázishoz:
```bash
sudo docker exec -it dev_ecommerce_db psql -U devuser -d dev_ecommerce_db
```
Táblák ellenőrzése:
```bash
\dt
```

## `8` Nest.js indítása
A szerver gyökérmappájában (.../nest-backend/):
```bash
npm install
npm run start:dev
```

Győződj meg róla, hogy a `.env.development` értékek megegyeznek a Docker konténer beállításaival (`DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`).
