import { connectDB, closeDB, getDB } from "../config/db";
import { StudioDocument } from "../modules/studios/studios.service";

export const initialStudios: Omit<StudioDocument, "_id" | "createdAt" | "updatedAt">[] = [
  {
    name: "The Grand White Infinity Cyc",
    tagline: "Two-wall seamless white cyclorama with motorized overhead lighting grid",
    description:
      "A pristine 2,400 sq ft production stage equipped with a 30x25 ft two-wall seamless cyclorama, 16 ft ceilings, and a computerized RGB overhead lighting grid. Perfect for high-fashion lookbooks, commercial automotive video, e-commerce catalog shoots, and music videos. Features 200A 3-phase camlock power, private dressing green room, and double-door street load-in.",
    category: "Photo Cyc Wall",
    hourlyRate: 110,
    capacity: 25,
    squareFeet: 2400,
    location: {
      address: "182 Greenpoint Ave, Suite 3B",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11222",
      coordinates: { lat: 40.7308, lng: -73.9535 },
    },
    amenities: [
      "Two-Wall Cyc (Freshly Painted)",
      "Motorized Lighting Truss",
      "Hair & Makeup Vanity Stations (3)",
      "Drive-In Street Level Loading",
      "High-Speed Wi-Fi (1 Gbps Symmetrical)",
      "Dedicated Client Lounge with Espresso Bar",
      "Central HVAC Climate Control",
      "Steamer & Heavy-Duty Wardrobe Racks",
    ],
    equipment: [
      "4x Profoto D2 1000W AirTTL Monolights",
      "2x Aputure LS 600d Pro Daylight LED",
      "8x C-Stands with Grip Arms & Sandbags",
      "6x Apple Boxes (Full, Half, Quarter)",
      "10x12 ft Overhead Silk & Solid Scrims",
      "Tethering Station with Color-Calibrated Eizo Monitor",
    ],
    rules: [
      "No open flames or smoking on stage.",
      "Footwear booties required on fresh cyc paint unless shooting barefoot/taped soles.",
      "Load-in and strike must be completed within your booked hourly window.",
      "Certificate of Insurance (COI) required for crew sizes over 15 people.",
    ],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "host@studiospace.io",
    ownerName: "Elena Rostova",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 4.95,
    reviewCount: 38,
    isFeatured: true,
  },
  {
    name: "Apex Virtual Film & LED Volume Stage",
    tagline: "Next-generation in-camera visual effects stage with Unreal Engine tracking",
    description:
      "State-of-the-art 3,800 sq ft film soundstage featuring a 40x16 ft curved 2.3mm pixel pitch LED wall and ceiling volume. Powered by disguise media servers and Unreal Engine 5 real-time parallax camera tracking. Designed for feature films, episodic television, music videos, and cinematic product commercials seeking zero-post background composites.",
    category: "Film & Video Stage",
    hourlyRate: 245,
    capacity: 40,
    squareFeet: 3800,
    location: {
      address: "840 N McCadden Pl",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90038",
      coordinates: { lat: 34.0863, lng: -118.3379 },
    },
    amenities: [
      "Curved 40ft LED Volume Wall",
      "Unreal Engine 5 Real-Time Tracking",
      "Acoustically Treated Silent Stage (NC-20)",
      "400A 3-Phase Camlock Power Service",
      "VIP Green Room with Ensuite Bathroom",
      "Dedicated Production Office & Video Village",
      "Loading Dock with Roll-Up Freight Door",
      "On-Site Virtual Production Technician Included",
    ],
    equipment: [
      "Mo-Sys StarTracker Optical Tracking System",
      "Disguise VX4 Media Server Cluster",
      "6x ARRI SkyPanel S60-C Softlights",
      "Dana Dolly Portable Track & Risers",
      "Teradek Bolt 4K Wireless Video Transmitters",
      "Sound Devices 833 8-Channel Field Recorder",
    ],
    rules: [
      "Virtual production technician must oversee volume operation at all times.",
      "Strictly no pyrotechnics, haze, or water effects without prior written approval.",
      "Hard hats required during overhead rig alterations.",
    ],
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "marcus@apexstages.com",
    ownerName: "Marcus Vance",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5.0,
    reviewCount: 22,
    isFeatured: true,
  },
  {
    name: "The Velvet Broadcast Podcast Lounge",
    tagline: "Mid-century broadcast lounge equipped with 4-camera 4K switcher and Shure mics",
    description:
      "An impeccably sound-dampened 650 sq ft recording suite tailored for conversational podcasts, vodcasts, interviews, and brand roundtables. Styled with warm walnut acoustics, velvet armchairs, dimmable ambient tube lighting, and neon studio signage. Delivers broadcast-ready multi-cam isolated audio and video recording with a single button press.",
    category: "Podcast Lounge",
    hourlyRate: 75,
    capacity: 8,
    squareFeet: 650,
    location: {
      address: "1200 S Congress Ave, Studio 204",
      city: "Austin",
      state: "TX",
      zipCode: "78704",
      coordinates: { lat: 30.2525, lng: -97.7497 },
    },
    amenities: [
      "4-Person Luxury Velvet Lounge Seating",
      "Double-Wall Sound Isolation (STC 58)",
      "Blackmagic ATEM Mini Extreme ISO Switcher",
      "4K Sony FX3 4-Camera Multi-Angle Setup",
      "Custom Neon & RGB Backlit Acoustic Slats",
      "Dedicated Podcast Producer Monitoring Desk",
      "High-Speed Gigabit Fiber for Live Streaming",
      "Beverage Bar with Cold Brew & Mineral Water",
    ],
    equipment: [
      "4x Shure SM7B Dynamic Vocal Microphones",
      "RØDECaster Pro II Integrated Audio Production Console",
      "4x Sony FX3 Full-Frame Cinema Cameras with G-Master Primes",
      "Cloudlifter CL-4 Mic Activators",
      "4x Audio-Technica ATH-M50x Studio Monitor Headphones",
      "Aputure Amaran T2c RGBWW Tube Lights",
    ],
    rules: [
      "Food and sugary drinks prohibited at the mic table.",
      "Please bring an external USB-C SSD (1000MB/s+) if taking raw camera ISO footage.",
      "Quiet hours in building hallways after 9 PM.",
    ],
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "host@studiospace.io",
    ownerName: "Maya Lin",
    ownerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    rating: 4.92,
    reviewCount: 45,
    isFeatured: true,
  },
  {
    name: "Analog Haven Recording & Mixing Suite",
    tagline: "Solid State Logic console suite with vintage outboard gear and live isolation booth",
    description:
      "Premium 1,100 sq ft music production retreat engineered by acoustic design master John Storyk. Features an SSL 4048 G+ console, Augspurger mains with dual 18-inch subs, and an enviable collection of vintage tube compressors, preamps, and tape machines. Includes an attached 300 sq ft live isolation booth with sightlines, Yamaha C7 grand piano, and guitar amplifier locker.",
    category: "Music & Audio Suite",
    hourlyRate: 135,
    capacity: 12,
    squareFeet: 1100,
    location: {
      address: "1618 16th Ave S",
      city: "Nashville",
      state: "TN",
      zipCode: "37212",
      coordinates: { lat: 36.1384, lng: -86.7937 },
    },
    amenities: [
      "SSL 4048 G+ 48-Channel Analog Console",
      "Augspurger GA215V-Sub Main Monitors",
      "Acoustic Live Room with 12ft Ceilings",
      "Vintage Yamaha C7 Concert Grand Piano",
      "Private Artist Lounge & Kitchenette",
      "Pro Tools HDX Ultimate with Waves & UAD DSP",
      "Bespoke Vocal Booth with Floating Wood Floor",
      "24/7 Keyless Secure Producer Access",
    ],
    equipment: [
      "Neumann U87 Ai Multi-Pattern Condenser Mic",
      "Telefunken ELA M 251E Vintage Tube Microphone",
      "Pair of Universal Audio 1176LN Peak Limiters",
      "Teletronix LA-2A Leveling Amplifier",
      "Neve 1073 Classic Mic Preamp & EQ Pair",
      "Genelec 8351B SAM Active Studio Monitors",
    ],
    rules: [
      "Console faders must be reset to zero at the end of session.",
      "No open beverages placed on the console or outboard racks.",
      "Only authorized studio engineers may patch rack connections.",
    ],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "cole@musicroad.com",
    ownerName: "Cole Sterling",
    ownerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 4.98,
    reviewCount: 31,
    isFeatured: true,
  },
  {
    name: "Sunlit Industrial Artist Loft & Workshop",
    tagline: "Exposed brick creative loft with 18ft timber ceilings and north-facing skylights",
    description:
      "A sun-drenched 1,800 sq ft multidisciplinary creator space in a historic warehouse conversion. Boasting weathered century-old brick walls, polished concrete flooring, factory casement windows, and massive skylights providing diffused natural daylight all day. Ideal for editorial fashion photography, ceramic workshops, brand launch pop-ups, painting masterclasses, and daylight portraits.",
    category: "Art & Workshop Loft",
    hourlyRate: 85,
    capacity: 35,
    squareFeet: 1800,
    location: {
      address: "2150 S Canalport Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60608",
      coordinates: { lat: 41.8542, lng: -87.6521 },
    },
    amenities: [
      "Continuous All-Day North-Facing Natural Daylight",
      "35ft Industrial Mobile Wooden Work Tables",
      "Commercial Pottery Clay Sink & Heavy-Duty Drainage",
      "Freight Elevator with Direct Loading Access",
      "Blackout Roller Blinds on All Windows",
      "Mobile Painter Easels & Still Life Pedestals",
      "High-Fidelity Sonos Multi-Room Sound System",
      "Private Restroom with Full Shower",
    ],
    equipment: [
      "8x Heavy-Duty Oak Artist Easels",
      "Set of 4 Mobile Vintage Canvas Backdrops",
      "Profoto B10X Plus Battery Monolight Duo Kit",
      "Profoto 5ft Deep White Umbrella with Diffuser",
      "Industrial Garment Steamer and Z-Racks",
      "Step Ladders (6ft & 10ft Werner)",
    ],
    rules: [
      "Floor coverings must be laid down when using oil paint, epoxy, or heavy chemicals.",
      "Please wipe down common worktables before checkout.",
      "Noise level must remain reasonable after 10 PM.",
    ],
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "host@studiospace.io",
    ownerName: "Julian Vance",
    ownerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    rating: 4.88,
    reviewCount: 29,
    isFeatured: true,
  },
  {
    name: "The Prism Dance & Movement Rehearsal Hall",
    tagline: "Sprung maple hardwood dance floor with full-length mirrors and ambient LED wall",
    description:
      "A soaring 2,200 sq ft rehearsal hall engineered specifically for commercial dance rehearsals, music video choreography, theatrical table reads, fitness content filming, and movement masterclasses. Features an Olympic-grade sprung shock-absorbing hardwood floor, 40 ft of uninterrupted wall-to-wall mirrors with privacy curtains, professional PA line arrays, and dynamic ambient color uplighting.",
    category: "Dance & Rehearsal Studio",
    hourlyRate: 70,
    capacity: 45,
    squareFeet: 2200,
    location: {
      address: "675 Ponce De Leon Ave NE",
      city: "Atlanta",
      state: "GA",
      zipCode: "30308",
      coordinates: { lat: 33.7725, lng: -84.3655 },
    },
    amenities: [
      "Sprung Harlequin Hardwood Dance Floor",
      "40ft Wall-to-Wall Floor-to-Ceiling Mirrors",
      "Heavy-Duty Full Mirror Blackout Velvet Curtains",
      "JBL EON Professional Line-Array PA System",
      "Dual Wireless Shure Headset Microphones",
      "Adjustable Ballet Barres (Portable & Mounted)",
      "Locker Rooms with Keyless Locks & Showers",
      "Air Purification with High-Volume Air Changes",
    ],
    equipment: [
      "JBL EON715 Powered 15-inch PA Speakers (Pair)",
      "Yamaha MG10XU 10-Channel Audio Mixer",
      "Smartphone & Tablet Bluetooth 5.0 Receiver",
      "4x Chauvet DJ Wash FX 2 Strobe & Wash Lights",
      "Roll of Professional Dance Floor Gaffers Tape",
      "First Aid Station with Ice Machine",
    ],
    rules: [
      "Strict non-marking indoor footwear only. High heels require rubber heel protectors.",
      "No food, resin, or gum allowed on the sprung dance floor.",
      "Volume levels must be kept within 95dB limit.",
    ],
    images: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "tasha@prismdance.com",
    ownerName: "Tasha King",
    ownerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 4.93,
    reviewCount: 34,
    isFeatured: true,
  },
  {
    name: "Skyline Daylight Penthouse Studio",
    tagline: "Wraparound glass penthouse with unobstructed skyline views and polished concrete",
    description:
      "Perched on the 14th floor in the heart of Downtown, this 1,950 sq ft luxury daylight studio features 14ft floor-to-ceiling panoramic glass windows capturing breathtaking 270-degree skyline vistas. Outfitted with motorized solar sheer and blackout drapes, mid-century Scandinavian designer furniture props, marble kitchen island, and polished quartz flooring. An elite location for celebrity cover shoots, commercial lifestyle campaigns, and luxury lookbooks.",
    category: "Photo Cyc Wall",
    hourlyRate: 145,
    capacity: 20,
    squareFeet: 1950,
    location: {
      address: "1100 Biscayne Blvd, Penthouse 1402",
      city: "Miami",
      state: "FL",
      zipCode: "33132",
      coordinates: { lat: 25.7854, lng: -80.1901 },
    },
    amenities: [
      "270-Degree Unobstructed Skyline & Bay Vistas",
      "Motorized Automated Blackout & Sheer Blinds",
      "Fully Functional Luxury Open Chef's Kitchen Island",
      "Curated Scandinavian Designer Furniture Props",
      "Private High-Speed Freight Elevator Key",
      "Spacious Wardrobe & Glam Dressing Room",
      "Sonos Architectural Sound Throughout",
      "Bespoke Marble Cocktail Wet Bar",
    ],
    equipment: [
      "3x Broncolor Siros 800 S WiFi/RFS Monolights",
      "Broncolor Para 133 FB Reflective Umbrella Kit",
      "Matthews Studio Equipment C-Stands (6)",
      "Avenger Roller Stands with Grip Heads (3)",
      "V-Flats (4x Foldable Black/White)",
      "Inovativ Voyager 36 EVO Production Cart",
    ],
    rules: [
      "Certificate of Insurance (COI) required for all equipment and crews.",
      "No adhesive tape or mounting hardware attached to glass facades.",
      "Building quiet hours strictly enforced after 11 PM.",
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "sofia@skylinepenthouse.com",
    ownerName: "Sofia Alvarez",
    ownerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 4.96,
    reviewCount: 52,
    isFeatured: false,
  },
  {
    name: "Stage 4 Production Soundstage & Cyc",
    tagline: "Soundproof 3,200 sq ft film stage with green screen and dedicated control room",
    description:
      "Built for commercial directors and cinema DPs, Stage 4 offers a 3,200 sq ft soundproof production floor with an integrated 35x25 ft chroma green cyclorama alongside an adjacent 25x25 ft white infinity corner. Includes an acoustic ceiling rating of STC-65, heavy-duty floor load rating, grid-mounted distribution boxes, and a direct drive-in garage door allowing box trucks to pull directly onto the stage.",
    category: "Film & Video Stage",
    hourlyRate: 165,
    capacity: 35,
    squareFeet: 3200,
    location: {
      address: "444 N Michigan Ave, Bay 4",
      city: "Chicago",
      state: "IL",
      zipCode: "60611",
      coordinates: { lat: 41.8904, lng: -87.6243 },
    },
    amenities: [
      "Dual Green Screen & White Cyc Corners",
      "Soundproof STC 65 Certified Sound Isolation",
      "Drive-In Elephant Door (14ft Clearance)",
      "300A 3-Phase Camlock Electric Service",
      "Mezzanine Video Control Room with Intercom",
      "Hair, Makeup & Wardrobe Dressing Suites (2)",
      "High-Volume Dust Collection System",
      "Craft Services Kitchenette & Dining Area",
    ],
    equipment: [
      "4x ARRI SkyPanel S30-C Full Color Softlights",
      "2x Nanlite Forza 500 LED Spotlights with Fresnel",
      "Matthews 12x12 ft Overhead Butterfly Frame Kit",
      "Doorway Dolly with 24ft Curved Track",
      "Speed Rail Rigging Kit with Grid Clamps",
      "Heavy-Duty Wind-Up Stands (2)",
    ],
    rules: [
      "Repainting fee ($150) applies if green screen floor requires total fresh coat.",
      "Diesel trucks must turn off engines immediately upon entering the stage.",
      "Trash must be bagged and staged in loading dock dumpster at wrap.",
    ],
    images: [
      "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "host@studiospace.io",
    ownerName: "Derrick Hayes",
    ownerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    rating: 4.87,
    reviewCount: 27,
    isFeatured: false,
  },
  {
    name: "Neon Noir Creator Pod & Video Studio",
    tagline: "Moody cyberpunk set with programmable Nanleaf panels and retro arcade cabs",
    description:
      "A punchy 500 sq ft creator set tailored for YouTube video essays, TikTok creators, gaming streamers, tech reviewers, and music video b-roll. Filled with custom programmable neon light installations, retro CRT televisions with live video input loops, diffused acoustic felt baffles, and dual-monitor teleprompter workstations. Turn-key creative content production ready to roll.",
    category: "Podcast Lounge",
    hourlyRate: 65,
    capacity: 6,
    squareFeet: 500,
    location: {
      address: "3100 Airport Ave, Hangar 8",
      city: "Santa Monica",
      state: "CA",
      zipCode: "90405",
      coordinates: { lat: 34.0158, lng: -118.4513 },
    },
    amenities: [
      "Custom Nanoleaf & Neon DMX-Controllable Set",
      "Dual 4K Sony Cinema FX30 Overhead & A-Cam Rig",
      "17-Inch Presidential Speech Teleprompter",
      "Retro CRT TV Matrix with Video Loop Feeds",
      "Acoustically Dampened Sound Isolation Felt",
      "Pre-Lit With Govee & Nanlite Smart Lighting App",
      "Ultra-Fast WiFi 6E (1200 Mbps Upload)",
      "Mini Fridge with Red Bull & Sparkling Waters",
    ],
    equipment: [
      "2x Sony FX30 Cinema Cameras with Sigma 18-35mm F1.8",
      "Shure MV7X Podcasts Mics with Elgato Wave Arms",
      "Elgato Stream Deck XL Production Controller",
      "Elgato Key Light Air Panels (Pair)",
      "RODEcaster Duo Audio Production Interface",
      "Sennheiser HD 280 Pro Monitoring Cans",
    ],
    rules: [
      "Do not unplug CRT monitor loop feeds without studio host assistance.",
      "No food consumption on the broadcast desk.",
      "Content creators must format their own SD cards prior to shoot.",
    ],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "kai@neoncreator.com",
    ownerName: "Kai Tanaka",
    ownerAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    rating: 4.89,
    reviewCount: 41,
    isFeatured: false,
  },
  {
    name: "The Timberline Dolby Atmos Audio Lab",
    tagline: "7.1.4 Dolby Atmos certified mixing theatre with acoustic timber diffusers",
    description:
      "An acoustic triumph: a 900 sq ft Dolby Atmos certified 7.1.4 immersive audio listening and mixing facility. Equipped with custom Timberline hardwood quadratic residue diffusers, flush-mounted Genelec The Ones smart active monitors, and Avid S6 modular control console. Designed for major film score mixes, spatial audio album masters, and pristine ADR voiceover tracking.",
    category: "Music & Audio Suite",
    hourlyRate: 155,
    capacity: 10,
    squareFeet: 900,
    location: {
      address: "185 Berry St, Studio 110",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      coordinates: { lat: 37.7766, lng: -122.3948 },
    },
    amenities: [
      "Dolby Atmos 7.1.4 Certified Calibration",
      "Genelec SAM Smart Active Immersive Monitor Rig",
      "Avid S6 24-Fader Modular Control Surface",
      "Custom Black Walnut Quadratic Acoustic Diffusers",
      "Dedicated Voiceover Isolation Booth with Sight Glass",
      "Pro Tools Ultimate 2024 with Dolby Atmos Renderer",
      "Ultra-Quiet Whisper-Quiet HVAC (NC-18)",
      "High-End Herman Miller Ergonomic Seating",
    ],
    equipment: [
      "3x Genelec 8351B LCR Main Monitors",
      "4x Genelec 8341A Surround Monitors",
      "4x Genelec 8331A Overhead Height Monitors",
      "2x Genelec 7380A 15-inch Subwoofers",
      "Sennheiser MKH 416 Shotgun Microphone",
      "Grace Design m908 Surround Monitor Controller",
    ],
    rules: [
      "Monitor calibration settings must not be altered.",
      "Studio door must remain fully latched during playback to maintain air seal.",
      "No magnetic media placed near subwoofer enclosures.",
    ],
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "host@studiospace.io",
    ownerName: "Liam Chen",
    ownerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 4.97,
    reviewCount: 19,
    isFeatured: false,
  },
  {
    name: "The Ceramics & Printmaking Collective Loft",
    tagline: "Artisan workshop with pottery wheels, etching press, and darkroom facilities",
    description:
      "A rustic 1,650 sq ft maker atelier designed for tactile art disciplines. Equipped with 6 Shimpo Whisper pottery wheels, Skutt digital electric kiln, a 30x48 inch Griffin etching press, screenprinting wash-out booth, and a functioning black-and-white analog photo darkroom. Flooded with natural daylight from eastern clerestory factory windows.",
    category: "Art & Workshop Loft",
    hourlyRate: 60,
    capacity: 20,
    squareFeet: 1650,
    location: {
      address: "1000 N 4th St, Loft 5",
      city: "Philadelphia",
      state: "PA",
      zipCode: "19123",
      coordinates: { lat: 39.9678, lng: -75.1432 },
    },
    amenities: [
      "6x Shimpo Whisper Silent Pottery Wheels",
      "Skutt 1027 Computerized Ceramic Kiln (Firing fees extra)",
      "Full B&W Photo Darkroom with Beseler Enlarger",
      "Screenprinting Light Exposure Unit & Washout Sink",
      "Griffin Etching & Relief Printmaking Press",
      "Stainless Steel Heavy Cleanup Sinks with Clay Traps",
      "Individual Tool Lockers for Multi-Day Workshops",
      "Coffee & Tea Creator Lounge Area",
    ],
    equipment: [
      "6x Shimpo VL-Whisper Pottery Wheels with Bat Sets",
      "North Star 30-inch Heavy Duty Slab Roller",
      "Griffin Model IV 30x48 inch Etching Press",
      "NuArc 32-1K UV Screen Printing Exposure Unit",
      "Beseler 23C III-XL B&W Photographic Enlarger",
      "Commercial Speedball Screenprinting Squeegees & Frames",
    ],
    rules: [
      "Clay wash must go only into designated settling trap sinks.",
      "Kiln operation strictly handled by certified studio manager.",
      "Clean all squeegees, wheels, and tools before checkout.",
    ],
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "chloe@collectiveloft.com",
    ownerName: "Chloe Dupont",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 4.84,
    reviewCount: 23,
    isFeatured: false,
  },
  {
    name: "The Foundry Aerial & Movement Sanctum",
    tagline: "Industrial 24ft high ceiling facility with structural aerial rigging points",
    description:
      "A soaring 2,800 sq ft movement center specifically engineered for aerial silk artists, trapeze acrobats, contemporary dance companies, and stunt pre-visualization. Equipped with certified structural steel rigging points load-tested to 5,000 lbs, crash mats, full-length mirror wall, rosin stations, and high-velocity overhead fans.",
    category: "Dance & Rehearsal Studio",
    hourlyRate: 95,
    capacity: 30,
    squareFeet: 2800,
    location: {
      address: "1400 3rd St, Suite B",
      city: "Oakland",
      state: "CA",
      zipCode: "94607",
      coordinates: { lat: 37.8012, lng: -122.2884 },
    },
    amenities: [
      "24ft Clear Ceiling Height to Steel Beams",
      "8x Certified Aerial Rigging Points (5,000 lbs SWL)",
      "High-Density 8-Inch Vinyl Safety Crash Mats",
      "Full Mirror Wall with Retractable Curtains",
      "Sprung Subfloor with Harlequin Studio Vinyl Top",
      "QSC K12.2 High-Power Sound System",
      "Locker Rooms with Rain Showers",
      "Dedicated Rigging Technician on Standby",
    ],
    equipment: [
      "4x 10-Meter Aerial Silk Fabrics with Swivels & Carabiners",
      "2x Solid Steel Aerial Lyra Hoops (Tabless & Single Tab)",
      "4x Norbert 8-inch Folding Crash Mats (5x10 ft)",
      "QSC K12.2 Powered 2000W PA Speakers (Pair)",
      "Allen & Heath ZED-10FX Audio Mixer with Bluetooth",
      "Acrobatic Rosin Boxes and Hand Grip Chalk Stands",
    ],
    rules: [
      "Aerialist liability waivers required for all participants using rigging points.",
      "Safety crash mats must be positioned under all aerial work at all times.",
      "Only certified riggers may alter overhead carabiners or swivels.",
    ],
    images: [
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1200&auto=format&fit=crop",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
    ownerEmail: "host@studiospace.io",
    ownerName: "Dominic Silva",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 4.94,
    reviewCount: 36,
    isFeatured: false,
  },
];

async function seed() {
  console.log("Starting StudioSpace database seeding...");
  const db = await connectDB();
  const studiosCol = db.collection<StudioDocument>("studios");

  // Clear existing studios or check count
  const existingCount = await studiosCol.countDocuments();
  if (existingCount > 0) {
    console.log(`Clearing ${existingCount} existing studios for fresh seed...`);
    await studiosCol.deleteMany({});
  }

  const now = new Date();
  const studiosToInsert = initialStudios.map((s) => ({
    ...s,
    createdAt: now,
    updatedAt: now,
  }));

  const result = await studiosCol.insertMany(studiosToInsert);
  console.log(`Successfully seeded ${result.insertedCount} production studios into MongoDB!`);

  // Seed sample initial reviews for the first 3 studios
  const insertedDocs = await studiosCol.find().limit(3).toArray();
  const reviewsCol = db.collection("reviews");
  await reviewsCol.deleteMany({});

  const sampleReviews = [
    {
      studioId: insertedDocs[0]._id.toString(),
      userEmail: "creator@studiospace.io",
      userName: "Miles Callow",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment:
        "The cyclorama wall was in absolute pristine condition with zero scuff marks. The motorized lighting grid saved our crew at least 90 minutes during load-in. Elena was a super responsive host!",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      studioId: insertedDocs[0]._id.toString(),
      userEmail: "sarah.cinematography@gmail.com",
      userName: "Sarah Jenkins",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment:
        "Top-tier facility in Greenpoint! Street level drive-in made loading 4 gear carts seamless. The espresso machine in the client lounge was an absolute hit with our agency clients.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      studioId: insertedDocs[1]._id.toString(),
      userEmail: "david.director@hollywood.com",
      userName: "David O'Connor",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment:
        "The LED volume wall is stunning. Zero flicker, flawless Unreal Engine parallax tracking, and Marcus the virtual tech was incredibly knowledgeable. Will definitely book again for our next sci-fi teaser.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      studioId: insertedDocs[2]._id.toString(),
      userEmail: "jordan@startuptech.fm",
      userName: "Jordan Bell",
      userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment:
        "Broadcast quality sound isolation and the 4K multi-cam setup meant we walked away with finished video podcast episodes ready for upload with no post-production headaches. 10/10!",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  await reviewsCol.insertMany(sampleReviews);
  console.log(`Seeded ${sampleReviews.length} authentic studio reviews!`);

  await closeDB();
  console.log("Seeding process completed successfully.");
}

// Run if called directly
if (require.main === module || process.argv[1]?.includes("seedStudios")) {
  seed().catch((err) => {
    console.error("Seeding failed with error:", err);
    process.exit(1);
  });
}
