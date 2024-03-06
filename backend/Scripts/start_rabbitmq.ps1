docker volume create --name rabbitmq-volume
docker container rm rabbitmq
docker run --restart=always -p 5672:5672 -p 15672:15672 --name rabbitmq -v rabbitmq-volume:/var/lib/rabbitmq -d rabbitmq:3-management