# This new setup uses Hugo, so lets add the hugo image for building
FROM klakegg/hugo:0.74.3-ubuntu

RUN apt-get update \
    && apt-get install -y python3-pip \
    && apt-get clean \
    && rm -rf /tmp /var/tmp

RUN pip3 install nb2hugo jupyter
