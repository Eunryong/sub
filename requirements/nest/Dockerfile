FROM node

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
RUN npm update
RUN npm upgrade
RUN npm i -g @nestjs/cli
RUN npm install uuid
RUN npm install typeorm @nestjs/typeorm --save
RUN npm install pg --save

ENTRYPOINT [ "tail", "-f" ]
