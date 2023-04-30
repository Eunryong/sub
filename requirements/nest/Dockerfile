FROM node

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
RUN npm update
RUN npm upgrade
RUN npm i -g @nestjs/cli
# for unique number
RUN npm install uuid
# for typeorm
RUN npm install pg typeorm @nestjs/typeorm --save
# for hashing
RUN npm install bcryptjs --save
# for jwt
RUN npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save
RUN npm i --save @nestjs/axios axios
# for 42 passport
RUN npm install passport-42
RUN npm install passport-oauth2
RUN npm i --save @nestjs/config


ENTRYPOINT [ "tail", "-f" ]
