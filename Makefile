all : up

up :
	docker-compose up -d --build

down :
	docker-compose down

fclean :
	docker-compose down --rmi all
	docker system prune --volumes --force --all

ps :
	docker-compose ps
