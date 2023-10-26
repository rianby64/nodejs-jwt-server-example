rm -f cookie.txt;

response=$(curl -s -X POST \
     -H "Content-Type: application/json" \
     -c cookie.txt \
     -d '{"login": "user1", "password": "password-1"}' \
     'http://server-xsrf-token-example:5000/api/v1/login' -i); ## change server-xsrf-token-example to localhost based on the README.md

http_status_code=$(echo "$response" | grep -i "HTTP/1.1" | awk '{print $2}');

if [ "$http_status_code" -ne 200 ]; then
    echo "HTTP Status Code is not 200 OK: $http_status_code";
    exit 1;
fi

xsrf_token=$(echo "$response" | grep -o 'xsrf-token=[^;]*' | awk -F'=' '{print $2}');

curl -X POST \
     -b cookie.txt \
     -H "x-xsrf-token: $xsrf_token" \
     'http://server-xsrf-token-example:5000/api/v1/private-endpoint'; ## change server-xsrf-token-example to localhost based on the README.md
