import { prisma } from "@zync/shared";

async function main() {
  console.log("Processor started");
  
  // Example: Process ZapRunOutbox items
  const outboxItems = await prisma.zapRunOutbox.findMany({
    include: {
      zapRun: true
    }
  });
  
  console.log(`Found ${outboxItems.length} items in outbox`);
  
  // Process each item
  for (const item of outboxItems) {
    console.log(`Processing run: ${item.zapRunId}`);
    // Add your processing logic here
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });