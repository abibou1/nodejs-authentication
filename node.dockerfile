FROM node:14.18.3-buster

RUN set -ex ; \
    apt update ; apt install -y vim net-tools sudo upx rsync bash-completion ; \
    npm install -g gatsby-cli ; \
    useradd -m test ; usermod -aG sudo test ; echo "test ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers ;\
    # default bash
    chsh -s /bin/bash ; chsh -s /bin/bash test ; \
    echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config ; \
    rm -rf /var/lib/apt/lists/*

USER test

WORKDIR /node
