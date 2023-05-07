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
RUN npm install passport @nestjs/passport \
	passport-oauth2 \
	passport-42 --save
# for config
RUN npm install @nestjs/config --save
# for cookie
# RUN npm i cookie-parser @types/cookie-parser --save
# for graphql
# RUN npm install @nestjs/typeorm typeorm mysql @nestjs/graphql apollo-server-express @nestjs/apollo --save
# RUN npm install type-graphql --save
# for mail
# RUN npm install @nestjs-modules/mailer nodemailer --save
# RUN npm install pug --save


ENTRYPOINT [ "tail", "-f" ]


# RUN npm install @nestjs/graphql apollo-server-express graphql-tools graphql type-graphql --save
