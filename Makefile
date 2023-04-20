all : up

build :
	docker-compose up -d --build

up :
	docker-compose up

down :
	docker-compose down

fclean :
	docker-compose down --rmi all
	docker system prune --volumes --force --all

ps :
	docker-compose ps
