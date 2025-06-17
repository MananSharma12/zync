import { prisma } from "@zync/shared";
import { Kafka } from "@zync/shared";

const TOPIC_NAME = "zap-events";
const kafka = new Kafka({
  clientId: "zync-outbox-processor",
  brokers: ["localhost:9092"]
});

async function main() {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                message: message.value.toString(),
            });

            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition,
                offset: (parseInt(message.offset) + 1).toString(),
            }])
        },
    })
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });