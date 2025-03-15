#!/bin/bash

# Configuration - Replace these with your Raspberry Pi details
PI_USER="ubuntu"
PI_HOST="your-pi-ip-address"
APP_DIR="/home/ubuntu/jump-game"

# Create directory on Pi
ssh $PI_USER@$PI_HOST "mkdir -p $APP_DIR"

# Copy files to Pi
scp -r ./* $PI_USER@$PI_HOST:$APP_DIR/

# SSH into Pi and set up the application
ssh $PI_USER@$PI_HOST << 'EOF'
    cd $APP_DIR
    
    # Install Docker if not already installed
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
    fi

    # Build and run the container
    sudo docker build -t jump-game .
    sudo docker stop jump-game 2>/dev/null || true
    sudo docker rm jump-game 2>/dev/null || true
    sudo docker run -d --name jump-game --restart unless-stopped -p 3000:3000 jump-game

    echo "Deployment complete! The game should be available at http://$(hostname -I | awk '{print $1}'):3000"
EOF
