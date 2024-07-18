const mongoose = require('mongoose');
const db = require("../../config/db");
const User = require('./models/User');
const Destination = require('./models/Destination');
const Tour = require('./models/Tour');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const Image = require('./models/Image');

// Kết nối MongoDB
// db.connect();

const seedDB = async () => {
  // Xóa dữ liệu cũ
  await User.deleteMany({});
  await Destination.deleteMany({});
  await Tour.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});
  await Image.deleteMany({});

  // Tạo người dùng mẫu
  const users = await User.insertMany([
    {
      username: 'john_doe',
      password: 'hashed_password1',
      email: 'john@example.com',
      full_name: 'John Doe',
      phone_number: '1234567890'
    },
    {
      username: 'jane_doe',
      password: 'hashed_password2',
      email: 'jane@example.com',
      full_name: 'Jane Doe',
      phone_number: '0987654321'
    }
  ]);

  // Tạo địa điểm mẫu
  const destinations = await Destination.insertMany([
    {
      name: 'Paris',
      description: 'The capital city of France, known for its art, fashion, and culture.',
      location: 'France',
      best_time_to_visit: 'Spring and Autumn'
    },
    {
      name: 'Tokyo',
      description: 'The capital city of Japan, known for its modernity and traditional culture.',
      location: 'Japan',
      best_time_to_visit: 'Spring and Autumn'
    }
  ]);

  // Tạo tour mẫu
  const tours = await Tour.insertMany([
    {
      destination_id: destinations[0]._id,
      name: 'Paris City Tour',
      description: 'Explore the most famous sights of Paris in a day.',
      price: 199.99,
      duration: 1,
      start_date: new Date('2024-08-01'),
      end_date: new Date('2024-08-01')
    },
    {
      destination_id: destinations[1]._id,
      name: 'Tokyo Experience',
      description: 'A week-long tour of the best of Tokyo.',
      price: 1499.99,
      duration: 7,
      start_date: new Date('2024-09-01'),
      end_date: new Date('2024-09-08')
    }
  ]);

  // Tạo booking mẫu
  const bookings = await Booking.insertMany([
    {
      user_id: users[0]._id,
      tour_id: tours[0]._id,
      booking_date: new Date(),
      status: 'Confirmed'
    },
    {
      user_id: users[1]._id,
      tour_id: tours[1]._id,
      booking_date: new Date(),
      status: 'Pending'
    }
  ]);

  // Tạo review mẫu
  const reviews = await Review.insertMany([
    {
      user_id: users[0]._id,
      tour_id: tours[0]._id,
      rating: 5,
      comment: 'Amazing tour! Highly recommend.'
    },
    {
      user_id: users[1]._id,
      tour_id: tours[1]._id,
      rating: 4,
      comment: 'Great experience, but a bit expensive.'
    }
  ]);

  // Tạo hình ảnh mẫu
  const images = await Image.insertMany([
    {
      destination_id: destinations[0]._id,
      tour_id: tours[0]._id,
      image_url: 'http://example.com/paris1.jpg',
      description: 'Eiffel Tower in Paris'
    },
    {
      destination_id: destinations[1]._id,
      tour_id: tours[1]._id,
      image_url: 'http://example.com/tokyo1.jpg',
      description: 'Shibuya Crossing in Tokyo'
    }
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

module.exports = seedDB;
