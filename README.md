![Logo](https://raw.githubusercontent.com/yarpo/wolo-app/e4cf379186c21a687389fc9755146fadbbef095c/src/images/logo.svg)

<h1 align="center" > WoloApp Utils </h1>
<p align="center"></p>

# Docker-compose

Docker-compose file for launching github Woloapp API and Frontend

## Launching the project with docker compose:
To launch project, make sure to drag docker-compose file from this repository into the directory with both FE and BE. 

[!NOTE] Your repositories names might differ. In that case change names of your repository in the docker-compose file. 

Command to launch from the directory with both repositories
```bash
docker-compose up 
```
Shutting down the app
- PowerShell (Windows)
```PowerShell
docker-compose down --volumes; docker rmi frontend:latest backend:latest
```
- bash (Linux)
```bash
docker-compose down --volumes && docker rmi frontend:latest backend:latest
```