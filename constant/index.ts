import image1 from "@/public/image1.png";
import image2 from "@/public/image3.png";
import image3 from "@/public/image2.png";
// Inferred TypeScript interface based on the provided data structure
// Inferred TypeScript interface based on the latest data structure
interface ColorAvailability {
  name: string;
  available: boolean;
  _id?: string; // Added _id based on the 'item' structure
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  createdAt: string; // Changed to ISO string
  updatedAt: string; // Changed to ISO string
}

export interface ShopdataProp {
  _id: string;
  name: string;
  images: string[];
  colors: ColorAvailability[];
  sizes: string[];
  price: number;
  discount: number;
  category: string;
  stock: number;
  description: string;
  postedby: string;
  averageRating: number;
  numOfReviews: number;
  reviews: Review[];
  createdAt: string; // Changed from number to ISO string
  updatedAt: string; // Changed from number to ISO string
  __v: number;      // New metadata field
  finalPrice: number; // New calculated field
  inStock: boolean; // New status field
  id: string;       // New field (often redundant with _id)
}

// Helper function to generate mock ISO date strings, mimicking your provided format
// The base time is set close to the timestamp in your 'item' object (Oct 2025)
const getISOString = (offsetMs: number = 0): string => {
  const baseTime = 1759872000000; // Base time for mock data (2025-10-07T21:20:00.000Z)
  const date = new Date(baseTime + offsetMs);
  return date.toISOString();
};

