const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
    console.log("Kafka Producer is ready");
});

producer.on("error", (err) => {
    console.error("Kafka Producer Error:", err);
});

const sendPaymentEvent = (message) => {
    const payloads = [
        {
            topic: "payment_success",
            messages: JSON.stringify(message),
        },
    ];
    console.log(payloads)

    producer.send(payloads, (err, data) => {
        if (err) console.error("Kafka Send Error:", err);
        else console.log("Payment Event Sent:", data);
    });
};

module.exports = { sendPaymentEvent };
