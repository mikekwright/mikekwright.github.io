#!/usr/bin/env bash

IMAGE_NAME=${IMAGE_NAME:-mikewright/website-builder}
TAG_NAME=${TAG_NAME:-hugo-0.74.3}

cd $(dirname $0)

./build.sh

docker tag ${IMAGE_NAME}:${TAG_NAME} ${IMAGE_NAME}:latest

docker push ${IMAGE_NAME}:${TAG_NAME}
docker push ${IMAGE_NAME}:latest
