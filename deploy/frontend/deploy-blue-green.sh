#!/bin/bash

EXIST_BLUE=$(docker-compose -p zokboo-frontend-blue -f /build/frontend/docker-compose.blue.yml ps | grep Up)

echo $EXIST_BLUE

if [ -z "$EXIST_BLUE" ]; then
  echo "Blue UP"
  docker-compose -p zokboo-frontend-blue -f /build/frontend/docker-compose.blue.yml up -d
  BEFORE_COMPOSE="green"
  AFTER_COMPOSE="blue"
else
  echo "Green UP"
  docker-compose -p zokboo-frontend-green -f /build/frontend/docker-compose.green.yml up -d
  BEFORE_COMPOSE="blue"
  AFTER_COMPOSE="green"
fi

sleep 10

EXIST_AFTER=$(docker-compose -p zokboo-frontend-${AFTER_COMPOSE} -f /build/frontend/docker-compose.${AFTER_COMPOSE}.yml ps | grep Up)
if [ -n "$EXIST_AFTER" ]; then
  cp /build/frontend/nginx.${AFTER_COMPOSE}.conf /etc/nginx/sites-enabled/frontend.conf
  nginx -s reload

  docker-compose -p zokboo-frontend-${BEFORE_COMPOSE} -f /build/frontend/docker-compose.${BEFORE_COMPOSE}.yml down
  echo "$BEFORE_COMPOSE down"
fi