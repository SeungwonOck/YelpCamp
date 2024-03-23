const mongoose = require('mongoose');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const cities = require('./cities');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
   await Campground.deleteMany({});
   for(let i = 0; i < 200; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
        //YOUR USER ID
        author: '65f90048b56d7e92c0d42f6a',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eos quam magni recusandae vitae modi mollitia doloremque dolorum minima suscipit, sint fugiat. Tempore laboriosam, nostrum quo incidunt molestiae dignissimos totam?',
        price,
        geometry: { 
          type: 'Point', 
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude
          ]
        },
        image: [
          {
            url: 'https://res.cloudinary.com/dfpcvxbwo/image/upload/v1710908664/YelpCamp/azztcy0wazpc87xdasvi.jpg',
            filename: 'YelpCamp/azztcy0wazpc87xdasvi'
          },
          {
            url: 'https://res.cloudinary.com/dfpcvxbwo/image/upload/v1710908679/YelpCamp/cwkiovic29fxkvqnfapi.jpg',
            filename: 'YelpCamp/cwkiovic29fxkvqnfapi'
          },
          {
            url: 'https://res.cloudinary.com/dfpcvxbwo/image/upload/v1710908692/YelpCamp/sorzdthkstgyxx0kvgi8.jpg',
            filename: 'YelpCamp/sorzdthkstgyxx0kvgi8'
          }
          ]
    })
    await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});