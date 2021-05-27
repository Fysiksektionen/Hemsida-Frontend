# Development containers

## VS Code
Make sure that you have [Docker](https://www.docker.com/get-started) and the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) package installed. Then open the main folder, and VS code should prompt you to start the development container. Alternatively, one can press F1, search for, and select `Remote-Containers: Open Folder in Container...`, and select the [main folder](/). Once the build is done, just press F5 to run. Note that pushing to GitHub generally cannot be done from inside the container.

## WebStorm
### Using Docker Compose
Make sure that you have [Docker](https://www.docker.com/get-started) and [Docker-Compose](https://docs.docker.com/compose/install/) installed.
Navigate to the [main folder](/) and run the following in the terminal: `docker-compose -f .devcontainer/docker-compose-dev.yml up`.
If you install new packages, you may need to run `docker-compose -f .devcontainer/docker-compose-dev.yml build` before running the above command.
### Without Docker Compose
Coming soon...
