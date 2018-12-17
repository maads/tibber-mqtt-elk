

Environment variables:

  - TIBBER_MQTT (required) - address to mqtt server i.e. mqtt://10.0.1.1:1883
  - TIBBER_ELASTIC (required) - address to Elastic Search instance i.e 10.0.1.2:9200
  - TIBBER_MQTT_TOPIC (optional) - topic to listen to. Default 'ams'



example mqtt server to read values from:

    sudo docker run -d -p 1883:1883 --name mqtt ncarlier/mqtt


