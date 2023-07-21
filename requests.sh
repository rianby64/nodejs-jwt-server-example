curl -X POST \
     -H "Content-Type: application/json" \
     -c cookie.txt \
     -d '{"username": "user1"}' \
     http://localhost:5000/api/v1/login -i

curl -X POST \
     -b cookie.txt \
     -H "x-xsrf-token: f3180f68441a7d3c3a0c2e7812362574e60ba411794c8cb78759b80de896eeb3b1db467a977c607ffc86f11e4d58804d7afa2b39ebf4927e4236af71ae011f16" \
     http://localhost:5000/api/v1/private-endpoint
