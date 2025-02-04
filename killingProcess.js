console.log("Task started...");
setTimeout(() => {
  console.log("Task completed. Exiting process.");
  process.exit(0); // 0 means success, 1 means failure
}, 3000);

process.on("SIGINT", () => {
  console.log("Received SIGINT. Cleaning up before exit...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully...");
  process.exit(0);
});

console.log("Process running... Press Ctrl + C to stop.");
setInterval(() => {}, 1000); // Keeps the process alive
