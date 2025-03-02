const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const sendPaymentEvent = async (message) => {
  try {
    await producer.connect();
    await producer.send({
      topic: "payment_success",
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("✅ Payment Event Sent:", message);
    await producer.disconnect();
  } catch (error) {
    console.error("❌ Kafka Producer Error:", error);
  }
};

module.exports = { sendPaymentEvent };
