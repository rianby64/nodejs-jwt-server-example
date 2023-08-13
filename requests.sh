curl -X POST \
     -H "Content-Type: application/json" \
     -c cookie.txt \
     -d '{"username": "user1"}' \
     http://localhost:5000/api/v1/login -i

curl -X POST \
     -b cookie.txt \
     -H "x-xsrf-token: 07fbe2ab345d20c60209ee50b0873b45c5527eeebdf364a789d4caccfa9f2de9c10772c187997ca5dab4cc7657aebb561e9bdbc685d2b826b32f7615b01fe4c4" \
     http://localhost:5000/api/v1/private-endpoint
