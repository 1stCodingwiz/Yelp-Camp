const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "67003cf8489b56f75e389869",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptatum, ab quidem repellat voluptatibus odio enim ipsa ut quaerat alias quisquam similique, doloribus natus adipisci rem tempora at aspernatur quos!",
            price,
            geometry: {
                "type":"Point", 
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxkyrtwrj/image/upload/v1728235654/YelpCamp/hmmldjeskobvdcl2p14q.webp',
                    filename: 'YelpCamp/hmmldjeskobvdcl2p14q'
                },
                {
                    url: 'https://res.cloudinary.com/dxkyrtwrj/image/upload/v1728235654/YelpCamp/nsmmh4cyxt3w8t2yjbt8.jpg',
                    filename: 'YelpCamp/nsmmh4cyxt3w8t2yjbt8'
                }
            ]
        });
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});
