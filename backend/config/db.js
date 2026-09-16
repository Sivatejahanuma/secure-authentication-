const mongoose = require('mongoose');

let memoryServerInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    // Attempt connection to the provided MONGO_URI
    if (uri && !uri.includes('your_mongodb_connection_string')) {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000, // Quick timeout to fallback cleanly if local daemon isn't up
      });
      console.log(`[Database] Connected successfully to MongoDB: ${mongoose.connection.host}`);
      return;
    }
  } catch (err) {
    console.warn(`[Database] Direct MongoDB connection failed (${err.message}).`);
    console.warn('[Database] Initializing embedded high-performance MongoDB instance...');
  }

  // Graceful fallback to embedded MongoMemoryServer for flawless zero-config local testing
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServerInstance = await MongoMemoryServer.create();
    const memoryUri = memoryServerInstance.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[Database] Connected to Embedded MongoDB Server: ${memoryUri}`);
  } catch (fallbackError) {
    console.error('[Database] Fatal: Unable to initialize any MongoDB connection.', fallbackError);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (memoryServerInstance) {
      await memoryServerInstance.stop();
    }
    console.log('[Database] Disconnected from MongoDB.');
  } catch (err) {
    console.error('[Database] Error during disconnect:', err.message);
  }
};

module.exports = { connectDB, disconnectDB };
