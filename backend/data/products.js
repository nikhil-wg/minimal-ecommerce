export const products = [
  // Electronics
  { 
    id: 1, 
    name: "MacBook Pro 14\"", 
    price: 189990, 
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD",
    category: "Electronics"
  },
  
  { 
    id: 3, 
    name: "Sony WH-1000XM5", 
    price: 29990, 
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    description: "Wireless Noise Cancelling Headphones",
    category: "Electronics"
  },
  { 
    id: 4, 
    name: "Apple Watch Series 9", 
    price: 41900, 
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    description: "45mm GPS + Cellular, Midnight Aluminum",
    category: "Electronics"
  },
  { 
    id: 5, 
    name: "Logitech MX Keys", 
    price: 12995, 
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    description: "Wireless Illuminated Keyboard",
    category: "Electronics"
  },
  { 
    id: 6, 
    name: "iPad Air 11\"", 
    price: 59900, 
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    description: "M2 chip, 128GB, Wi-Fi, Space Gray",
    category: "Electronics"
  },
  { 
    id: 7, 
    name: "Samsung Galaxy Tab S9", 
    price: 74999, 
    imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
    description: "11\", 128GB, Graphite",
    category: "Electronics"
  },
  { 
    id: 8, 
    name: "AirPods Pro (2nd Gen)", 
    price: 24900, 
    imageUrl: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
    description: "Active Noise Cancellation, USB-C",
    category: "Electronics"
  },
  { 
    id: 9, 
    name: "Dell UltraSharp 27\"", 
    price: 45999, 
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    description: "4K USB-C Hub Monitor",
    category: "Electronics"
  },
  { 
    id: 10, 
    name: "Logitech MX Master 3S", 
    price: 8995, 
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    description: "Wireless Performance Mouse",
    category: "Electronics"
  },

  // Cameras & Photography
  { 
    id: 11, 
    name: "Sony Alpha A7 IV", 
    price: 239990, 
    imageUrl: "https://images.unsplash.com/photo-1606828664834-9fbb0efb4d7c?w=400&h=400&fit=crop",
    description: "Full-frame mirrorless camera body",
    category: "Cameras"
  },
  { 
    id: 12, 
    name: "Canon EOS R6 Mark II", 
    price: 279990, 
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    description: "24.2MP Full Frame Camera",
    category: "Cameras"
  },
  { 
    id: 13, 
    name: "GoPro Hero 12 Black", 
    price: 44990, 
    imageUrl: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop",
    description: "Action Camera with 5.3K60 Video",
    category: "Cameras"
  },

  // Smart Home
  { 
    id: 14, 
    name: "Amazon Echo Dot (5th Gen)", 
    price: 5499, 
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop",
    description: "Smart Speaker with Alexa",
    category: "Smart Home"
  },
  { 
    id: 15, 
    name: "Philips Hue Starter Kit", 
    price: 12999, 
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Smart LED Bulbs (4 pack + Bridge)",
    category: "Smart Home"
  },
  { 
    id: 16, 
    name: "Ring Video Doorbell", 
    price: 8999, 
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop",
    description: "1080p HD Video, Motion Detection",
    category: "Smart Home"
  },

  // Gaming
  { 
    id: 17, 
    name: "PlayStation 5", 
    price: 54990, 
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    description: "Disc Edition Gaming Console",
    category: "Gaming"
  },
  { 
    id: 18, 
    name: "Xbox Series X", 
    price: 52990, 
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    description: "1TB Gaming Console",
    category: "Gaming"
  },
  { 
    id: 19, 
    name: "Nintendo Switch OLED", 
    price: 34999, 
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
    description: "Neon Red/Blue Joy-Con",
    category: "Gaming"
  },
  { 
    id: 20, 
    name: "Razer BlackWidow V4", 
    price: 18999, 
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
    description: "Mechanical Gaming Keyboard, RGB",
    category: "Gaming"
  },
  
  // Additional Tech Products
  { 
    id: 21, 
    name: "Samsung 55\" QLED TV", 
    price: 89990, 
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    description: "4K Smart TV with Quantum Dot",
    category: "Electronics"
  },
  { 
    id: 22, 
    name: "Bose SoundLink Flex", 
    price: 14900, 
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Portable Bluetooth Speaker",
    category: "Electronics"
  },
  { 
    id: 23, 
    name: "DJI Mini 3 Pro", 
    price: 74900, 
    imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    description: "Lightweight Camera Drone, 4K/60fps",
    category: "Cameras"
  },
  { 
    id: 24, 
    name: "Kindle Paperwhite", 
    price: 13999, 
    imageUrl: "https://images.unsplash.com/photo-159246431122-2349e0fbc666?w=400&h=400&fit=crop",
    description: "E-Reader with 6.8\" Display, 16GB",
    category: "Electronics"
  },
];
