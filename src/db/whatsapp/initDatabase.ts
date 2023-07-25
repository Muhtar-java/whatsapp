import mongoose from 'mongoose';

const initDatabase = async (): Promise<void> => {
  const dbUri: string = 'mongodb+srv://Gekata:loke4ka12e@cluster0.itgxuv9.mongodb.net/Wp_bot';

  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export { initDatabase };
