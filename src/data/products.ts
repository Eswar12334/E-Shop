/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

// Let's create a collection of 6 major categories, with 18 distinct products each = 108 unique products!
const categoriesData = [
  {
    category: 'Electronics',
    items: [
      {
        name: 'Pro Wireless Noise-Cancelling Headphones',
        subCategory: 'Audio',
        basePrice: 18999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        description: 'Experience pure sound with industry-leading Active Noise Cancellation (ANC), 40-hour battery life, and ultra-comfortable ear cushions.',
        tags: ['anc', 'wireless', 'music', 'bass'],
        specs: { Brand: 'SonicWave', Battery: '40 Hours', Connectivity: 'Bluetooth 5.2', Warranty: '1 Year' }
      },
      {
        name: 'LiteSync Smartwatch Series 5',
        subCategory: 'Wearables',
        basePrice: 4499,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        description: 'Track your fitness, heart rate, blood oxygen levels, and receive smartphone notifications on a brilliant 1.8-inch AMOLED screen.',
        tags: ['fitness', 'amoled', 'waterproof', 'smartwatch'],
        specs: { Brand: 'FitPulse', Display: '1.8" AMOLED', Battery: '7 Days', Waterproof: 'IP68' }
      },
      {
        name: 'Apex Mechanical Gaming Keyboard',
        subCategory: 'Accessories',
        basePrice: 5999,
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80',
        description: 'Ultra-responsive mechanical switches, fully customizable per-key RGB lighting, and a durable aircraft-grade aluminum frame.',
        tags: ['gaming', 'rgb', 'mechanical', 'keyboard'],
        specs: { Brand: 'Apex', Switches: 'Red Linear', Layout: 'Tenkeyless', RGB: '16.8M Colors' }
      },
      {
        name: 'UltraPort 20000mAh Power Bank',
        subCategory: 'Accessories',
        basePrice: 1999,
        image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=600&auto=format&fit=crop&q=80',
        description: 'Fast charge up to 3 devices simultaneously with 22.5W Power Delivery. Built-in smart protection safeguard for your electronics.',
        tags: ['powerbank', 'fastcharge', 'travel', 'usb-c'],
        specs: { Brand: 'PowerUp', Capacity: '20,000 mAh', Output: '22.5W Max', Ports: '2x USB-A, 1x USB-C' }
      },
      {
        name: 'CinemaView Ultra-HD Projector',
        subCategory: 'Home Entertainment',
        basePrice: 34999,
        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80',
        description: 'Turn your living room into a theater. Features native 1080p, 4K support, 5000 lumens brightness, and built-in Smart TV apps.',
        tags: ['projector', '4k', 'home-theater', 'smart'],
        specs: { Brand: 'Spectra', Resolution: '1080p Native', Brightness: '5000 Lumens', WiFi: 'Dual-Band' }
      },
      {
        name: 'SoundBar Surround Sound System 2.1',
        subCategory: 'Audio',
        basePrice: 11999,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
        description: 'Powerful 120W soundbar with a wireless subwoofer. Crystal-clear dialogues, rich bass, and multiple input modes including HDMI ARC.',
        tags: ['soundbar', 'bass', 'theater', 'bluetooth'],
        specs: { Brand: 'SonicWave', Power: '120W RMS', Subwoofer: 'Wireless 6.5"', Inputs: 'HDMI, Optical, BT' }
      },
      {
        name: 'Quantum 1080p Streamer Webcam',
        subCategory: 'Accessories',
        basePrice: 2999,
        image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=600&auto=format&fit=crop&q=80',
        description: 'Full HD webcam with dual noise-reduction microphones and automatic low-light correction. Ideal for streaming, meetings, and classes.',
        tags: ['webcam', 'streaming', '1080p', 'office'],
        specs: { Brand: 'Apex', Resolution: '1080p @ 30FPS', FieldOfView: '90°', Mount: 'Universal Clip' }
      },
      {
        name: 'Nomad Rugged Outdoor Bluetooth Speaker',
        subCategory: 'Audio',
        basePrice: 3499,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80',
        description: 'IPX7 waterproof, shockproof, and mud-resistant speaker. Delivers explosive sound with 15 hours of continuous runtime outdoors.',
        tags: ['speaker', 'waterproof', 'outdoor', 'portable'],
        specs: { Brand: 'Nomad', Waterproof: 'IPX7', Battery: '15 Hours', Output: '16W Stereo' }
      },
      {
        name: 'Titanium Swift 14" Thin Laptop',
        subCategory: 'Computers',
        basePrice: 54999,
        image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&auto=format&fit=crop&q=80',
        description: 'Lightweight and powerful productivity machine. Equipped with Intel i5 processor, 16GB RAM, 512GB fast SSD, and fingerprint login.',
        tags: ['laptop', 'intel', 'ssd', 'slim', 'office'],
        specs: { Brand: 'Titanium', CPU: 'Intel Core i5', RAM: '16GB DDR4', Storage: '512GB NVMe SSD' }
      },
      {
        name: 'Vanguard 27" QHD IPS Gaming Monitor',
        subCategory: 'Computers',
        basePrice: 19999,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
        description: 'Vibrant QHD resolution with 165Hz refresh rate and 1ms response time. Supports AMD FreeSync for tear-free gaming sessions.',
        tags: ['monitor', '165hz', 'ips', 'gaming'],
        specs: { Brand: 'Spectra', Size: '27 Inches', Resolution: '2560x1440', RefreshRate: '165Hz' }
      },
      {
        name: 'AeroGlide Ergonomic Wireless Mouse',
        subCategory: 'Accessories',
        basePrice: 1799,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
        description: 'Sculpted shape supporting your hand comfortably. Features adjustable DPI settings, silent clicks, and dual wireless mode.',
        tags: ['mouse', 'wireless', 'ergonomic', 'silent'],
        specs: { Brand: 'Apex', DPI: '800-3200', Battery: 'Up to 3 Months', Connection: '2.4GHz + BT' }
      },
      {
        name: 'SecurePro Smart Home Camera',
        subCategory: 'Smart Home',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1557324260-b9e11c23f12c?w=600&auto=format&fit=crop&q=80',
        description: '360° pan-tilt home camera with AI motion detection, color night vision, and two-way audio for talking to family.',
        tags: ['camera', 'security', 'smarthome', 'wifi'],
        specs: { Brand: 'SecurePro', Resolution: '2K Quad-HD', Rotation: '360° Horizontal', Storage: 'MicroSD / Cloud' }
      },
      {
        name: 'GigaRoute Wi-Fi 6 Mesh Router',
        subCategory: 'Smart Home',
        basePrice: 4999,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
        description: 'Say goodbye to dead zones. Future-proof Wi-Fi 6 coverage for up to 3000 sq ft, supporting 100+ connected smart devices.',
        tags: ['router', 'wifi6', 'mesh', 'internet'],
        specs: { Brand: 'GigaRoute', Speed: 'AX1800', Coverage: '3000 sq ft', Bands: 'Dual-Band' }
      },
      {
        name: 'VocalSwell Dynamic Podcast Mic',
        subCategory: 'Audio',
        basePrice: 6999,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
        description: 'Studio-quality USB mic with a cardioid pick-up pattern, latency-free headphone monitoring, and integrated pop filter.',
        tags: ['mic', 'recording', 'podcast', 'studio'],
        specs: { Brand: 'SonicWave', Type: 'Condenser USB', PolarPattern: 'Cardioid', BitDepth: '24-bit' }
      },
      {
        name: 'AeroPulse True Wireless Earbuds',
        subCategory: 'Audio',
        basePrice: 2999,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
        description: 'Compact wireless earbuds with deep bass, fast touch controls, environmental noise cancellation, and a sleek matte case.',
        tags: ['earbuds', 'wireless', 'music', 'portable'],
        specs: { Brand: 'SonicWave', Battery: '28 Hours total', Waterproof: 'IPX5', Bluetooth: 'v5.3' }
      },
      {
        name: 'Nebula Smart RGB LED Strip 10m',
        subCategory: 'Smart Home',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&auto=format&fit=crop&q=80',
        description: 'Dimmable smart LED strip that syncs with music, controllable via Google Assistant, Alexa, or app with 16 million colors.',
        tags: ['rgb', 'led', 'smarthome', 'decor'],
        specs: { Brand: 'SecurePro', Length: '10 Meters', Colors: '16 Million', Control: 'App, Voice' }
      },
      {
        name: 'ProCharge 65W GaN Charger',
        subCategory: 'Accessories',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=80',
        description: 'Pocket-sized charger utilizing Gallium Nitride (GaN) technology to charge laptops, tablets, and phones at high speed.',
        tags: ['charger', 'gan', 'fastcharge', 'usb-c'],
        specs: { Brand: 'PowerUp', Technology: 'GaN Tech', Ports: '2x USB-C, 1x USB-A', Output: '65W Max' }
      },
      {
        name: 'SoloX Wireless Charger Stand',
        subCategory: 'Accessories',
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=80',
        description: 'Fast 15W Qi-certified wireless charging stand with dual coil design for charging phones vertically or horizontally.',
        tags: ['wireless', 'charger', 'desk', 'phone'],
        specs: { Brand: 'PowerUp', QiCertified: 'Yes', Output: '15W Max', Alignment: 'Dual Coil' }
      }
    ]
  },
  {
    category: 'Fashion',
    items: [
      {
        name: 'Classic Indigo Denim Jacket',
        subCategory: "Men's Wear",
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
        description: 'Timeless regular-fit denim jacket made from 100% premium cotton, featuring custom metal buttons and 4 functional pockets.',
        tags: ['denim', 'jacket', 'cotton', 'classic'],
        specs: { Brand: 'UrbanThreads', Material: '100% Cotton Denim', Fit: 'Regular Fit', Color: 'Indigo Blue' }
      },
      {
        name: 'Elysian Meadow Floral Maxi Dress',
        subCategory: "Women's Wear",
        basePrice: 1899,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
        description: 'A breezy, stylish floral dress featuring an elegant flared hem, adjustable straps, and lightweight breathable fabric.',
        tags: ['dress', 'floral', 'summer', 'breezy'],
        specs: { Brand: 'Kora', Material: 'Viscose Blend', Occasion: 'Casual/Summer', Color: 'Sage & Lavender' }
      },
      {
        name: 'AeroPace Lightweight Running Shoes',
        subCategory: 'Footwear',
        basePrice: 3299,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        description: 'Engineered mesh upper for breathability and responsive foam cushioning for shock absorption during intense runs.',
        tags: ['shoes', 'running', 'comfort', 'sports'],
        specs: { Brand: 'SwiftForce', Midsole: 'Responsive Foam', Upper: 'Engineered Mesh', Weight: '240g' }
      },
      {
        name: 'Heritage Full-Grain Leather Wallet',
        subCategory: 'Accessories',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
        description: 'Handcrafted full-grain leather bifold wallet with 8 card slots, currency dividers, and advanced RFID security blocking.',
        tags: ['wallet', 'leather', 'handcrafted', 'rfid'],
        specs: { Brand: 'TanCraft', Material: 'Full-Grain Leather', Slots: '8 Cards', Security: 'RFID Blocking' }
      },
      {
        name: 'Prism Polarized Sunglasses',
        subCategory: 'Accessories',
        basePrice: 1799,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
        description: 'Vintage-inspired keyhole bridge sunglasses with high-performance polarized lenses and 100% UVA/UVB ray protection.',
        tags: ['sunglasses', 'polarized', 'vintage', 'summer'],
        specs: { Brand: 'UrbanThreads', LensType: 'Polarized Triacetate', Frame: 'Handmade Acetate', UVProtection: 'UV400' }
      },
      {
        name: 'Sovereign Men’s Chronograph Watch',
        subCategory: 'Accessories',
        basePrice: 7999,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80',
        description: 'A handsome watch featuring three sub-dials, date calendar, mineral crystal face, and a rich genuine leather strap.',
        tags: ['watch', 'analog', 'leather', 'luxury'],
        specs: { Brand: 'Sovereign', Dial: 'Blue Sunray', Strap: 'Genuine Brown Leather', Movement: 'Quartz Chronograph' }
      },
      {
        name: 'Vagabond Travel Laptop Backpack',
        subCategory: 'Accessories',
        basePrice: 2299,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
        description: 'Sturdy water-resistant backpack featuring a dedicated 15.6" laptop compartment, hidden anti-theft pockets, and a USB port.',
        tags: ['backpack', 'travel', 'waterproof', 'utility'],
        specs: { Brand: 'TanCraft', Material: '900D Water-Resistant Polyester', Capacity: '30L', LaptopPocket: 'Up to 15.6"' }
      },
      {
        name: 'Premium Mulberry Silk Saree',
        subCategory: "Women's Wear",
        basePrice: 8999,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        description: 'Exquisite banarasi mulberry silk saree woven with intricate golden zari work. Perfect for weddings and festive occasions.',
        tags: ['saree', 'silk', 'traditional', 'wedding'],
        specs: { Brand: 'Kora', Fabric: 'Pure Mulberry Silk', ZariType: 'Zari Weave', Length: '5.5 meters' }
      },
      {
        name: 'Metropolis Warm Cotton Hoodie',
        subCategory: 'Unisex Wear',
        basePrice: 1899,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
        description: 'Cozy and heavy fleece-lined hoodie. Features a double-lined hood, thick drawcords, and a spacious front pouch pocket.',
        tags: ['hoodie', 'winter', 'fleece', 'comfortable'],
        specs: { Brand: 'UrbanThreads', Fabric: '80% Cotton, 20% Polyester', Weight: '320 GSM', Style: 'Oversized Fit' }
      },
      {
        name: 'Urban Casual Linen Trousers',
        subCategory: "Men's Wear",
        basePrice: 1999,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
        description: 'Relaxed linen-blend trousers with drawstring waist and breathable knit. Elegant look for casual dining or beach walks.',
        tags: ['linen', 'trousers', 'summer', 'breathable'],
        specs: { Brand: 'UrbanThreads', Material: 'Linen Viscose Blend', Fit: 'Relaxed Fit', Style: 'Flat Front' }
      },
      {
        name: 'Boho Chic Cotton Kaftan',
        subCategory: "Women's Wear",
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80',
        description: 'Comfortable printed cotton kaftan with tassel tie, loose-fitting design suitable as a lounge dress or stylish day cover-up.',
        tags: ['kaftan', 'cotton', 'lounge', 'printed'],
        specs: { Brand: 'Kora', Material: '100% Fine Cotton', Print: 'Indo-Western Block Print', Length: 'Ankle Length' }
      },
      {
        name: 'AeroPace All-Weather Active Joggers',
        subCategory: 'Unisex Wear',
        basePrice: 1599,
        image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80',
        description: '4-way stretch, quick-drying athletic joggers. Zippered hand pockets keep items secure during workouts.',
        tags: ['joggers', 'workout', 'stretch', 'comfortable'],
        specs: { Brand: 'SwiftForce', Fabric: 'Nylon Spandex Blend', Features: 'Moisture Wicking, Quick Dry', Pockets: '3 Zip Pockets' }
      },
      {
        name: 'Elysian Satin Wrap Shirt',
        subCategory: "Women's Wear",
        basePrice: 1699,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
        description: 'A luxurious satin wrap-around blouse featuring elegant bishop sleeves and a customizable side tie.',
        tags: ['satin', 'blouse', 'elegant', 'formal'],
        specs: { Brand: 'Kora', Fabric: 'Premium Poly-Satin', Finish: 'Glossy Sheen', Fit: 'Custom Wrap' }
      },
      {
        name: 'Voyager Anti-Theft Sling Bag',
        subCategory: 'Accessories',
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
        description: 'Compact chest bag designed with hidden zippers, lockable buckles, and RFID blocking slots for travelers.',
        tags: ['sling', 'travel', 'bag', 'security'],
        specs: { Brand: 'TanCraft', Fabric: 'Splash-Proof Canvas', Orientation: 'Crossbody', Compartments: '3 Main' }
      },
      {
        name: 'Heritage Suede Chelsea Boots',
        subCategory: 'Footwear',
        basePrice: 4599,
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format&fit=crop&q=80',
        description: 'Sophisticated chelsea boots in fine genuine suede with comfortable elastic gores and a sturdy crepe sole.',
        tags: ['boots', 'chelsea', 'suede', 'leather'],
        specs: { Brand: 'TanCraft', Material: 'Genuine Suede Leather', Sole: 'Crepe Rubber', Style: 'Chelsea' }
      },
      {
        name: 'SwiftForce Court Tennis Shoes',
        subCategory: 'Footwear',
        basePrice: 2899,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80',
        description: 'Minimalist white sneakers featuring structured ankle collar support and non-marking rubber outsoles.',
        tags: ['sneakers', 'white', 'court', 'tennis'],
        specs: { Brand: 'SwiftForce', Material: 'Synthetic Leather', Sole: 'Non-Marking Rubber', Styling: 'Vintage Court' }
      },
      {
        name: 'Classic Oxford Cotton Button-Down',
        subCategory: "Men's Wear",
        basePrice: 1599,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
        description: 'Tailored regular-fit oxford shirt in long-staple cotton. Breathable, durable, and holds its shape beautifully.',
        tags: ['oxford', 'shirt', 'formal', 'cotton'],
        specs: { Brand: 'UrbanThreads', Material: '100% Oxford Cotton', Fit: 'Tailored Regular', Placket: 'Button Down' }
      },
      {
        name: 'Vibrant Block Print Cotton Kurtis',
        subCategory: "Women's Wear",
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?w=600&auto=format&fit=crop&q=80',
        description: 'Soft traditional cotton kurti highlighted with organic block prints and handcrafted mirror details around neck.',
        tags: ['kurtis', 'traditional', 'cotton', 'ethnic'],
        specs: { Brand: 'Kora', Fabric: '100% Breathable Cotton', Print: 'Jaipuri Dabu Print', Length: 'Calf Length' }
      }
    ]
  },
  {
    category: 'Home & Living',
    items: [
      {
        name: 'Sandalwood Soy Scented Candle Set',
        subCategory: 'Home Decor',
        basePrice: 899,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
        description: 'A pair of hand-poured natural soy wax candles infused with premium sandalwood essential oils. Up to 35-hour clean burn.',
        tags: ['candle', 'sandalwood', 'decor', 'fragrance'],
        specs: { Brand: 'AuraHome', Wax: '100% Natural Soy', BurnTime: '35 Hours Each', Package: 'Set of 2' }
      },
      {
        name: 'Apex Ergonomic Mesh Office Chair',
        subCategory: 'Furniture',
        basePrice: 8999,
        image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80',
        description: 'Engineered for posture. High-back design with adjustable headrest, multi-directional armrests, 3D lumbar support, and tilt lock.',
        tags: ['chair', 'office', 'ergonomic', 'furniture'],
        specs: { Brand: 'IkeaTech', Support: 'Adjustable 3D Lumbar', Backrest: 'High-Density Mesh', GasLift: 'Class-4 Pneumatic' }
      },
      {
        name: 'Pure Cotton 300TC Bedding Set',
        subCategory: 'Bedding',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=80',
        description: 'Experience hotel-grade luxury at home. Features a super soft, breathable 300 Thread Count sateen-weave king sheet and 2 pillowcases.',
        tags: ['bedding', 'cotton', 'sheet', 'bedroom'],
        specs: { Brand: 'AuraHome', ThreadCount: '300 TC', Material: '100% Cotton Sateen', Size: 'King Size (9x10 ft)' }
      },
      {
        name: 'ChefPro Granite Non-Stick Cookware',
        subCategory: 'Kitchen',
        basePrice: 3499,
        image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
        description: '3-piece set comprising frying pan, wok, and glass lid. Safe PFOA-free granite coating requires minimal oil for cooking.',
        tags: ['cookware', 'non-stick', 'kitchen', 'cooking'],
        specs: { Brand: 'ChefPro', Material: 'Granite Coated Aluminum', SetIncludes: 'Frying Pan, Kadhai, Glass Lid', Compatibility: 'Induction & Gas' }
      },
      {
        name: 'CleanBot Smart Robot Vacuum',
        subCategory: 'Smart Utilities',
        basePrice: 16999,
        image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392c?w=600&auto=format&fit=crop&q=80',
        description: 'Automatic self-charging vacuum with intelligent obstacle mapping, powerful 2000Pa suction, and app voice command compatibility.',
        tags: ['vacuum', 'smart', 'cleaning', 'robot'],
        specs: { Brand: 'IkeaTech', SuctionPower: '2000 Pa', Battery: '120 Mins Runtime', DustbinCapacity: '600ml' }
      },
      {
        name: 'Artisanal Ceramic Vase Set',
        subCategory: 'Home Decor',
        basePrice: 1599,
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&auto=format&fit=crop&q=80',
        description: 'Trio of rustic hand-painted terracotta vases. Exquisite matte glaze finish looks perfect on shelves, consoles, or tables.',
        tags: ['vase', 'ceramic', 'handmade', 'decor'],
        specs: { Brand: 'AuraHome', Material: 'Clay & Ceramic', Glaze: 'Matte Earthy Finish', Height: '6", 8" and 10"' }
      },
      {
        name: 'Earthy Clay Handcrafted Plant Pots',
        subCategory: 'Home Decor',
        basePrice: 1199,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
        description: 'Set of 3 heavy-duty unglazed terracotta pots with drainage holes and saucers, promoting healthy organic root growth.',
        tags: ['pots', 'garden', 'clay', 'plants'],
        specs: { Brand: 'AuraHome', Material: 'Natural Terracotta', Diameter: '5 Inches Each', Saucers: 'Included' }
      },
      {
        name: 'Memory Cloud Orthopedic Pillow',
        subCategory: 'Bedding',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
        description: 'Slow-rebound memory foam pillow contoured to align the spine, neck, and shoulder properly for sound, pain-free sleep.',
        tags: ['pillow', 'sleep', 'orthopedic', 'memory-foam'],
        specs: { Brand: 'AuraHome', Core: 'Slow Rebound Memory Foam', OuterCover: 'Washable Bamboo Fabric', Shape: 'Contoured' }
      },
      {
        name: 'Nordic Oak Floating Wall Shelves',
        subCategory: 'Furniture',
        basePrice: 1899,
        image: 'https://images.unsplash.com/photo-1532372320978-9b4d8a3a0245?w=600&auto=format&fit=crop&q=80',
        description: 'Set of 3 strong floating oak shelves with hidden metal brackets, ideal for showcasing books, small items, or art.',
        tags: ['shelves', 'wood', 'floating', 'minimalist'],
        specs: { Brand: 'IkeaTech', WoodType: 'Solid Oak Wood', Installation: 'Concealed Metal Brackets', MaxLoad: '8 kg per shelf' }
      },
      {
        name: 'ChefPro Double-Walled French Press',
        subCategory: 'Kitchen',
        basePrice: 1699,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
        description: 'Premium stainless steel French Press with double-walled insulation, keeping your artisanal coffee hot for 2 full hours.',
        tags: ['coffee', 'frenchpress', 'brewer', 'insulated'],
        specs: { Brand: 'ChefPro', Material: '304 Stainless Steel', Capacity: '1 Liter (8 Cups)', Filtration: '4-Level Micro-Mesh' }
      },
      {
        name: 'ChefPro Multipurpose Spice Rack',
        subCategory: 'Kitchen',
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80',
        description: 'Rotating countertop carousel featuring 16 glass spice jars with shaker lids. Organized storage for modern kitchens.',
        tags: ['spicerack', 'organizer', 'jars', 'cooking'],
        specs: { Brand: 'ChefPro', JarsCount: '16 Jars (100ml each)', Material: 'BPA-Free ABS & Glass', Base: '360° Revolving' }
      },
      {
        name: 'Luxurious Bamboo Bath Towel Set',
        subCategory: 'Bath',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80',
        description: 'Super-soft, highly absorbent 600 GSM bath towels woven from a premium blend of organic bamboo fibers and pure cotton.',
        tags: ['towels', 'bamboo', 'bath', 'organic'],
        specs: { Brand: 'AuraHome', Density: '600 GSM', Blend: '70% Bamboo, 30% Cotton', Size: 'Full Bath (70x140 cm)' }
      },
      {
        name: 'Earthy Handwoven Cotton Area Rug',
        subCategory: 'Home Decor',
        basePrice: 2999,
        image: 'https://images.unsplash.com/photo-1575304589822-b485167f4001?w=600&auto=format&fit=crop&q=80',
        description: 'Artisanal textured geometric area rug, flat-woven by master weavers. Looks wonderful under dining sets or sofas.',
        tags: ['rug', 'handwoven', 'carpet', 'boho'],
        specs: { Brand: 'AuraHome', Material: '100% Recycled Cotton', Dimensions: '4x6 Feet', Origin: 'Handloomed in India' }
      },
      {
        name: 'PureAir HEPA Room Air Purifier',
        subCategory: 'Smart Utilities',
        basePrice: 7999,
        image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80',
        description: '3-stage HEPA filter system trapping 99.97% of airborne allergens, fine dust, pollen, pet dander, and smoke particles.',
        tags: ['purifier', 'hepa', 'cleanair', 'health'],
        specs: { Brand: 'IkeaTech', Coverage: 'Up to 250 sq ft', CADR: '150 m³/h', NoiseLevel: '24 dB (Sleep Mode)' }
      },
      {
        name: 'Starlight Brass Table Lamp',
        subCategory: 'Home Decor',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
        description: 'An elegant statement lamp with an antique brushed brass stand and clean ivory linen drum lampshade.',
        tags: ['lamp', 'lighting', 'brass', 'classic'],
        specs: { Brand: 'AuraHome', Material: 'Solid Brass & Linen', Socket: 'E27 (LED Included)', Height: '18 Inches' }
      },
      {
        name: 'ChefPro Borosilicate Food Containers',
        subCategory: 'Kitchen',
        basePrice: 1199,
        image: 'https://images.unsplash.com/photo-1543083477-4f7f010a6675?w=600&auto=format&fit=crop&q=80',
        description: 'Pack of 5 leakproof, airtight borosilicate glass meal-prep boxes. Extremely safe for microwaves, ovens, and freezers.',
        tags: ['glass', 'containers', 'kitchen', 'food'],
        specs: { Brand: 'ChefPro', Material: 'Borosilicate Glass', Lids: 'Airtight Snap-Lock (BPA Free)', TemperatureRange: '-20°C to 400°C' }
      },
      {
        name: 'Nordic Oak End Table',
        subCategory: 'Furniture',
        basePrice: 4999,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80',
        description: 'Minimalist solid wood accent table with tapered mid-century modern legs and an open shelf for storage.',
        tags: ['table', 'wood', 'furniture', 'minimalist'],
        specs: { Brand: 'IkeaTech', Material: 'Solid White Oak', Assembly: 'Easy 5-min Setup', Dimensions: '45 x 45 x 50 cm' }
      },
      {
        name: 'WaterGlow LED Ultrasonic Humidifier',
        subCategory: 'Smart Utilities',
        basePrice: 1599,
        image: 'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=600&auto=format&fit=crop&q=80',
        description: 'Whisper-quiet cold mist humidifier. Supports direct aromatherapy oil blending, with 7 cycling soothing light modes.',
        tags: ['humidifier', 'aromatherapy', 'led', 'wellness'],
        specs: { Brand: 'IkeaTech', TankCapacity: '500ml', Output: '35 ml/h', AutoShutOff: 'Yes' }
      }
    ]
  },
  {
    category: 'Beauty',
    items: [
      {
        name: 'YouthGlow Vitamin C Face Serum',
        subCategory: 'Skincare',
        basePrice: 699,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
        description: 'Formulated with 15% active Ethyl Ascorbic Acid, Vitamin E, and Hyaluronic Acid to brighten dull skin and fade spots.',
        tags: ['serum', 'vitamin-c', 'skincare', 'glowing'],
        specs: { Brand: 'NirvanaOrganics', KeyIngredients: '15% Vitamin C, Ferulic Acid', Volume: '30ml', SkinType: 'All Skin Types' }
      },
      {
        name: 'Velvet Matte Longstay Lipstick',
        subCategory: 'Makeup',
        basePrice: 599,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80',
        description: 'Highly pigmented, non-drying matte liquid formula. Stays featherproof and waterproof for up to 12 smudge-free hours.',
        tags: ['lipstick', 'matte', 'makeup', 'waterproof'],
        specs: { Brand: 'GlamCo', Shade: 'Berry Crimson 04', Finish: 'Powder Matte', Volume: '5.5ml' }
      },
      {
        name: 'Cold-Pressed Virgin Coconut Oil',
        subCategory: 'Haircare',
        basePrice: 450,
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80',
        description: '100% pure extraction from fresh coconut milk. Deeply conditions dry hair and works as a deeply hydrating body lotion.',
        tags: ['coconut', 'oil', 'hair', 'organic'],
        specs: { Brand: 'NirvanaOrganics', Extraction: 'Cold-Pressed Single Origin', Volume: '250ml', Certification: 'USDA Organic' }
      },
      {
        name: 'Matte-Shield Ultra Mineral Sunscreen',
        subCategory: 'Skincare',
        basePrice: 799,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
        description: 'Broad spectrum SPF 50+ PA+++ mineral gel. Extremely lightweight, leaves absolutely zero white cast, and absorbs sweat.',
        tags: ['sunscreen', 'spf50', 'mineral', 'sunprotection'],
        specs: { Brand: 'NirvanaOrganics', Protection: 'SPF 50+, PA+++', ActiveIngredients: 'Zinc Oxide, Titanium Dioxide', Finish: 'Ultra-Matte' }
      },
      {
        name: 'Deep Clean Charcoal Face Wash',
        subCategory: 'Skincare',
        basePrice: 349,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
        description: 'Infused with activated bamboo charcoal and tea tree extracts to pull out deep pore dirt and prevent hormonal acne.',
        tags: ['facewash', 'charcoal', 'acne', 'skincare'],
        specs: { Brand: 'NirvanaOrganics', ActiveIngredient: 'Activated Charcoal', Volume: '150ml', FreeFrom: 'Parabens, SLS' }
      },
      {
        name: 'HydraWave 2000W Salon Hair Dryer',
        subCategory: 'Haircare',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
        description: 'Equipped with ionic conditioning to eliminate frizz and boost shine. 3 heat settings, 2 speed levels, and cool shot button.',
        tags: ['dryer', 'hair', 'styling', 'salon'],
        specs: { Brand: 'GlamCo', Power: '2000W Turbo', Motor: 'Long-Life AC Motor', Accessories: 'Concentrator Nozzle' }
      },
      {
        name: 'Sandalwood & Tea Tree Beard Oil',
        subCategory: 'Men\'s Grooming',
        basePrice: 499,
        image: 'https://images.unsplash.com/photo-1626015276510-724a47e06a8f?w=600&auto=format&fit=crop&q=80',
        description: 'Softens coarse beard hair, deeply hydrates itchy skin beneath, and leaves a pleasant, masculine woody sandalwood scent.',
        tags: ['beard', 'oil', 'grooming', 'men'],
        specs: { Brand: 'NirvanaOrganics', Blend: 'Argan, Sandalwood, Tea Tree', Volume: '50ml', Purpose: 'Beard Softener' }
      },
      {
        name: 'Elysian Lavender Fizzy Bath Bomb',
        subCategory: 'Bath & Body',
        basePrice: 299,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80',
        description: 'Effervescent Epsom-salt bath bomb packed with french lavender oil. Dissolves to soften skin and relax tired muscles.',
        tags: ['bath', 'lavender', 'spa', 'relax'],
        specs: { Brand: 'NirvanaOrganics', Weight: '150g', EssentialOil: 'Pure Lavender', CoreBenefits: 'Muscle Relax, Hydration' }
      },
      {
        name: 'NourishGuard Onion Hair Mask',
        subCategory: 'Haircare',
        basePrice: 649,
        image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=80',
        description: 'Fortifying treatment infused with red onion extract, black seed oil, and plant keratin to combat heavy hair fall and split ends.',
        tags: ['mask', 'hairfall', 'onion', 'haircare'],
        specs: { Brand: 'NirvanaOrganics', Ingredients: 'Red Onion Extract, Black Seed Oil', Volume: '200g', SLSFree: 'Yes' }
      },
      {
        name: 'LushLash Extra Volume Mascara',
        subCategory: 'Makeup',
        basePrice: 499,
        image: 'https://images.unsplash.com/photo-1631730359575-38e4755d772b?w=600&auto=format&fit=crop&q=80',
        description: 'Clump-free, rich black carbon formula with an hourglass brush that separates and thickens every single lash instantly.',
        tags: ['mascara', 'makeup', 'lashes', 'eyes'],
        specs: { Brand: 'GlamCo', Color: 'Intense Black', Feature: 'Waterproof, Smudgeproof', Volume: '8ml' }
      },
      {
        name: 'SatinSkin Shea Body Butter',
        subCategory: 'Skincare',
        basePrice: 749,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
        description: 'Decadent whipping body cream made with wild raw Shea butter, cocoa butter, and cold-pressed sweet almond oil.',
        tags: ['bodybutter', 'sheabutter', 'moisturizer', 'winter'],
        specs: { Brand: 'NirvanaOrganics', Base: '100% Raw African Shea', Volume: '200g', Texture: 'Rich Velvet Cream' }
      },
      {
        name: 'GlamCo Silk-Finish Liquid Foundation',
        subCategory: 'Makeup',
        basePrice: 899,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80',
        description: 'Medium buildable coverage foundation with a light dewy finish. High hydration formula keeping skin looking fresh.',
        tags: ['foundation', 'makeup', 'skintone', 'face'],
        specs: { Brand: 'GlamCo', Coverage: 'Medium Buildable', SPF: 'SPF 15', Shade: 'Honey Beige 03' }
      },
      {
        name: 'GlamCo Ceramic Hair Straightener',
        subCategory: 'Haircare',
        basePrice: 1999,
        image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=600&auto=format&fit=crop&q=80',
        description: 'Advanced solid tourmaline ceramic floating plates. Heats up in 30 seconds with micro-sensors protecting hair from burn.',
        tags: ['straightener', 'hair', 'styling', 'beauty'],
        specs: { Brand: 'GlamCo', Plates: 'Tourmaline Ceramic', MaxTemp: '230°C', HeatUpTime: '30 Seconds' }
      },
      {
        name: 'ZenScent Pure Jasmine Eau de Parfum',
        subCategory: 'Fragrance',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
        description: 'A luxurious floral fragrance centered around rich Indian Madurai Jasmine, combined with light hints of white musk and peach.',
        tags: ['perfume', 'jasmine', 'fragrance', 'luxury'],
        specs: { Brand: 'GlamCo', Type: 'Eau de Parfum (EDP)', Volume: '100ml', Longevity: '8-10 Hours' }
      },
      {
        name: 'HydraBright Hyaluronic Gel Moisturizer',
        subCategory: 'Skincare',
        basePrice: 599,
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80',
        description: 'Ultralight water-based moisturizer packed with Multi-Hyaluronic acid molecules for instant water plumpness and 72H hydration.',
        tags: ['moisturizer', 'gel', 'hyaluronic', 'dryskin'],
        specs: { Brand: 'NirvanaOrganics', Active: 'Hyaluronic Acid, Aloe Vera', Volume: '100ml', Texture: 'Water Gel' }
      },
      {
        name: 'FreshBreeze Organic Deodorant Stick',
        subCategory: 'Bath & Body',
        basePrice: 399,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
        description: 'Aluminum-free and baking soda-free deodorant. Powered by natural arrowroot and citrus extracts to keep you fresh.',
        tags: ['deo', 'deodorant', 'citrus', 'fresh'],
        specs: { Brand: 'NirvanaOrganics', Formula: 'Aluminum-Free', Volume: '75g', Scent: 'Grapefruit & Cedar' }
      },
      {
        name: 'GlamCo Matte Waterproof Liquid Eyeliner',
        subCategory: 'Makeup',
        basePrice: 349,
        image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=600&auto=format&fit=crop&q=80',
        description: 'Intense midnight black liquid eyeliner with a precision felt tip applicator for perfect wing strokes.',
        tags: ['eyeliner', 'makeup', 'precision', 'eyes'],
        specs: { Brand: 'GlamCo', Tip: '0.1mm Felt Tip', Color: 'Jet Black', Waterproof: 'Yes (16 Hours)' }
      },
      {
        name: 'RosyGlow Organic Beetroot Lip Balm',
        subCategory: 'Skincare',
        basePrice: 199,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
        description: 'Buttery lip treatment made from beeswax, organic beetroot juice, and sweet almond oil, providing soft, pink tinted lips.',
        tags: ['lipbalm', 'beetroot', 'organic', 'lips'],
        specs: { Brand: 'NirvanaOrganics', Ingredients: 'Beetroot Extract, Beeswax, Shea', Weight: '10g', Tint: 'Soft Rosy Pink' }
      }
    ]
  },
  {
    category: 'Fitness',
    items: [
      {
        name: 'Hex Steel Dumbbell Set (10kg Pair)',
        subCategory: 'Strength Training',
        basePrice: 3999,
        image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&auto=format&fit=crop&q=80',
        description: 'Professional grade solid cast iron dumbbells with high-durability hexagonal rubber encasing and comfortable knurled chrome handles.',
        tags: ['dumbbells', 'strength', 'gym', 'homegym'],
        specs: { Brand: 'AeroFit', Weight: '10kg x 2 (20kg Total)', Material: 'Cast Iron, Rubber', Handle: 'Chomed Knurled Grip' }
      },
      {
        name: 'Anti-Slip TPE Eco-Friendly Yoga Mat',
        subCategory: 'Yoga & Pilates',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80',
        description: '6mm thick high-density TPE cushioning mat featuring dual-sided non-slip textures and visual body alignment lines.',
        tags: ['yogamat', 'yoga', 'tpe', 'pilates'],
        specs: { Brand: 'ZenStore', Material: 'TPE (Eco-Friendly)', Thickness: '6mm', Dimensions: '183 x 61 cm' }
      },
      {
        name: 'Heavy Resistance Loop Bands Pack of 5',
        subCategory: 'Cardio & Conditioning',
        basePrice: 799,
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&auto=format&fit=crop&q=80',
        description: '100% natural latex elastic resistance bands ranging from extra light to extra heavy. Includes a portable storage pouch.',
        tags: ['resistancebands', 'mobility', 'home-workout', 'stretch'],
        specs: { Brand: 'AeroFit', Material: '100% Natural Latex', Levels: '5 Levels (10lbs to 40lbs)', Accessories: 'Carry Bag, Guide' }
      },
      {
        name: 'ActiveFit Heart Rate Tracker Band',
        subCategory: 'Wearables',
        basePrice: 1999,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80',
        description: 'Slim fitness band keeping accurate tabs on daily steps, calorie burn, blood pressure, and sleep cycle stages.',
        tags: ['tracker', 'pedometer', 'fitness', 'heartrate'],
        specs: { Brand: 'AeroFit', Display: '0.96" TFT Touch', Battery: '10 Days', Sync: 'Bluetooth 5.0 App' }
      },
      {
        name: 'Leakproof Steel Gym Shaker 700ml',
        subCategory: 'Accessories',
        basePrice: 699,
        image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&auto=format&fit=crop&q=80',
        description: 'Premium rust-proof 18/8 stainless steel shaker with wire whisk ball and leakproof screw lid for protein shakes.',
        tags: ['shaker', 'protein', 'bottle', 'steel'],
        specs: { Brand: 'AeroFit', Material: '304 Food-Grade Stainless Steel', Capacity: '700ml', Accessories: 'Metal Whisk Ball' }
      },
      {
        name: 'Speed Jump Rope with Ball Bearings',
        subCategory: 'Cardio & Conditioning',
        basePrice: 499,
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
        description: 'Tangle-free steel cable with custom protective PVC coating, smooth ball bearings, and light anti-slip memory foam handles.',
        tags: ['jumprope', 'skipping', 'cardio', 'weightloss'],
        specs: { Brand: 'AeroFit', Cable: '3m Adjustable Steel Cable', Bearings: '360° Ball Bearings', Handles: 'Anti-Slip Foam' }
      },
      {
        name: 'Premium High-Density Foam Roller',
        subCategory: 'Yoga & Pilates',
        basePrice: 899,
        image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=600&auto=format&fit=crop&q=80',
        description: 'Molded polypropylene roller designed to relieve deep muscle tightness, trigger point nodules, and speed up recovery.',
        tags: ['foamroller', 'recovery', 'muscle', 'massage'],
        specs: { Brand: 'ZenStore', Material: 'High-Density EPP Foam', Length: '45 cm', Diameter: '15 cm' }
      },
      {
        name: 'ProGrip Adjustable Hand Exerciser',
        subCategory: 'Strength Training',
        basePrice: 349,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        description: 'Build forearm and hand grip strength. Features dial adjustment resistance spanning 10kg up to 60kg.',
        tags: ['gripper', 'grip', 'forearm', 'strength'],
        specs: { Brand: 'AeroFit', ResistanceRange: '10kg to 60kg', Spring: 'High-Strength Stainless Steel', Grip: 'Rubber Ergonomic' }
      },
      {
        name: 'Cast Iron Kettlebell (8kg Premium)',
        subCategory: 'Strength Training',
        basePrice: 1899,
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=80',
        description: 'Heavy solid cast iron single-mold construction. Coated with rust-preventing matte paint for secure grip during swings.',
        tags: ['kettlebell', 'castiron', 'strength', 'crossfit'],
        specs: { Brand: 'AeroFit', Weight: '8 kg', Construction: 'Solid Single-Piece Cast Iron', Finish: 'Powder Coat' }
      },
      {
        name: 'Insulated Sports Water Bottle 1L',
        subCategory: 'Accessories',
        basePrice: 999,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
        description: 'Double-walled vacuum insulated bottle keeping your refreshing sports drink icy cold for up to 24 straight hours.',
        tags: ['waterbottle', 'insulated', 'gym', 'cycling'],
        specs: { Brand: 'AeroFit', Technology: 'Double-Wall Vacuum', KeepCold: '24 Hours', KeepHot: '12 Hours' }
      },
      {
        name: 'ZenStore Organic Buckwheat Meditation Cushion',
        subCategory: 'Yoga & Pilates',
        basePrice: 1599,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
        description: 'Traditional round Zafu cushion filled with clean organic buckwheat hulls, supporting straight spine meditation posture.',
        tags: ['meditation', 'cushion', 'zafu', 'yoga'],
        specs: { Brand: 'ZenStore', Fill: '100% Organic Buckwheat Hulls', OuterCover: 'Removable Cotton Canvas', Weight: '2.1 kg' }
      },
      {
        name: 'AeroFit Pro Ab Roller Wheel',
        subCategory: 'Strength Training',
        basePrice: 799,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        description: 'Double-wheel design providing superior stability. Strengthens core abdominals, shoulders, arms, and lower back muscles.',
        tags: ['abroller', 'core', 'abs', 'gym'],
        specs: { Brand: 'AeroFit', WheelsCount: '2 (Dual-Wheel Stability)', Handle: 'Comfortable EVA Foam', Included: 'Soft Foam Knee Mat' }
      },
      {
        name: 'Sports Compression Knee Sleeves (Pair)',
        subCategory: 'Cardio & Conditioning',
        basePrice: 599,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        description: 'Anatomically knitted compression sleeves providing joint stability and enhanced blood flow during squats or running.',
        tags: ['kneesleeve', 'compression', 'joints', 'running'],
        specs: { Brand: 'AeroFit', Material: 'Nylon, Spandex, Latex Elastic', Fit: 'Compression Fit', Set: 'Set of 2' }
      },
      {
        name: 'Waterproof Sports Running Waist Bag',
        subCategory: 'Cardio & Conditioning',
        basePrice: 399,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        description: 'Ultra-thin Lycra waist pouch with waterproof zipper, clear window, and audio outlet, keeping phone and keys snug.',
        tags: ['waistbag', 'fannypack', 'running', 'waterproof'],
        specs: { Brand: 'AeroFit', Material: 'Water-Resistant Lycra', AdjustableBelt: '65 to 110 cm', Weight: '60g' }
      },
      {
        name: 'AeroFit Adjustable Aerobic Step Board',
        subCategory: 'Cardio & Conditioning',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        description: 'Standard cardio aerobic stepper featuring non-slip platform and adjustable height blocks (10cm and 15cm) to vary intensities.',
        tags: ['stepper', 'aerobics', 'cardio', 'workout'],
        specs: { Brand: 'AeroFit', MaxLoad: '150 kg', HeightLevels: '2 Levels (10cm, 15cm)', Surface: 'Shock-Absorbing Non-Slip' }
      },
      {
        name: 'ZenStore Cork Yoga Blocks (Pair)',
        subCategory: 'Yoga & Pilates',
        basePrice: 999,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
        description: 'Made from high-density, sustainably harvested natural cork. Provides firm support and easy grip for hard poses.',
        tags: ['blocks', 'yoga', 'cork', 'alignment'],
        specs: { Brand: 'ZenStore', Material: '100% Natural Sustainable Cork', Dimensions: '22 x 12 x 7.5 cm', Set: 'Set of 2' }
      },
      {
        name: 'AeroFit Weighted Speed Vest (5kg)',
        subCategory: 'Strength Training',
        basePrice: 2499,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        description: 'Evenly distributed sand-weight neoprene vest with double strap secure closures, ideal for bodyweight calisthenics.',
        tags: ['weightvest', 'calisthenics', 'strength', 'fitness'],
        specs: { Brand: 'AeroFit', Weight: '5 kg Fixed', Fabric: 'Soft Breathable Neoprene', Closures: 'Dual Quick-Release Straps' }
      },
      {
        name: 'SpeedFit Anti-Burst Exercise Ball',
        subCategory: 'Yoga & Pilates',
        basePrice: 899,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        description: 'Heavy duty slip-resistant Swiss gym ball for core strengthening, posture corrector seating, and pregnancy stretching.',
        tags: ['swissball', 'exerciseball', 'core', 'balance'],
        specs: { Brand: 'AeroFit', Diameter: '65 cm', WeightCapacity: '300 kg', Material: 'Thick Non-Toxic PVC' }
      }
    ]
  },
  {
    category: 'Books & Stationery',
    items: [
      {
        name: 'Classic Hardcover Dotted Journal',
        subCategory: 'Notebooks',
        basePrice: 599,
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
        description: 'Elegant vegan leather hardcover notebook with 192 numbered pages of premium bleed-resistant 120 GSM ivory paper.',
        tags: ['journal', 'stationery', 'notebook', 'writing'],
        specs: { Brand: 'WritePress', PageCount: '192 Pages', PaperWeight: '120 GSM', Layout: '5mm Dotted Grid' }
      },
      {
        name: 'Premium Brass Body Fountain Pen',
        subCategory: 'Writing Instruments',
        basePrice: 1899,
        image: 'https://images.unsplash.com/photo-1583485088034-097922d16a7f?w=600&auto=format&fit=crop&q=80',
        description: 'Precision-weighted brass fountain pen with a fine gold-plated stainless steel nib. Includes converter and ink cartridges.',
        tags: ['pen', 'fountainpen', 'brass', 'calligraphy'],
        specs: { Brand: 'WritePress', Nib: '0.5mm Gold-Plated Fine', Material: 'Solid Brass', InkConverter: 'Included' }
      },
      {
        name: 'Acrylic Desktop Organizer Stand',
        subCategory: 'Desk Organizers',
        basePrice: 799,
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        description: 'Crystal-clear thick acrylic desk organizer with 6 divided compartments and 2 small slide-out drawer boxes.',
        tags: ['organizer', 'desk', 'acrylic', 'stationery'],
        specs: { Brand: 'ZenDesk', Material: 'Ultra-Clear Cast Acrylic', Compartments: '6 sections + 2 drawers', Dimensions: '22 x 14 x 13 cm' }
      },
      {
        name: 'Daily Achieve Undated Productivity Planner',
        subCategory: 'Notebooks',
        basePrice: 899,
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        description: 'Scientifically designed undated 6-month goal tracking journal, with hourly schedules, weekly reviews, and habit grids.',
        tags: ['planner', 'productivity', 'goals', 'notebook'],
        specs: { Brand: 'WritePress', Duration: '6 Months Undated', Layout: 'Daily, Weekly & Monthly Pages', Cover: 'Linen Fabric Hardcover' }
      },
      {
        name: 'Artist-Grade Watercolor Paint Set (24 Colors)',
        subCategory: 'Art Supplies',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        description: 'Highly concentrated pigment pans with outstanding lightfastness and blending. Includes water brush pen and mixing palette.',
        tags: ['watercolor', 'painting', 'art', 'colors'],
        specs: { Brand: 'ArtScribe', ColorsCount: '24 Half-Pans', Type: 'Dry Watercolor', Accessories: '1 Refillable Water Brush' }
      },
      {
        name: 'Rechargeable LED Desk Reading Lamp',
        subCategory: 'Desk Organizers',
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
        description: 'Eye-friendly flicker-free light with 3 color temperatures, adjustable goose-neck, and integrated pen holder container base.',
        tags: ['lamp', 'reading', 'desk', 'stationery'],
        specs: { Brand: 'ZenDesk', Battery: '2000mAh (Up to 12 Hours)', LightModes: 'Warm, Cool, Natural', Dimming: 'Stepless Touch Control' }
      },
      {
        name: 'Classic Vintage Calligraphy Set',
        subCategory: 'Writing Instruments',
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        description: 'Elegant wood dip pen with 5 stainless steel calligraphy nib tips, a bottle of dark black ink, and a brass pen holder stand.',
        tags: ['calligraphy', 'ink', 'dippen', 'vintage'],
        specs: { Brand: 'WritePress', Material: 'Rosewood, Stainless Steel', NibsCount: '5 Different Styles', InkBottle: '15ml Black Included' }
      },
      {
        name: 'Atomic Habit Tracker Notepad',
        subCategory: 'Notebooks',
        basePrice: 349,
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        description: 'Tear-off weekly habit tracking pad (50 sheets). Keep continuous tracks of exercise, reading, hydration, or sleep habits.',
        tags: ['notepad', 'habit-tracker', 'productivity', 'stationery'],
        specs: { Brand: 'WritePress', SheetsCount: '50 Tear-off Sheets', PaperWeight: '100 GSM', Size: 'A5 Size' }
      },
      {
        name: 'Professional Dual-Tip Brush Pens (12 Colors)',
        subCategory: 'Art Supplies',
        basePrice: 699,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        description: 'Dual tips: 1-2mm soft nylon brush tip for lettering and shading, and 0.4mm metal clad fine-liner tip for precise outlining.',
        tags: ['brushpens', 'art', 'sketching', 'lettering'],
        specs: { Brand: 'ArtScribe', Tips: 'Brush Tip (1-2mm) + Fine Tip (0.4mm)', Ink: 'Water-Based Non-Toxic', ColorsCount: '12 Vibrants' }
      },
      {
        name: 'WritePress Premium Metal Ballpoint Pen',
        subCategory: 'Writing Instruments',
        basePrice: 499,
        image: 'https://images.unsplash.com/photo-1583485088034-097922d16a7f?w=600&auto=format&fit=crop&q=80',
        description: 'Heavyweight matte black metal body rollerball pen with chrome accents. Delivers velvety smooth skips-free writing.',
        tags: ['pen', 'ballpoint', 'metal', 'office'],
        specs: { Brand: 'WritePress', InkColor: 'Royal Blue', Refill: '0.7mm Standard G2', Mechanism: 'Twist Action' }
      },
      {
        name: 'ZenDesk Wooden Monitor Riser Stand',
        subCategory: 'Desk Organizers',
        basePrice: 1599,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80',
        description: 'Saves desk space. Beautifully crafted walnut wood monitor stand raising screens for proper neck and back viewing heights.',
        tags: ['monitor-stand', 'walnut', 'desk', 'ergonomic'],
        specs: { Brand: 'ZenDesk', Wood: 'Solid Walnut Finish', WeightCapacity: '25 kg', SlotFeatures: 'Phone Slot, Cable Management' }
      },
      {
        name: 'Sketchbook Heavyweight 160 GSM A4',
        subCategory: 'Art Supplies',
        basePrice: 499,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        description: 'Spiral-bound hardcover art notebook featuring 80 sheets of acid-free, heavy textured 160 GSM dry-medium paper.',
        tags: ['sketchbook', 'art', 'notebook', 'drawing'],
        specs: { Brand: 'ArtScribe', PaperType: '160 GSM Acid-Free', PageCount: '80 Sheets (160 Pages)', Binding: 'Spiral Double-Loop' }
      },
      {
        name: 'ArtScribe Acrylic Pouring Paint Set',
        subCategory: 'Art Supplies',
        basePrice: 1299,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        description: 'Ready-to-pour high-flow liquid acrylics. Pre-mixed with pouring mediums, featuring glossy finish cell patterns.',
        tags: ['acrylic', 'paint', 'canvas', 'pouring'],
        specs: { Brand: 'ArtScribe', Bottles: '6 Bottles (120ml each)', Finishes: 'Glossy Vibrant', NonToxic: 'Yes (EN71 Certified)' }
      },
      {
        name: 'ZenDesk Sustainable Bamboo File Organizer',
        subCategory: 'Desk Organizers',
        basePrice: 1199,
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        description: 'A handsome, eco-friendly 3-slot vertical document divider made entirely of solid, organically grown bamboo.',
        tags: ['bamboo', 'organizer', 'file', 'office'],
        specs: { Brand: 'ZenDesk', Material: '100% Organic Bamboo', Slots: '3 Vertical Sections', Dimensions: '24 x 18 x 20 cm' }
      },
      {
        name: 'ArtScribe Fine-Liner Detailing Pens',
        subCategory: 'Writing Instruments',
        basePrice: 599,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        description: 'Pack of 8 black drawing pens with pigment ink. Sizes range from 0.05mm for hair detailing to brush tip for calligraphy.',
        tags: ['fineliner', 'ink', 'sketching', 'architect'],
        specs: { Brand: 'ArtScribe', InkType: 'Archival Waterproof Pigment', PenCount: '8 Different Sizes', Tips: '0.05mm to Brush' }
      },
      {
        name: 'WritePress Magnetic Leather Bookmark',
        subCategory: 'Accessories',
        basePrice: 299,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
        description: 'Sleek, strong magnetic bookmark crafted in crazy-horse leather. Clamps securely around pages without creasing.',
        tags: ['bookmark', 'leather', 'reading', 'stationery'],
        specs: { Brand: 'WritePress', Material: 'Genuine Crazy-Horse Leather', Magnets: 'Dual Neodymium', Weight: '12g' }
      },
      {
        name: 'Artist Canvas Panels Multipack (Set of 6)',
        subCategory: 'Art Supplies',
        basePrice: 799,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
        description: '100% cotton pre-stretched canvas boards triple-primed with acid-free acrylic gesso. Ready for acrylics and oils.',
        tags: ['canvas', 'painting', 'board', 'art'],
        specs: { Brand: 'ArtScribe', Surface: '100% Cotton Canvas', SizesIncluded: '2x (8x10"), 2x (9x12"), 2x (10x14")', Gesso: 'Triple Gesso Primed' }
      },
      {
        name: 'ZenDesk Brass Desk Weight & Pen Well',
        subCategory: 'Desk Organizers',
        basePrice: 1499,
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        description: 'Ultra-minimalist heavy paperweight and pen well machined from a single solid block of pure brushed brass.',
        tags: ['brass', 'weight', 'penholder', 'desk'],
        specs: { Brand: 'ZenDesk', Material: 'Solid Machined C3604 Brass', Weight: '350g', Dimensions: '4 x 4 x 4 cm' }
      }
    ]
  }
];

