#!/bin/bash

EXIST_BLUE=$(docker-compose -p zokboo-backend-blue -f /build/backend/docker-compose.blue.yml ps | grep Up)

echo $EXIST_BLUE

if [ -z "$EXIST_BLUE" ]; then
        echo "Blue UP"
        docker-compose -p zokboo-backend-blue -f /build/backend/docker-compose.blue.yml up -d
        BEFORE_COMPOSE="green"
        AFTER_COMPOSE="blue"
else
        echo "Green UP"
        docker-compose -p zokboo-backend-green -f /build/backend/docker-compose.green.yml up -d
        BEFORE_COMPOSE="blue"
        AFTER_COMPOSE="green"
fi

sleep 10

EXIST_AFTER=$(docker-compose -p zokboo-backend-${AFTER_COMPOSE} -f /build/backend/docker-compose.${AFTER_COMPOSE}.yml ps | grep Up)
if [ -n "$EXIST_AFTER" ]; then
        cp /build/backend/nginx.${AFTER_COMPOSE}.conf /etc/nginx/sites-enabled/backend.conf
        nginx -s reload

        docker-compose -p zokboo-backend-${BEFORE_COMPOSE} -f /build/backend/docker-compose.${BEFORE_COMPOSE}.yml down
        echo "$BEFORE_COMPOSE down"
fi