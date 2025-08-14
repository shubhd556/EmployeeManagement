// NodeTestMongo.js
import { MongoClient } from 'mongodb';

const uri =
  'mongodb+srv://sdudhal999:Sdudhal999@cluster1.qdqeyib.mongodb.net/?retryWrites=true&w=majority&appName=cluster1';

const client = new MongoClient(uri, {

  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000,
  // `mongodb+srv` uses TLS by default, so `tls: true` is optional
   tls: true,
});

try {
  await client.db('admin').command({ ping: 1 });
  console.log('✅ Connected and pinged your deployment!');
} catch (err) {
  console.error('❌ Connection failed:\n', err);
} finally {
  await client.close().catch(() => {});
}
