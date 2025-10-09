import image1 from "@/public/image1.png";
import image2 from "@/public/image3.png";
import image3 from "@/public/image2.png";
// Inferred TypeScript interface based on the provided data structure
interface ColorAvailability {
  name: string;
  available: boolean;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  createdAt: number;
  updatedAt: number;
}

interface ShopdataProp {
  _id: string;
  name: string;
  images: string[];
  colors: ColorAvailability[];
  sizes: string[]; // This array is now category-specific
  price: number;
  discount: number;
  category:
  | "clothing"
  | "shoes"
  | "accessories"
  | "electronics"
  | "fitness"
  | "home"
  | "appliances"
  | "jewelry";
  stock: number;
  description: string;
  postedby: string;
  averageRating: number;
  numOfReviews: number;
  reviews: Review[];
  createdAt: number;
  updatedAt: number;
}

// Helper constants for mock data consistency
const NOW = 1759755000000;
const getTime = (offset: number) => NOW + offset;
const PLACEHOLDER_IMG =
  "https://placehold.co/400x400/101010/ffffff?text=Product+Image";
const CLOUDINARY_PLACEHOLDER =
  "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/placeholder.png";

export const products: ShopdataProp[] = [
  // 1. Clothing Product
  {
    _id: "prod1",
    name: "Elegant Dress",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759705611/products/ktor8xidww6c4vhq2yko.jpg",
    ],
    colors: [
      { name: "red", available: true },
      { name: "blue", available: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], // CLOTHING SIZES (S, M, L, XL variant)
    price: 45,
    discount: 10,
    category: "clothing",
    stock: 20,
    description: "Stylish and comfortable dress, perfect for any occasion.",
    postedby: "user1",
    averageRating: 4,
    numOfReviews: 2,
    reviews: [
      {
        user: "reviewer1",
        rating: 5,
        comment: "Love it!",
        createdAt: getTime(818),
        updatedAt: getTime(818),
      },
    ],
    createdAt: getTime(202),
    updatedAt: getTime(382),
  },
  // 2. Shoes Product
  {
    _id: "prod2",
    name: "Sporty Sneakers",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872768/products/igsvdsdkfoniewca8jkc.png",
    ],
    colors: [
      { name: "black", available: true },
      { name: "white", available: true },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"], // SHOE SIZES (Numerical)
    price: 60,
    discount: 5,
    category: "shoes",
    stock: 15,
    description: "Comfortable sneakers for daily wear and light running.",
    postedby: "user2",
    averageRating: 5,
    numOfReviews: 3,
    reviews: [
      {
        user: "reviewer2",
        rating: 5,
        comment: "Perfect fit!",
        createdAt: getTime(918),
        updatedAt: getTime(918),
      },
    ],
    createdAt: getTime(302),
    updatedAt: getTime(392),
  },
  // 3. Accessory Product (Wallet)
  {
    _id: "prod3",
    name: "Leather Bifold Wallet",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976867/pl2mzwq2y5b56o6vhx1f.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872627/products/oa2ulfo6egjfz6htwyjb.jpg",
    ],
    colors: [{ name: "brown", available: true }],
    sizes: ["One Size"], // ACCESSORIES SIZES
    price: 25,
    discount: 0,
    category: "accessories",
    stock: 50,
    description: "Genuine leather wallet with space for cards and cash.",
    postedby: "user3",
    averageRating: 4.5,
    numOfReviews: 4,
    reviews: [
      {
        user: "r3",
        rating: 5,
        comment: "High quality leather.",
        createdAt: getTime(1000),
        updatedAt: getTime(1000),
      },
    ],
    createdAt: getTime(500),
    updatedAt: getTime(1200),
  },
  // 4. Electronics Product
  {
    _id: "prod4",
    name: "Noise Cancelling Headphones",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976873/mf5slmzs5kzdohq637a5.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872769/products/elljrct6murffzjuquws.jpg",
    ],
    colors: [
      { name: "black", available: true },
      { name: "silver", available: false },
    ],
    sizes: ["One Size"],
    price: 150,
    discount: 20,
    category: "electronics",
    stock: 30,
    description:
      "Immersive audio experience with industry-leading noise cancellation.",
    postedby: "user4",
    averageRating: 4.8,
    numOfReviews: 10,
    reviews: [
      {
        user: "r4",
        rating: 5,
        comment: "Amazing sound and comfort.",
        createdAt: getTime(1500),
        updatedAt: getTime(1500),
      },
    ],
    createdAt: getTime(600),
    updatedAt: getTime(1800),
  },
  // 5. Fitness Product
  {
    _id: "prod5",
    name: "Premium Yoga Mat",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977978/hzgthhemwqqouep2fcco.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977485/cw4nlemlbmqcno7wo8yh.jpg",
    ],
    colors: [
      { name: "purple", available: true },
      { name: "green", available: true },
    ],
    sizes: ["Standard"],
    price: 35,
    discount: 5,
    category: "fitness",
    stock: 40,
    description: "Thick, non-slip mat for yoga, pilates, and floor exercises.",
    postedby: "user5",
    averageRating: 4.2,
    numOfReviews: 5,
    reviews: [
      {
        user: "r5",
        rating: 4,
        comment: "Good grip, slightly heavy.",
        createdAt: getTime(2000),
        updatedAt: getTime(2000),
      },
    ],
    createdAt: getTime(700),
    updatedAt: getTime(2200),
  },
  // 6. Clothing Product
  {
    _id: "prod6",
    name: "Abstract Graphic T-Shirt",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977371/n6sgane131g7iy25hlrx.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977371/vji5amvh9fvig0ehgi54.jpg",
    ],
    colors: [{ name: "white", available: true }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], // CLOTHING SIZES
    price: 20,
    discount: 10,
    category: "clothing",
    stock: 80,
    description: "Soft cotton tee with a unique, minimalist graphic print.",
    postedby: "user6",
    averageRating: 4.0,
    numOfReviews: 8,
    reviews: [
      {
        user: "r6",
        rating: 4,
        comment: "Design is sharp!",
        createdAt: getTime(2500),
        updatedAt: getTime(2500),
      },
    ],
    createdAt: getTime(800),
    updatedAt: getTime(2800),
  },
  // 7. NEW: Bag Product
  {
    _id: "prod7",
    name: "Sleek Leather Backpack",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977368/jzdzeixvwvxrykz7omi5.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753977367/i092caswsxyqgzotyvz1.jpg",
    ],
    colors: [
      { name: "camel", available: true },
      { name: "black", available: true },
    ],
    sizes: ["Small", "Medium", "Large"], // BAG SIZES (Small, Medium, Large)
    price: 85,
    discount: 10,
    category: "accessories",
    stock: 25,
    description:
      "A modern, minimalist backpack perfect for daily commute or travel.",
    postedby: "user7",
    averageRating: 4.5,
    numOfReviews: 12,
    reviews: [
      {
        user: "r7",
        rating: 5,
        comment: "Holds my laptop perfectly.",
        createdAt: getTime(3000),
        updatedAt: getTime(3000),
      },
    ],
    createdAt: getTime(900),
    updatedAt: getTime(3200),
  },
  // 8. Clothing Product (Jeans)
  {
    _id: "prod8",
    name: "Slim Fit Denim Jeans",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976939/er9jgpfdar16tkak7txx.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976918/zwchn4gpcorbbrb3qwa7.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976870/xmxyehsr6dge0nqcgyu7.jpg",
    ],
    colors: [
      { name: "dark wash", available: true },
      { name: "light wash", available: true },
    ],
    sizes: ["28", "30", "32", "34", "36"], // CLOTHING SIZES (Waist/Inseam)
    price: 75,
    discount: 0,
    category: "clothing",
    stock: 60,
    description: "Classic five-pocket slim fit jeans with stretch fabric.",
    postedby: "user8",
    averageRating: 4.7,
    numOfReviews: 15,
    reviews: [
      {
        user: "r8",
        rating: 5,
        comment: "Best jeans I've owned.",
        createdAt: getTime(3500),
        updatedAt: getTime(3500),
      },
    ],
    createdAt: getTime(1000),
    updatedAt: getTime(3800),
  },
  // 9. Appliances Product
  {
    _id: "prod9",
    name: "Single Serve Coffee Maker",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753976672/juukjtg3ide3ewjxuukz.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753975616/jjctipoeiwjlc07lnwy2.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753975569/qo0x5ivlrknjhgn6s5gq.jpg",
    ],
    colors: [{ name: "black", available: true }],
    sizes: ["Compact"],
    price: 99,
    discount: 10,
    category: "appliances",
    stock: 35,
    description: "Brew your favorite coffee quickly with single-serve pods.",
    postedby: "user9",
    averageRating: 4.6,
    numOfReviews: 9,
    reviews: [
      {
        user: "r9",
        rating: 5,
        comment: "Fast and easy to use.",
        createdAt: getTime(4000),
        updatedAt: getTime(4000),
      },
    ],
    createdAt: getTime(1100),
    updatedAt: getTime(4200),
  },
  // 10. Jewelry Product
  {
    _id: "prod10",
    name: "Sterling Silver Star Necklace",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1753975569/qo0x5ivlrknjhgn6s5gq.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1751987129/xrx4cz3yl7mpm5nmgg7k.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1741099315/qn5uatn9xguce9mhz0a0.png",
    ],
    colors: [{ name: "silver", available: true }],
    sizes: ["One Size (18 inch)"],
    price: 40,
    discount: 0,
    category: "jewelry",
    stock: 45,
    description: "Delicate necklace with a small star pendant.",
    postedby: "user10",
    averageRating: 5.0,
    numOfReviews: 1,
    reviews: [
      {
        user: "r10",
        rating: 5,
        comment: "Beautiful and shiny!",
        createdAt: getTime(4500),
        updatedAt: getTime(4500),
      },
    ],
    createdAt: getTime(1200),
    updatedAt: getTime(4800),
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
