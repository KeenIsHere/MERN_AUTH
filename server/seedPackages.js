import mongoose from 'mongoose';
import packageModel from './models/packageModel.js';
import userModel from './models/userModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const samplePackages = [
  {
    title: "Goa Beach Paradise - 5 Days",
    description: "Experience the ultimate beach vacation in Goa with pristine beaches, water sports, beach parties, and Portuguese heritage sites. Includes accommodation in beachfront resorts, all meals, and exciting water activities.",
    destination: "Goa",
    duration: { days: 5, nights: 4 },
    price: 15999,
    category: "beach",
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Arrival & Beach Sunset", activities: "Arrival at Goa, check-in at resort, evening at Calangute Beach, welcome dinner" },
      { day: 2, title: "Water Sports & Beach Hopping", activities: "Parasailing, jet skiing, visit Baga & Anjuna beaches, beach party" },
      { day: 3, title: "Heritage Tour", activities: "Old Goa churches, spice plantation visit, river cruise" },
      { day: 4, title: "South Goa Exploration", activities: "Palolem Beach, Agonda Beach, relaxation and spa" },
      { day: 5, title: "Departure", activities: "Leisure morning, checkout and departure" }
    ],
    inclusions: ["4-star beach resort accommodation", "All meals", "Water sports", "Sightseeing tours", "Airport transfers"],
    exclusions: ["Flight tickets", "Personal expenses", "Travel insurance"],
    availability: true,
    groupSize: 20,
    rating: 4.8,
    totalReviews: 156
  },
  {
    title: "Kerala Backwaters & Hill Stations - 7 Days",
    description: "Explore God's Own Country with serene backwaters, lush tea gardens, wildlife sanctuaries, and beautiful hill stations. Experience houseboat stay, Ayurvedic treatments, and traditional Kerala cuisine.",
    destination: "Kerala",
    duration: { days: 7, nights: 6 },
    price: 24999,
    category: "cultural",
    images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Arrival in Kochi", activities: "Airport pickup, hotel check-in, evening at Marine Drive, Chinese fishing nets" },
      { day: 2, title: "Kochi Sightseeing", activities: "Fort Kochi, Mattancherry Palace, Jewish Synagogue, Kathakali dance show" },
      { day: 3, title: "Munnar Tea Gardens", activities: "Drive to Munnar, tea plantation visit, Eravikulam National Park" },
      { day: 4, title: "Munnar Exploration", activities: "Echo Point, Mattupetty Dam, Top Station, tea museum" },
      { day: 5, title: "Alleppey Houseboat", activities: "Houseboat check-in, backwater cruise, village visit, overnight on houseboat" },
      { day: 6, title: "Kumarakom Bird Sanctuary", activities: "Bird watching, Ayurvedic massage, beach visit" },
      { day: 7, title: "Departure", activities: "Traditional Kerala breakfast, checkout, airport transfer" }
    ],
    inclusions: ["Hotels & houseboat stay", "All meals", "Sightseeing with guide", "All transfers", "Cultural shows"],
    exclusions: ["Airfare", "Beverages", "Tips", "Personal expenses"],
    availability: true,
    groupSize: 15,
    rating: 4.9,
    totalReviews: 203
  },
  {
    title: "Rajasthan Royal Heritage - 8 Days",
    description: "Journey through the land of kings with magnificent forts, palaces, desert safaris, and vibrant culture. Visit Jaipur, Udaipur, Jodhpur, and Jaisalmer with stays in heritage hotels.",
    destination: "Rajasthan",
    duration: { days: 8, nights: 7 },
    price: 32999,
    category: "cultural",
    images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Jaipur - Pink City", activities: "Arrival, Hawa Mahal, City Palace, local bazaar shopping" },
      { day: 2, title: "Jaipur Forts", activities: "Amber Fort, Jaigarh Fort, Nahargarh Fort, traditional dinner" },
      { day: 3, title: "Jodhpur - Blue City", activities: "Drive to Jodhpur, Mehrangarh Fort, Jaswant Thada, clock tower market" },
      { day: 4, title: "Udaipur - City of Lakes", activities: "Drive to Udaipur, City Palace, Lake Pichola boat ride" },
      { day: 5, title: "Udaipur Exploration", activities: "Jag Mandir, Saheliyon ki Bari, Bagore ki Haveli folk show" },
      { day: 6, title: "Jaisalmer - Golden City", activities: "Drive to Jaisalmer, Jaisalmer Fort, Patwon ki Haveli" },
      { day: 7, title: "Desert Safari", activities: "Sam Sand Dunes, camel safari, desert camp, cultural evening" },
      { day: 8, title: "Departure", activities: "Leisure morning, departure transfer" }
    ],
    inclusions: ["Heritage hotel stays", "All meals", "Desert camp experience", "All sightseeing", "Private AC vehicle"],
    exclusions: ["Flights", "Monument entry fees", "Camera charges", "Personal shopping"],
    availability: true,
    groupSize: 12,
    rating: 4.9,
    totalReviews: 178
  },
  {
    title: "Himachal Adventure Trek - 6 Days",
    description: "Thrilling adventure in the Himalayas with trekking, camping, river rafting, and paragliding. Perfect for adventure enthusiasts seeking mountain experiences in Manali and Kasol.",
    destination: "Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 18999,
    category: "adventure",
    images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Arrival in Manali", activities: "Delhi to Manali, check-in, Mall Road exploration, Hadimba Temple" },
      { day: 2, title: "Solang Valley Adventure", activities: "Paragliding, zorbing, cable car ride, skiing (seasonal)" },
      { day: 3, title: "Kasol Trek Start", activities: "Drive to Kasol, trek to Kheerganga, hot springs, camping" },
      { day: 4, title: "Trekking & Camping", activities: "Nature walks, riverside camping, bonfire, stargazing" },
      { day: 5, title: "River Rafting", activities: "Return trek, white water rafting in Beas river, local café hopping" },
      { day: 6, title: "Departure", activities: "Leisure morning, departure to Delhi" }
    ],
    inclusions: ["Accommodation in hotels & camps", "All meals during trek", "Adventure activities", "Trekking guide", "All transfers"],
    exclusions: ["Delhi-Manali transport", "Lunch on travel days", "Personal gear", "Insurance"],
    availability: true,
    groupSize: 18,
    rating: 4.7,
    totalReviews: 142
  },
  {
    title: "Kashmir Paradise - 6 Days",
    description: "Discover the heaven on earth with Dal Lake shikaras, Mughal gardens, snow-capped mountains, and houseboats. Experience Gulmarg, Pahalgam, and Srinagar's natural beauty.",
    destination: "Kashmir",
    duration: { days: 6, nights: 5 },
    price: 22999,
    category: "honeymoon",
    images: ["https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Srinagar Arrival", activities: "Airport pickup, Dal Lake Shikara ride, Mughal Gardens, houseboat stay" },
      { day: 2, title: "Gulmarg Meadows", activities: "Drive to Gulmarg, Gondola cable car, snow activities, scenic views" },
      { day: 3, title: "Gulmarg to Pahalgam", activities: "Valley of flowers, Betaab Valley, Aru Valley, riverside walks" },
      { day: 4, title: "Pahalgam Exploration", activities: "Chandanwari, Baisaran meadows, mini Switzerland, local markets" },
      { day: 5, title: "Return to Srinagar", activities: "Nishat Bagh, Shalimar Bagh, Tulip Garden, local shopping" },
      { day: 6, title: "Departure", activities: "Morning at leisure, airport transfer" }
    ],
    inclusions: ["Houseboat & hotel stays", "All meals", "Shikara rides", "Gondola tickets", "All transfers", "Sightseeing"],
    exclusions: ["Airfare", "Pony rides", "Adventure activities", "Personal expenses"],
    availability: true,
    groupSize: 10,
    rating: 4.9,
    totalReviews: 189
  },
  {
    title: "Uttarakhand Spiritual Tour - 7 Days",
    description: "Sacred journey through the land of Gods visiting Haridwar, Rishikesh, and the Char Dham. Experience yoga, meditation, Ganga Aarti, and spiritual awakening in the Himalayas.",
    destination: "Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 19999,
    category: "pilgrimage",
    images: ["https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Haridwar Arrival", activities: "Har Ki Pauri, Ganga Aarti, temple visits, evening prayers" },
      { day: 2, title: "Rishikesh Yoga", activities: "Beatles Ashram, Ram Jhula, Laxman Jhula, yoga session, river rafting" },
      { day: 3, title: "Kedarnath Journey", activities: "Drive to Gaurikund, trek/helicopter to Kedarnath, temple darshan" },
      { day: 4, title: "Badrinath Visit", activities: "Drive to Badrinath, Mana village, temple darshan, hot springs" },
      { day: 5, title: "Gangotri Dham", activities: "Journey to Gangotri, Ganga origin, temple visit, rituals" },
      { day: 6, title: "Yamunotri Dham", activities: "Trek to Yamunotri, hot water springs, temple darshan" },
      { day: 7, title: "Return & Departure", activities: "Return to Haridwar, final Ganga Aarti, departure" }
    ],
    inclusions: ["Simple lodging", "Vegetarian meals", "Temple darshan arrangements", "Guide services", "All transfers"],
    exclusions: ["Helicopter charges", "Pony/doli services", "Donations", "Personal expenses"],
    availability: true,
    groupSize: 25,
    rating: 4.8,
    totalReviews: 234
  },
  {
    title: "Andaman Island Escape - 6 Days",
    description: "Tropical paradise with pristine beaches, coral reefs, water sports, and marine life. Explore Port Blair, Havelock, and Neil Island with snorkeling and scuba diving experiences.",
    destination: "Andaman",
    duration: { days: 6, nights: 5 },
    price: 28999,
    category: "beach",
    images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Port Blair Arrival", activities: "Cellular Jail, Light & Sound Show, Corbyn's Cove Beach" },
      { day: 2, title: "Havelock Island", activities: "Ferry to Havelock, Radhanagar Beach, sunset, beach resort" },
      { day: 3, title: "Water Adventures", activities: "Scuba diving, snorkeling, Elephant Beach, water sports" },
      { day: 4, title: "Neil Island", activities: "Ferry to Neil, Natural Bridge, Laxmanpur Beach, coral viewing" },
      { day: 5, title: "Return to Port Blair", activities: "Ross Island, North Bay, glass boat ride, shopping" },
      { day: 6, title: "Departure", activities: "Leisure morning, airport transfer" }
    ],
    inclusions: ["Hotel & beach resort stays", "All inter-island ferries", "Breakfast & dinner", "Scuba diving", "Sightseeing tours"],
    exclusions: ["Flights", "Lunch", "Additional water sports", "Entry fees"],
    availability: true,
    groupSize: 16,
    rating: 4.9,
    totalReviews: 167
  },
  {
    title: "Leh Ladakh Bike Expedition - 10 Days",
    description: "Ultimate motorcycle adventure through the world's highest motorable passes. Experience Pangong Lake, Nubra Valley, monasteries, and breathtaking mountain landscapes.",
    destination: "Ladakh",
    duration: { days: 10, nights: 9 },
    price: 45999,
    category: "adventure",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"],
    itinerary: [
      { day: 1, title: "Leh Arrival", activities: "Acclimatization day, Leh market, Shanti Stupa, bike briefing" },
      { day: 2, title: "Leh Local", activities: "Monasteries, Leh Palace, Magnetic Hill, bike practice" },
      { day: 3, title: "Leh to Nubra Valley", activities: "Khardung La pass (18,380 ft), Diskit, Hunder sand dunes, camel ride" },
      { day: 4, title: "Nubra Exploration", activities: "Turtuk village, Sumur monastery, scenic valleys" },
      { day: 5, title: "Pangong Lake", activities: "Shyok route to Pangong, 3 Idiots spot, lakeside camping" },
      { day: 6, title: "Pangong to Leh", activities: "Chang La pass (17,590 ft), Thiksey monastery" },
      { day: 7, title: "Leh to Tso Moriri", activities: "Ride to Tso Moriri Lake, nomadic settlements" },
      { day: 8, title: "Tso Moriri to Leh", activities: "Return via scenic route, wildlife spotting" },
      { day: 9, title: "Reserve Day", activities: "Buffer for bad weather, local exploration" },
      { day: 10, title: "Departure", activities: "Bike return, airport transfer" }
    ],
    inclusions: ["Royal Enfield motorcycle", "Fuel", "Accommodation in hotels/camps", "All meals", "Support vehicle", "Permits", "Mechanic"],
    exclusions: ["Flights", "Bike damage costs", "Personal gear", "Insurance"],
    availability: true,
    groupSize: 12,
    rating: 4.9,
    totalReviews: 98
  }
];

