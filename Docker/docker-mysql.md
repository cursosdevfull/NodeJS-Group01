# Docker MySQL

## Setup MySQL - Server

1. Download image

```
docker pull mysql
```

2. Create a volume

```
docker volume create mysql-data
```

3. Create container

```
docker run -d --name=mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=todoVAl3 -v mysql-data:/var/lib/mysql mysql
```

4. Check if container is running

```
docker ps
```

5. To connect using any IDE of MySQL (MySQL Workbeanch, DBeaver, PHPMyAdmin)

## Setup PHPMyAdmin

1. Download image

```
docker pull phpmyadmin/phpmyadmin
```

2. Create a volume

```
docker volume create sessions-data
```

3. Create a container

```
docker run -d --name=phpmyadmin -p 8080:80 -v sessions-data:/sessions -e PMA_ARBITRARY=1 phpmyadmin/phpmyadmin
```
