# RabbitMQ

The RabbitMQ image extends the official management image and loads `definitions.json`. The file currently contains an empty definitions object; exchanges, queues, bindings, policies, and application consumers are not implemented yet.

Development exposes AMQP on `5672` and the management UI on `15672`. Production keeps both internal to the Compose network. Credentials come from Compose environment variables; see the [deployment guide](../docs/deployment.md).
