# Docker SonarQube

## Setup

1. Download image

```
docker pull sonarqube
```

3. Create container

```
docker run -d --name=sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

4. Check if container is running

```
docker ps
```

5. To connect using a browser

```
http://localhost:9000
```

6. Download Sonar Scanner from https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

7. Check if the installation was right

```
sonar-scanner -h
```

8. Go to root of project

```
sonar-scanner
```
