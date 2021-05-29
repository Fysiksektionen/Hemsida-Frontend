# To be run from inside the container.
json-server -H $(hostname -i) -p 3000 -w db.json