# Docker Postgres

## Setup Postgres - Server

1. Download image

```
docker pull postgres:13-alpine
```

2. Create a volume

```
docker volume create postgres-data
```

3. Create container

```
docker run -d --name=postgres-server -e POSTGRES_PASSWORD=todovale -p 5432:5432 -v postgres-data:/var/lib/postgresql/data postgres:13-alpine
```

4. Check if container is running

```
docker ps
```

5. To connect using PGAdmin

## Setup PGAdmin

1. Download image

```
docker pull dpage/pgadmin4
```

2. Create a container

```
docker run -d --name=pgadmin -p 8050:80 -e PGADMIN_DEFAULT_EMAIL=user@email.com -e PGADMIN_DEFAULT_PASSWORD=todovale dpage/pgadmin4
```