// Let's generate a full database of 108 products.
// We have 6 categories, each with 18 items.
// We will assign them unique deterministic IDs (e.g., prod_1 to prod_108).
// We'll also assign random but deterministic ratings (4.0 to 4.9), reviews counts (15 to 480), and stock levels (0 to 65 - making some 0 to show "Out of Stock" filter works perfectly!).

export const products: Product[] = [];

let counter = 1;
categoriesData.forEach((catGroup) => {
  catGroup.items.forEach((item, index) => {
    // Deterministic metrics based on indices to avoid hydration mismatches
    const ratingSeed = (counter * 7) % 10; // 0-9
    const rating = 4.0 + (ratingSeed / 10); // 4.0 to 4.9
    const reviewsCount = 12 + ((counter * 17) % 450); // 12 to 462
    
    // Make 6 specific items out of stock deterministically (e.g., when counter is divisible by 17 or 23)
    const stock = (counter === 11 || counter === 29 || counter === 47 || counter === 65 || counter === 83 || counter === 101) 
      ? 0 
      : 5 + ((counter * 13) % 45); // 5 to 49
      
    const isFeatured = index < 3; // First 3 of each category are featured

    products.push({
      id: `prod_${counter}`,
      name: item.name,
      description: item.description,
      price: item.basePrice,
      category: catGroup.category,
      subCategory: item.subCategory,
      image: item.image,
      rating,
      reviewsCount,
      stock,
      featured: isFeatured,
      tags: item.tags,
      specifications: item.specs
    });

    counter++;
  });
});

// Extract all unique subcategories grouped by category for filter options
export const subCategoriesByCategory: Record<string, string[]> = {};
products.forEach(p => {
  if (!subCategoriesByCategory[p.category]) {
    subCategoriesByCategory[p.category] = [];
  }
  if (!subCategoriesByCategory[p.category].includes(p.subCategory)) {
    subCategoriesByCategory[p.category].push(p.subCategory);
  }
});

// All available tags
export const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
