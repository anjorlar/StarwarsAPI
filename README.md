# StarwarsAPI
An service that Fetches data from the Starwars Api and processes it.

## To run your App with Docker follow the steps below
## Setting up Docker

- Install Docker [https://docs.docker.com/engine/install/]

- Create a `.env` file in the root directory then check sample.env to set Environment Variables values

## To build images and start containers

- RUN in Development mode `docker-compose up --build` [only use the --build whenever you make changes to Dockerfile or Package.json] else

- RUN `docker-compose up -d` [only use the -d flag to run docker container underground]

- To kill running container(s) `docker-compose down`
- To remove image `docker rmi [IMAGE_ID] -f`
- To remove multiple images `docker rmi -f $(docker images -aq)`
- To access running container `docker exec -it [container_id or container_name] bash`


## Starting This App on your local machine with node
create a .env file in the root directory and fill in appropriate environmental variable using sample.env as a guide.

## starting locally
* run `npm install to install all dependencies`
* run `npm start to start the app in production`
* run `npm run dev to start this app in development mode`


##

Base Endpoint: (https://starwarz01.herokuapp.com/)

## Technologies Used
* Backend: Nodejs/Express
* Postgres
* Sequelize

## Features
* Create Comment
* Get Movie Name
* Get list of Character in a Movie
* Get Comments

## API Endpoint
| Endpoint                                          | Functionality                       |
| ------------------------------------------------- | ----------------------------------- |
| POST /api/v1/create-comment                       | Create Comment                    |
| GET /api/v1/movie-name                            | Get Movie name, opening crawls and comment count                        |
| GET /api/v1/get-comment                           | List all comment a movie has                        |
| GET /api/v1/character-list/\<movieTitle_id>?sort=name&filter=male                                  | List all Character in a Movie        

## Documentation
To access the postman documentation click the link below
[Postman Documentation](https://documenter.getpostman.com/view/7087675/UVeAu8kg)

## AUTHOR
[Adebayo Anjola](https://github.com/anjorlar)

