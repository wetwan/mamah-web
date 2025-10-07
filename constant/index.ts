
import image1 from "@/public/image1.png";
import image2 from "@/public/image3.png";
import image3 from "@/public/image2.png";
export interface shopdataProp {
  _id: string;
  name: string;
  images: string[];
  colors: {
    name: string;
    available: boolean;
  }[];
  sizes: string[];
  price: number;
  discount: number;
  category: string;
  stock: number;
  description: string;
  postedby: string;
  averageRating: number;
  numOfReviews: number;
  reviews: {
    user: string;
    rating: number;
    comment: string;
    createdAt: number;
    updatedAt: number;
  }[];
  createdAt: number;
  updatedAt: number;
}

export const shopdata: shopdataProp[] = [
  {
    _id: "prod1",
    name: "Elegant Dress",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "red", available: true },
      { name: "blue", available: true },
    ],
    sizes: ["S", "M", "L"],
    price: 45,
    discount: 10,
    category: "clothing",
    stock: 20,
    description: "Stylish and comfortable dress",
    postedby: "user1",
    averageRating: 4,
    numOfReviews: 2,
    reviews: [
      {
        user: "reviewer1",
        rating: 5,
        comment: "Love it!",
        createdAt: 1759747029114,
        updatedAt: 1759747029114,
      },
    ],
    createdAt: 1759738848302,
    updatedAt: 1759754409935,
  },
  {
    _id: "prod2",
    name: "Sporty Sneakers",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "black", available: true },
      { name: "white", available: true },
    ],
    sizes: ["M", "L"],
    price: 60,
    discount: 5,
    category: "shoes",
    stock: 15,
    description: "Comfortable sneakers for daily wear",
    postedby: "user2",
    averageRating: 5,
    numOfReviews: 3,
    reviews: [
      {
        user: "reviewer2",
        rating: 5,
        comment: "Perfect fit!",
        createdAt: 1759747029214,
        updatedAt: 1759747029214,
      },
    ],
    createdAt: 1759738848402,
    updatedAt: 1759754409945,
  },
  {
    _id: "prod3",
    name: "Leather Handbag",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "brown", available: true },
      { name: "black", available: true },
    ],
    sizes: ["One Size"],
    price: 80,
    discount: 0,
    category: "bags",
    stock: 10,
    description: "Premium leather handbag",
    postedby: "user3",
    averageRating: 5,
    numOfReviews: 1,
    reviews: [
      {
        user: "reviewer3",
        rating: 5,
        comment: "High quality!",
        createdAt: 1759747029314,
        updatedAt: 1759747029314,
      },
    ],
    createdAt: 1759738848502,
    updatedAt: 1759754409955,
  },
  {
    _id: "prod4",
    name: "Wireless Earbuds",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "white", available: true },
      { name: "black", available: true },
    ],
    sizes: ["One Size"],
    price: 120,
    discount: 15,
    category: "electronics",
    stock: 25,
    description: "Noise-cancelling wireless earbuds",
    postedby: "user4",
    averageRating: 4,
    numOfReviews: 4,
    reviews: [
      {
        user: "reviewer4",
        rating: 4,
        comment: "Great sound quality",
        createdAt: 1759747029414,
        updatedAt: 1759747029414,
      },
    ],
    createdAt: 1759738848602,
    updatedAt: 1759754409965,
  },
  {
    _id: "prod5",
    name: "Yoga Mat",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "green", available: true },
      { name: "purple", available: true },
    ],
    sizes: ["Standard"],
    price: 25,
    discount: 0,
    category: "sports",
    stock: 30,
    description: "Eco-friendly yoga mat",
    postedby: "user5",
    averageRating: 5,
    numOfReviews: 2,
    reviews: [
      {
        user: "reviewer5",
        rating: 5,
        comment: "Very durable!",
        createdAt: 1759747029514,
        updatedAt: 1759747029514,
      },
    ],
    createdAt: 1759738848702,
    updatedAt: 1759754409975,
  },
  {
    _id: "prod6",
    name: "Kids Puzzle",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [{ name: "multicolor", available: true }],
    sizes: ["Standard"],
    price: 15,
    discount: 0,
    category: "toys",
    stock: 40,
    description: "Fun and educational puzzle",
    postedby: "user6",
    averageRating: 4,
    numOfReviews: 3,
    reviews: [
      {
        user: "reviewer6",
        rating: 4,
        comment: "Kids love it!",
        createdAt: 1759747029614,
        updatedAt: 1759747029614,
      },
    ],
    createdAt: 1759738848802,
    updatedAt: 1759754409985,
  },
  {
    _id: "prod7",
    name: "Scented Candle",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "white", available: true },
      { name: "yellow", available: true },
    ],
    sizes: ["Standard"],
    price: 12,
    discount: 0,
    category: "home",
    stock: 50,
    description: "Aromatic scented candle",
    postedby: "user7",
    averageRating: 5,
    numOfReviews: 1,
    reviews: [
      {
        user: "reviewer7",
        rating: 5,
        comment: "Smells amazing!",
        createdAt: 1759747029714,
        updatedAt: 1759747029714,
      },
    ],
    createdAt: 1759738848902,
    updatedAt: 1759754409995,
  },
  {
    _id: "prod8",
    name: "Novel Book",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [{ name: "n/a", available: true }],
    sizes: ["Standard"],
    price: 18,
    discount: 0,
    category: "books",
    stock: 60,
    description: "Bestselling fiction novel",
    postedby: "user8",
    averageRating: 5,
    numOfReviews: 2,
    reviews: [
      {
        user: "reviewer8",
        rating: 5,
        comment: "Couldn't put it down!",
        createdAt: 1759747029814,
        updatedAt: 1759747029814,
      },
    ],
    createdAt: 1759738849002,
    updatedAt: 1759754410005,
  },
  {
    _id: "prod9",
    name: "Face Cream",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [{ name: "white", available: true }],
    sizes: ["50ml"],
    price: 30,
    discount: 5,
    category: "beauty",
    stock: 35,
    description: "Hydrating face cream",
    postedby: "user9",
    averageRating: 4,
    numOfReviews: 2,
    reviews: [
      {
        user: "reviewer9",
        rating: 4,
        comment: "Feels great!",
        createdAt: 1759747029914,
        updatedAt: 1759747029914,
      },
    ],
    createdAt: 1759738849102,
    updatedAt: 1759754410015,
  },
  {
    _id: "prod10",
    name: "Bluetooth Speaker",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
    ],
    colors: [
      { name: "black", available: true },
      { name: "blue", available: true },
    ],
    sizes: ["Standard"],
    price: 55,
    discount: 10,
    category: "electronics",
    stock: 20,
    description: "Portable Bluetooth speaker",
    postedby: "user10",
    averageRating: 5,
    numOfReviews: 3,
    reviews: [
      {
        user: "reviewer10",
        rating: 5,
        comment: "Amazing sound!",
        createdAt: 1759747030014,
        updatedAt: 1759747030014,
      },
    ],
    createdAt: 1759738849202,
    updatedAt: 1759754410025,
  },
];

export const cat = [
  {
    _id: "1",
    image:
      image1.src,
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
    image:
      image2.src,
    slug: "bags",
    name: "bags",
  },
  {
    _id: "9",
    image:
      image3.src,
    slug: "shoes",
    name: "shoes",
  },
];
