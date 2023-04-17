docker run -it -v /Users/dongyoonkim/node/work:/root/work --name trans -p 3000:3000 mynode /bin/bash
docker start trans
docker exec -it trans /bin/bash
