FROM node

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
RUN npm update
RUN npm upgrade
RUN npm install -g @nestjs/cli
# for typeorm
RUN npm install pg typeorm @nestjs/typeorm --save
# for hashing
RUN npm install bcryptjs --save
# for jwt
RUN npm install @nestjs/jwt passport-jwt --save
# for axios
RUN npm install @nestjs/axios axios --save
# for 42 passport
RUN npm install passport @nestjs/passport --save
RUN npm install passport-oauth2 --save
RUN npm install passport-42 --save
# for config
RUN npm install @nestjs/config --save
# for cookie
# RUN npm i cookie-parser @types/cookie-parser --save
# for graphql
# RUN npm install @nestjs/graphql apollo-server-express graphql-tools graphql --save
# RUN npm install type-graphql --save


ENTRYPOINT [ "tail", "-f" ]
