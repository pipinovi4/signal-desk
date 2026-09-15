FROM rabbitmq:4-management-alpine

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
COPY definitions.json /etc/rabbitmq/definitions.json

HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD rabbitmq-diagnostics -q ping
