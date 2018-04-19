#!/usr/bin/env bash

cd up

docker-compose up -d

echo "ArangoDB interface is available here: http://localhost:8529"