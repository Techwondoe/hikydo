#!/bin/bash

serviceName=kydos
outputPath=../storn-out/kydos

# Begin script in case all parameters are correct

RED='\033[0;31m'
GREEN='\033[0;32m'
LIGHT_RED='\033[1;31m'
LIGHT_GRAY='\033[0;37m'
ORANGE='\033[0;33m'
NC='\033[0m'

# Ask for app information and settings
echo -e "$LIGHT_RED=======================================$NC"
echo -e "$LIGHT_RED     Building ${serviceName}           $NC"
echo -e "$LIGHT_RED=======================================$NC"

# Switch to the service directory

cd ${outputPath}

# Install all dependencies and build the project
yarn install
yarn build
yarn link

