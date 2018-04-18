#!/usr/bin/env bash

cd up

docker-compose up -d

echo "Mongo is available on http://localhost:27017"
