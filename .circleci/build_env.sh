#!/bin/bash

if [[ $REACT_APP_NODE_ENV == development ]]; then
  prefix="DEV_"
  echo "dev"

  for i in _ {a..z} {A..Z}; do
     for var in `eval echo \\${!$i@}`; do
          if [[ $var == DEV_REACT_APP* ]]; then
              envName=$var
              prefix_removed_env=${envName/#$prefix}
              echo "${prefix_removed_env}=${!var}"
              export "${prefix_removed_env}=${!var}"
            fi
     done
  done
fi

if [[ $REACT_APP_NODE_ENV == production ]]; then
  echo "prod"
  for i in _ {a..z} {A..Z}; do
     for var in `eval echo \\${!$i@}`; do
          if [[ $var == REACT_APP* ]]; then
              echo "${var}=${!var}"
              export "${var}=${!var}"
            fi
     done
  done
fi