const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(
    client,
    [{ topic: "payment_success", partition: 0 }],
    { autoCommit: true }
);

consumer.on("message", async (message) => {
    const paymentData = JSON.parse(message.value);
    console.log("Received Payment Event:", paymentData);

    // Further actions (e.g., update database, send email, trigger notifications)
});

consumer.on("error", (err) => {
    console.error("Kafka Consumer Error:", err);
});

console.log("Kafka Consumer Listening...");