const seedPackages = async () => {
  try {
    // Connect to MongoDB with the database name from .env
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
    console.log('Database:', mongoose.connection.db.databaseName);

    // Create or get admin user
    let adminUser = await userModel.findOne({ email: 'admin@ghummghamm.com' });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await userModel.create({
        name: 'Admin User',
        email: 'admin@ghummghamm.com',
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });
      console.log('✅ Admin user created:', adminUser.email);
    } else {
      console.log('✅ Admin user already exists:', adminUser.email);
    }

    // Add createdBy field to all packages
    const packagesWithAdmin = samplePackages.map(pkg => ({
      ...pkg,
      createdBy: adminUser._id
    }));

    // Clear existing packages
    const deletedCount = await packageModel.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount.deletedCount} existing packages`);

    // Insert sample packages
    const packages = await packageModel.insertMany(packagesWithAdmin);
    console.log(`\n✅ Successfully added ${packages.length} packages to the database\n`);

    packages.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.title}`);
      console.log(`   📍 ${pkg.destination} | 💰 ₹${pkg.price.toLocaleString()} | ⭐ ${pkg.rating}`);
    });

    // Verify packages in database
    const count = await packageModel.countDocuments();
    console.log(`\n✅ Total packages in database: ${count}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding packages:', error);
    process.exit(1);
  }
};

seedPackages();
