#!/bin/bash
# execute this 
# $ chmod +x post.sh
# and then 
# $ ./posh.sh
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "nombre": "Gabriel", "apellido": "Garcia", "publicados": "26", "pais": "Colombia" }' \
  http://localhost:3000/authors

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "nombre": "Álvaro", "apellido": "Mutis", "publicados": "18", "pais": "Colombia" }' \
  http://localhost:3000/authors

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "nombre": "León de Greiff", "publicados": "15", "pais": "Colombia" }' \
  http://localhost:3000/authors

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "nombre": "Jorge Luis", "apellido": "Borges", "publicados": "20", "pais": "Argentina" }' \
  http://localhost:3000/authors


