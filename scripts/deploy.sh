#!/bin/bash

# Pull the latest image
docker pull ghcr.io/YOUR_GITHUB_USERNAME/Web:main

# Stop and remove the existing container if it exists
docker stop jump-game 2>/dev/null || true
docker rm jump-game 2>/dev/null || true

# Run the new container
docker run -d \
  --name jump-game \
  --restart unless-stopped \
  -p 3000:3000 \
  ghcr.io/YOUR_GITHUB_USERNAME/Web:main
