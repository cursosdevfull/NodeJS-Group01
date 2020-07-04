# Docker Mongo

## Setup Mongo

1. Download image

```
docker pull mongo
```

2. Create a volume

```
docker volume create mongo-data
```

3. Create container

```
docker run -d --name=mongo-server -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=todoVAl3 -v mongo-data:/data/db mongo
```

4. Check if container is running

```
docker ps
```

5. To connect using any IDE of Mongo (MongoCompass, NoSQLBooster)
