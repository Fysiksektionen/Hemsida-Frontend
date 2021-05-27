if [[ $(pwd) =~ (.devcontainer) ]]; then
    docker run -d -p 3000:3000 -v $(pwd):/home/fsh/ -e NODE_ENV=development --name=fsh-frontend-dev fsh:frontend-dev
else
    docker run -d -p 3000:3000 -v $(pwd)/..:/home/fsh/ -e NODE_ENV=development --name=fsh-frontend-dev fsh:frontend-dev
fi