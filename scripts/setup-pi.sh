#!/bin/bash

# Create directories
mkdir -p ~/scripts

# Copy deployment script
cp deploy.sh ~/scripts/
chmod +x ~/scripts/deploy.sh

# Set up systemd service
sudo cp jump-game.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable jump-game
sudo systemctl start jump-game

# Create GitHub token file
echo "Please enter your GitHub Personal Access Token:"
read -s token
echo $token > ~/.github-token

# Log into GitHub Container Registry
echo $token | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

echo "Setup complete! The service will automatically pull and run new versions of the game."
