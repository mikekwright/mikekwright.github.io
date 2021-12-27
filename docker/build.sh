#!/usr/bin/env bash

IMAGE_NAME=${IMAGE_NAME:-mikewright/website-builder}
TAG_NAME=${TAG_NAME:-hugo-0.74.3}

cd $(dirname $0)

docker build -t ${IMAGE_NAME}:${TAG_NAME} .
