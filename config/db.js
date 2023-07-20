import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log('MongoDB conectaddo en ' + url)
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
}

export default conectarDB