import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://preetyakshat:k7SkhjjDzhcgT3OT@jobnest.7phdo.mongodb.net/?retryWrites=true&w=majority&appName=JOBNEST',{
      useNewUrlParser: true, // Set this to true
      useUnifiedTopology: true, // Set this to true
    });
    console.log(`MongoDB connected:"Successfully connected to mongo" ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
