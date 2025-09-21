#!/bin/bash
apt-get update -y;
apt-get install nginx -y;
cp /etc/nginx/sites-enabled/default /home/default;
service nginx restart;
