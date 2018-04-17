#!/usr/bin/env bash

if [ -z "$1" ]
  then
    echo "No argument supplied"
fi

case $1 in
1)
  node run1.js
  ;;
2)
  node run2.js
  ;;
*)
  Message="Invalid argument"
  ;;
esac