// --- Product Data Array ---
export const products: ShopdataProp[] = [
  // 1. Elegant Dress (Clothing)
  {
    _id: "68e58702e92cfa1ef8121243", // Used the new _id pattern
    name: "Elegant Dress",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759705611/products/ktor8xidww6c4vhq2yko.jpg",
    ],
    colors: [
      { name: "red", available: true, _id: "68e58702e92cfa1ef8121244" },
      { name: "blue", available: true, _id: "68e58702e92cfa1ef8121245" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: 45,
    discount: 10,
    category: "clothing",
    stock: 20,
    description: "Stylish and comfortable dress, perfect for any occasion.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4,
    numOfReviews: 2,
    reviews: [
      { user: "reviewer1", rating: 5, comment: "Love it!", createdAt: getISOString(1000), updatedAt: getISOString(1000) },
    ],
    createdAt: getISOString(0),
    updatedAt: getISOString(300),
    __v: 0,
    finalPrice: 40.50, // Calculated: 45 - (45 * 0.10)
    inStock: true,
    id: "68e58702e92cfa1ef8121243",
  },
  // 2. Sporty Sneakers (Shoes)
  {
    _id: "68e58702e92cfa1ef8121247",
    name: "Sporty Sneakers",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872768/products/igsvdsdkfoniewca8jkc.png",
    ],
    colors: [
      { name: "black", available: true, _id: "68e58702e92cfa1ef8121248" },
      { name: "white", available: true, _id: "68e58702e92cfa1ef8121249" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    price: 60,
    discount: 5,
    category: "shoes",
    stock: 15,
    description: "Comfortable sneakers for daily wear and light running.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 5,
    numOfReviews: 3,
    reviews: [
      { user: "reviewer2", rating: 5, comment: "Perfect fit!", createdAt: getISOString(2000), updatedAt: getISOString(2000) },
    ],
    createdAt: getISOString(100),
    updatedAt: getISOString(400),
    __v: 0,
    finalPrice: 57, // Calculated: 60 - (60 * 0.05)
    inStock: true,
    id: "68e58702e92cfa1ef8121247",
  },
  // 3. Leather Bifold Wallet (Accessories)
  {
    _id: "68e58702e92cfa1ef812124a",
    name: "Leather Bifold Wallet",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976867/pl2mzwq2y5b56o6vhx1f.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872627/products/oa2ulfo6egjfz6htwyjb.jpg",
    ],
    colors: [{ name: "brown", available: true, _id: "68e58702e92cfa1ef812124b" }],
    sizes: ["One Size"],
    price: 25,
    discount: 0,
    category: "accessories",
    stock: 50,
    description: "Genuine leather wallet with space for cards and cash.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.5,
    numOfReviews: 4,
    reviews: [
      { user: "r3", rating: 5, comment: "High quality leather.", createdAt: getISOString(3000), updatedAt: getISOString(3000) },
    ],
    createdAt: getISOString(200),
    updatedAt: getISOString(500),
    __v: 0,
    finalPrice: 25,
    inStock: true,
    id: "68e58702e92cfa1ef812124a",
  },
  // 4. Noise Cancelling Headphones (Electronics)
  {
    _id: "68e58702e92cfa1ef812124c",
    name: "Noise Cancelling Headphones",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976873/mf5slmzs5kzdohq637a5.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872769/products/elljrct6murffzjuquws.jpg",
    ],
    colors: [
      { name: "black", available: true, _id: "68e58702e92cfa1ef812124d" },
      { name: "silver", available: false, _id: "68e58702e92cfa1ef812124e" },
    ],
    sizes: ["One Size"],
    price: 150,
    discount: 20,
    category: "electronics",
    stock: 30,
    description: "Immersive audio experience with industry-leading noise cancellation.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.8,
    numOfReviews: 10,
    reviews: [
      { user: "r4", rating: 5, comment: "Amazing sound and comfort.", createdAt: getISOString(4000), updatedAt: getISOString(4000) },
    ],
    createdAt: getISOString(300),
    updatedAt: getISOString(600),
    __v: 0,
    finalPrice: 120, // Calculated: 150 - (150 * 0.20)
    inStock: true,
    id: "68e58702e92cfa1ef812124c",
  },
  // 5. Premium Yoga Mat (Fitness)
  {
    _id: "68e58702e92cfa1ef812124f",
    name: "Premium Yoga Mat",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977978/hzgthhemwqqouep2fcco.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977485/cw4nlemlbmqcno7wo8yh.jpg",
    ],
    colors: [
      { name: "purple", available: true, _id: "68e58702e92cfa1ef8121250" },
      { name: "green", available: true, _id: "68e58702e92cfa1ef8121251" },
    ],
    sizes: ["Standard"],
    price: 35,
    discount: 5,
    category: "fitness",
    stock: 40,
    description: "Thick, non-slip mat for yoga, pilates, and floor exercises.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.2,
    numOfReviews: 5,
    reviews: [
      { user: "r5", rating: 4, comment: "Good grip, slightly heavy.", createdAt: getISOString(5000), updatedAt: getISOString(5000) },
    ],
    createdAt: getISOString(400),
    updatedAt: getISOString(700),
    __v: 0,
    finalPrice: 33.25, // Calculated: 35 - (35 * 0.05)
    inStock: true,
    id: "68e58702e92cfa1ef812124f",
  },
  // 6. Abstract Graphic T-Shirt (Clothing)
  {
    _id: "68e58702e92cfa1ef8121252",
    name: "Abstract Graphic T-Shirt",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977371/n6sgane131g7iy25hlrx.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977371/vji5amvh9fvig0ehgi54.jpg",
    ],
    colors: [{ name: "white", available: true, _id: "68e58702e92cfa1ef8121253" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: 20,
    discount: 10,
    category: "clothing",
    stock: 80,
    description: "Soft cotton tee with a unique, minimalist graphic print.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.0,
    numOfReviews: 8,
    reviews: [
      { user: "r6", rating: 4, comment: "Design is sharp!", createdAt: getISOString(6000), updatedAt: getISOString(6000) },
    ],
    createdAt: getISOString(500),
    updatedAt: getISOString(800),
    __v: 0,
    finalPrice: 18, // Calculated: 20 - (20 * 0.10)
    inStock: true,
    id: "68e58702e92cfa1ef8121252",
  },
  // 7. Sleek Leather Backpack (Accessories/Bag)
  {
    _id: "68e58702e92cfa1ef8121254",
    name: "Sleek Leather Backpack",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977368/jzdzeixvwvxrykz7omi5.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977367/i092caswsxyqgzotyvz1.jpg",
    ],
    colors: [
      { name: "camel", available: true, _id: "68e58702e92cfa1ef8121255" },
      { name: "black", available: true, _id: "68e58702e92cfa1ef8121256" },
    ],
    sizes: ["Small", "Medium", "Large"], // BAG SIZES
    price: 85,
    discount: 10,
    category: "accessories",
    stock: 0, // Set to 0 to test 'inStock: false' logic
    description: "A modern, minimalist backpack perfect for daily commute or travel.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.5,
    numOfReviews: 12,
    reviews: [
      { user: "r7", rating: 5, comment: "Holds my laptop perfectly.", createdAt: getISOString(7000), updatedAt: getISOString(7000) },
    ],
    createdAt: getISOString(600),
    updatedAt: getISOString(900),
    __v: 0,
    finalPrice: 76.50, // Calculated: 85 - (85 * 0.10)
    inStock: false, // Should be false due to stock: 0
    id: "68e58702e92cfa1ef8121254",
  },
  // 8. Slim Fit Denim Jeans (Clothing)
  {
    _id: "68e58702e92cfa1ef8121257",
    name: "Slim Fit Denim Jeans",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976939/er9jgpfdar16tkak7txx.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976918/zwchn4gpcorbbrb3qwa7.jpg",
    ],
    colors: [
      { name: "dark wash", available: true, _id: "68e58702e92cfa1ef8121258" },
      { name: "light wash", available: true, _id: "68e58702e92cfa1ef8121259" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    price: 75,
    discount: 0,
    category: "clothing",
    stock: 60,
    description: "Classic five-pocket slim fit jeans with stretch fabric.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.7,
    numOfReviews: 15,
    reviews: [
      { user: "r8", rating: 5, comment: "Best jeans I've owned.", createdAt: getISOString(8000), updatedAt: getISOString(8000) },
    ],
    createdAt: getISOString(700),
    updatedAt: getISOString(1000),
    __v: 0,
    finalPrice: 75,
    inStock: true,
    id: "68e58702e92cfa1ef8121257",
  },
  // 9. Single Serve Coffee Maker (Appliances)
  {
    _id: "68e58702e92cfa1ef812125a",
    name: "Single Serve Coffee Maker",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976672/juukjtg3ide3ewjxuukz.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753975616/jjctipoeiwjlc07lnwy2.jpg",
    ],
    colors: [{ name: "black", available: true, _id: "68e58702e92cfa1ef812125b" }],
    sizes: ["Compact"],
    price: 99,
    discount: 10,
    category: "appliances",
    stock: 35,
    description: "Brew your favorite coffee quickly with single-serve pods.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 4.6,
    numOfReviews: 9,
    reviews: [
      { user: "r9", rating: 5, comment: "Fast and easy to use.", createdAt: getISOString(9000), updatedAt: getISOString(9000) },
    ],
    createdAt: getISOString(800),
    updatedAt: getISOString(1100),
    __v: 0,
    finalPrice: 89.10, // Calculated: 99 - (99 * 0.10)
    inStock: true,
    id: "68e58702e92cfa1ef812125a",
  },
  // 10. Sterling Silver Star Necklace (Jewelry)
  {
    _id: "68e58702e92cfa1ef812125c",
    name: "Sterling Silver Star Necklace",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753975569/qo0x5ivlrknjhgn6s5gq.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1751987129/xrx4cz3yl7mpm5nmgg7k.jpg",
    ],
    colors: [{ name: "silver", available: true, _id: "68e58702e92cfa1ef812125d" }],
    sizes: ["One Size (18 inch)"],
    price: 40,
    discount: 0,
    category: "jewelry",
    stock: 45,
    description: "Delicate necklace with a small star pendant.",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 5.0,
    numOfReviews: 1,
    reviews: [
      { user: "r10", rating: 5, comment: "Beautiful and shiny!", createdAt: getISOString(10000), updatedAt: getISOString(10000) },
    ],
    createdAt: getISOString(900),
    updatedAt: getISOString(1200),
    __v: 0,
    finalPrice: 40,
    inStock: true,
    id: "68e58702e92cfa1ef812125c",
  },
];

export const cat = [
  {
    _id: "1",
    image: image1.src,
    slug: "clothing",
    name: "clothing",
  },
  {
    _id: "2",
    image:
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    slug: "electronics",
    name: "electronics",
  },
  {
    _id: "3",
    image:
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    slug: "beauty",
    name: "beauty",
  },
  {
    _id: "4",
    image:
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    slug: "books",
    name: "books",
  },
  {
    _id: "5",
    image:
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    slug: "home",
    name: "home",
  },
  {
    _id: "6",
    image:
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    slug: "toys",
    name: "toys",
  },
  {
    _id: "7",
    image:
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    slug: "sports",
    name: "sports",
  },
  {
    _id: "8",
    image: image2.src,
    slug: "bags",
    name: "bags",
  },
  {
    _id: "9",
    image: image3.src,
    slug: "shoes",
    name: "shoes",
  },
];


export interface CategoryProp {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
