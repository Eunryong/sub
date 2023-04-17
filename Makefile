up:
	@echo "docker run -it -v ${PWD}/work:/root/work --name trans -p 3000:3000 mynode /bin/bash\ndocker start trans\ndocker exec -it trans /bin/bash" > run.sh
	@chmod +x run.sh
	@echo "run mynode"
	@./run.sh

build:
	@make file
	@docker build -t mynode .
	@echo "make mynode images"

file:
	@echo 'FROM node\n\nRUN npm i -g @nestjs/cli' > Dockerfile
	@echo "make Dockerfile"