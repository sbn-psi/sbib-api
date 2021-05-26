#!/bin/bash

if [ -z "$1" ]; then
    echo "Missing SQL filename"
    exit 1
fi

docker exec -i sbib-db mysql sbib -uroot -pwxMahrbUGPHjkzMj4NNeQQPX < $1

echo "Done."

exit 0