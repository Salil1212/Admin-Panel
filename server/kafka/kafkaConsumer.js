const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "payment-group" });

const consumePaymentEvent = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "payment_success", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const paymentData = JSON.parse(message.value.toString());
      console.log("📩 Received Payment Event:", paymentData);

      // Further actions (e.g., update database, send notifications)
    },
  });
};

consumePaymentEvent();
