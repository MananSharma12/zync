import { prisma } from "@zync/shared";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";
const kafka = new Kafka({
  clientId: "zync-outbox-processor",
  brokers: ["localhost:9092"]
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  const pendingRows = await prisma.zapRunOutbox.findMany({
    where: {},
    take: 10,
  });

  for (const item of pendingRows) {
    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map(r => ({
        value: r.zapRunId
      })),
    });
  }

  await prisma.zapRunOutbox.deleteMany({
    where: {
      id: {
        in: pendingRows.map(r => r.id),
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });