#!/bin/bash

if [ -z "$1" ]; then
    echo "Missing SQL filename"
    exit 1
fi

docker exec -i sbib-mysql mysql -usbib -ppassword sbib < $1

echo "Done."

exit 0