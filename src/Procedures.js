
export const procedures = [
  {
    title: "General area",
    score: 1,
    options: [
        "Walls are dirty",
        'Rubbish bins well maintained, not damaged, dirty or overflowing',
        'Ceilings, Vents clean',
        'Shatter proof bulbs in food & storage areas',
        'Only approved equipment in use',
        'Hot and cold equipment gaskets (seals) clean and in good repair',
        "Sanitizer bucket not correct concentration",
        "Cloths not in sanitizer when not in use",
        'Hot water between 43°C & 49°C'
    ],
    labels: ["general", 'BOH', 'MOH', 'FOH']
  },
  {
    title: "Landscape",
    score: 1,
    options: [
      "Unsightly buildup",
      "Litter, weeds, cigarette buds",
      "Dirty Signage",
      "Bins overflowing, dirty or damaged",
    ],
    labels: ["landscape"],
  },
  {
    title: "Guest Area",
    score: 1,
    options: [
      "Guest area is not stocked up",
      "Unsightly buildup guests",
      "Dirty Kiosks",
      "Dirty POS, Card Machines, Signage",
      "Dirty Glass, windows, corners, doorhandles or frames",
      "Dirty lobby tiles",
      "Messy front counter area or spills",
    ],
    labels: ["guest area", "lobby"],
  },
  {
    title: "Restroom",
    score: 1,
    options: [
      "Restroom not available or not usable",
      "Toilet seat is loose",
      "Toilet, glass, sink, soap & sanitizer dispenser, door, towel dispensers dirty",
      "Restroom is not stocked up",
    ],
    labels: ["restroom", "toilet"],
  },
  {
    title: "Only approved / not spoiled ingredients used",
    score: 3,
    options: ["Milk", "Salads", "Chicken products", "Cheese", "Bread"],
    labels: ["product", "ingredients", "quality", "general", "MOH", "BOH"],
  },
  {
    title: "Chicken to brand standard",
    score: 1,
    options: [
      "Discoloration",
      "Visible grease pools",
      "Bare spots",
      "Torn Skin, voids",
      "Doughy undercooked breading",
      "Blown drums",
    ],
    labels: ["COB", "chicken", "product", "MOH"],
  },
  {
    title: "Zingers, Hot Wings, Fillets, Mini Fillets to brand standard",
    score: 1,
    options: [
      "Discoloration",
      "Improper adhesion",
      "Bare spots",
      "Undercooked breading",
    ],
    labels: ["chicken", "product", "MOH", "brand standard"],
  },
  {
    title: "Sides to brand standard",
    score: 1,
    options: [
      "No fries timer available",
      "Old and new batches of fries not mixed",
      "Fries basket not shaken after fryer signal",
      "Fries basket not shaken before dropping in oil",
      "Fries not drained for 5 seconds when ready",
      "Gravy pots filled incorrectly",
    ],
    labels: ["side", "product", "MOH", "FOH", "brand standard"],
  },
  {
    title: "Oil quality",
    score: 1,
    options: [
      "Poor quality (above 23 TPM)",
      "Foaming",
      "Poor Visibility",
      "Oil level too low",
      "Excessive crumbs, food particles",
    ],
    labels: ["oil", "product", "quality", "FOH", "MOH", "BOH"],
  },
  {
    title: "Labels, time tags",
    score: 1,
    options: ["Incorrect, expired, manipulated label", "Not labeled"],
    labels: ["label", "brand standard", "side", "product", "MOH"],
  },
  {
    title: "Availability",
    score: 1,
    options: [
      "Products unavailable when ordered",
      "EPCS / QPM Projections not followed",
    ],
    labels: ["availability", "brand standard", "side", "product", "MOH"],
  },
  {
    title: "Cooked and heated to correct temperature ( < 82°C )",
    score: 3,
    options: ["COB", "Zinger", "Fillet", "Mini Fillet", "Hot Wings", "Fries"],
    labels: [
      "temperature",
      "product",
      "food safety",
      "MOH",
      "hot",
      "just cooked",
    ],
  },
  {
    title:
      "Cold TTCS foods ( < 1°C or > 5°C ) ( Time-temperature control safety foods )",
    score: 3,
    options: [
      "Core products",
      "Tomato",
      "Pineapple stick",
      "Coleslaw",
      "Beans",
      "Lettuce",
    ],
    labels: [
      "temperature",
      "product",
      "food safety",
      "MOH",
      "BOH",
      "FOH",
      "cold",
      "TTCS",
    ],
  },
  {
    title: "Hot TTCS foods ( < 63°C )( Time-temperature control safety foods)",
    score: 3,
    options: ["Core products", "Bites", "Beans", "Gravy", "Corn"],
    labels: [
      "temperature",
      "product",
      "food safety",
      "MOH",
      "FOH",
      "hot",
      "TTCS",
    ],
  },
  {
    title: "All TTCS food safety(Time-temperature control safety)",
    score: 3,
    options: ["No use by date", "Expired"],
    labels: [
      "temperature",
      "product",
      "food safety",
      "MOH",
      "FOH",
      "BOH",
      "use by",
      "label",
      "TTCS",
    ],
  },
  {
    title: "Frozen Food thawed to standard",
    score: 1,
    options: [
      "Not completely thawed",
      "Not labelled",
      "Thaw procedure not followed",
      "Incorrectly recorded",
      "Refrigerated defrost setup incorrectly",
      "Water defrost setup incorrectly",
    ],
    procedures: {
      cabinet_defrost: "",
      water_defrost: "",
    },
    labels: [
      "thaw",
      "product",
      "food safety",
      "BOH",
      "brand standard",
      "defrost",
    ],
  },
  {
    title: "Thermometer not calibrated",
    score: 3,
    options: [
      "No ice available",
      "Unapproved probe in use",
      "Cross-contamination on probe",
      "No working probe available",
    ],
    procedures: {
      probe: "",
    },
    labels: ["probe", "food safety", "general"],
  },
  {
    title: "TTCS foods well documented and within hold time",
    score: 3,
    options: ["Lettuce", "Tomato", "Cheese", "Core products", "Bites", "Rice"],
    labels: ["TTCS", "food safety", "product", "MOH", "FOH", "BOH"],
  },
  {
    title: "Chicken on Bone not cleaned to standard",
    score: 3,
    options: ["Giblets", "Feathers", "Fat", "Bruises", "Broken bones"],
    labels: ["COB", "food safety", "product", "BOH"],
  },
  {
    title: "Ingredients and products date marked",
    score: 3,
    options: ["Fillet", "Mini Fillet", "Hot Wings", "Zingers", "COB"],
    labels: ["chicken", "food safety", "product", "BOH", "label", "use by"],
  },
  {
    title: "Manipulation of EPCS / PCS / QPM or falsification of records",
    score: 3,
    options: [
      "Fillet",
      "Mini Fillet",
      "Hot Wings",
      "Zingers",
      "COB",
      "Bites",
      "Hash Brown",
    ],
    labels: ["QPM", "EPCS", "MOH", "BOH"],
  },
  {
    title: "Product preparation and build to standard",
    score: 1,
    options: [
        "Packaged incorrectly / without relevant allergen information",
        "Product does not comply with build card",
        "Held in chute over 10 min",
        "Flavour tab / Special tab not applied to product",
        "Contingency packaging not adhered to",
        "Delivery sticker not applied to order bag"
    ],
    labels: ["packaging", "product", "MOH", "FOH", 'brand standard', 'prep'],
  },
  {
    title: "Food and packaging properly stored in good condition",
    score: 1,
    options: [
        "Not damaged",
        "TM food segregated",
        "Donation food segregated",
        "Frozen / Refrigerated raw animal food stored close to RTE (Ready to eat)",
        "Inappropriate location (moist, dirty, exposed to contamination)"
    ],
    labels: ["packaging", "product", "MOH", "BOH", 'frozen'],
  },
  {
    title: "Food Utensils, smallwares storage",
    score: 1,
    options: [
        "Handles not up",
        "Not Dry",
        "Dirty Surface not sanitized",
        "Sanitized every 4 hours",
        "Dirty containers",
        "Dirty Cutting Boards"
    ],
    labels: ["packaging", "product", "prep", "MOH"],
  },
  {
    title: "Cross-contamination not observed",
    score: 3,
    options: [
        "Foreign non-food object / packaging / hair in food",
        "Apron / surface with raw animal food touch RTE foods",
        "Sneezing / coughing on food",
        "Items stored in ice machine",
        "Chemical contamination",
        "Dripping condensation into food",
        "Improper apron procedure",
        "Fryer handles / surfaces not sanitized after drop",
        "Improper raw chicken transfer",
        "Reusing single use items",
        "Dirty ice machine",
        "Improper dip water handling",
        "Hand washing not followed"
    ],
    labels: ["cross-contamination", "product", "prep", "MOH", "BOH", 'FOH'],
  },
  {
    title: "Ready for peak",
    score: 1,
    options: [
        "Packaging, sauces, napkins stocked up",
        "Team member confirms order before total",
        "Product prepared for peak",
        "Clean chicken available"
    ],
    labels: ["accuracy ", "product", "napkins", "MOH", "BOH", 'FOH'],
  },
  {
    title: "Team Guidelines",
    score: 1,
    options: [
        "Eating / drinking /smoking / chewing gum/ chewing tobacco in non-authorized areas",
        "Unclean TM or odour",
        "Arms hands with jewellery while food handling",
        "Body piercing",
        "Unauthorized jewellery",
        "Dirty uniform / hands / fingernails",
        "Uncovered hair / facial hair"
    ],
    labels: ['team member', "uniform", "brand standard", 'jewellery'],
  },
  {
    title: "Team Health and safety",
    score: 3,
    options: [
        "Bandage on hand not wearing a glove",
        "Fever, vomiting, nausea, sore throat. sneezing / coughing excessively, diarrhoea",
    ],
    labels: ['team member', "health and safety", 'glove', 'sick'],
  },
  {
    title: "Hand washing",
    score: 3,
    options: [
        "After Sneezing / coughing",
        "After Handling raw food",
        "After Taking break, returning from toilet",
        "After Cleaning task",
        "After Touching face / phone / clothing / money",
        "After Putting on / changing gloves",
        "Not Sanitizing hands",
        "Not Rinse hands",
        "Wash hands in non-handwash sink",
        "Not dry with paper towel",
        "Reused gloves",
        "Sinks not stocked up",
        "Not washed for 20 seconds"
    ],
    labels: ["hand washing", "health and safety", 'glove', 'team member'],
  },
  {
    title: "Team member records",
    score: 1,
    options: [
        "Illness policy documented and visible to employees",
        "All restaurant employees are 100% trained",
        "Shift Runner is first aid trained",
        "Food safety training complete and documented"
    ],
    labels: ["hand washing", "health and safety", 'team member'],
  },
  {
    title: "Weekly pest walks completed",
    score: 1,
    options: ['Records kept'],
    labels: ["pest"],
  },
  {
    title: "Local food safety certification",
    score: 1,
    options: ['Records kept'],
    labels: ["eho"],
  },
  {
    title: "No Electric Power",
    score: 3,
    options: ['No Power'],
    labels: ["electric", 'health and safety'],
  },
  {
    title: "Emergency fire equipment comply with local legislation",
    score: 1,
    options: [
        'Accessible, maintained, implemented',
        'Fire routes and door sign posted, unlocked'
    ],
    labels: ["fire", 'health and safety'],
  },
  {
    title: "Health & Safety standards comply with local legislation",
    score: 3,
    options: [
            "No Slip or trip hazards",
            "Electrical and gas safety followed",
            "PPE not torn, available and is used correctly",
            'Chemicals stored on same surface / shelf as food or packaging '
    ],
    labels: ["ppe", 'health and safety', 'chemicals'],
  },
  {
    title: "Cleaning supplies",
    score: 1,
    options: [
        "Not Stored separately or stored improperly",
        "Not in usable condition",
        "Dirty mop Sink",
        "Only approved chemicals in use",
        "Sanitizer buckets not labelled",
        "Improper scoop",
        "Chemicals accessible to customers",
    ],
    labels: ["cleaning", 'chemicals'],
  },
  {
    title: "Required equipment is to brand standard",
    score: 1,
    options: [
        "Microwaves, oven, pressure fryers / open fryers, bun toaster, grill, POS & card terminals, breading tables",
        "Fryers not filled with water",
        "Fryers not being moved with hot oil present",
        "Manually releasing pressure",
        "Temperature gauges in working order",
        "Salad cold well clean",
        "Hot hold / Cold equipment meets temperature standard",
        "Cooking equipment clean:",
        "Ice cream / Krushem machine clean",
    ],
    labels: ["equipment", 'brand standard'],
  },
  {
    title: "Hot water available in store",
    score: 3,
    options: [
       "Not available"
    ],
    labels: ["water", 'health and safety'],
  },
  {
    title: "Hot water available in store",
    score: 3,
    options: [
       "Not available"
    ],
    labels: ["water", 'health and safety'],
  },
  {
    title: "No sewage backup",
    score: 3,
    options: [
        "Drains working properly",
        "Drains covers missing"
    ],
    labels: ["sewage", 'health and safety'],
  },
  {
    title: "Wiping cloths used and stored correctly",
    score: 3,
    options: [
        "Raw protein and other cloths never mixed",
        "Raw cloths in use outside of kitchen"
    ],
    labels: ["cloth", 'health and safety', 'cross-contamination'],
  },
  {
    title: "Sanitizer in 3 step sink not available",
    score: 3,
    options: [
        'Not Available'
    ],
    labels: ["sanitizer", '3 step sink', 'health and safety'],
  },
  {
    title: "Dedicated hand wash sink in BOH",
    score: 3,
    options: [
        'Not Available',
        "In poor repair"
    ],
    labels: ["hand wash sink", 'BOH', 'health and safety'],
  },
  {
    title: "Sink sprayer does not hang lower than sink rim",
    score: 1,
    options: [
        'hangs lower than sink rim',
    ],
    labels: ["3 step sink", 'BOH'],
  },
  {
    title: "Water is from approved source",
    score: 3,
    options: [
        'Not approved source',
    ],
    labels: ['water', 'health and safety'],
  },
  {
    title: "Hot water available ( >= 43°C )",
    score: 3,
    options: [
        'below 43°C',
    ],
    labels: ['water', 'health and safety'],
  },
  {
    title: "Possible Pest Entry",
    score: 3,
    options: [
        "Cracked BOH floor tiles",
        "Missing or damaged ceiling tiles",
        "Gaps under doors",
        "Damaged walls",
        "Bin area dirty",
        "Standing water",
    ],
    labels: ['pest', 'health and safety'],
  },
  {
    title: "No Wet floor signage",
    score: 3,
    options: [
        'No signage on wet floor'
    ],
    labels: ['floor', 'health and safety', 'MOH', 'BOH', 'FOH'],
  },
  {
    title: "Unapproved PMP supplier",
    score: 1,
    options: [
        'Missing traps',
        "Mis-located traps",
        "Unauthorized device in Utensils"
    ],
    labels: ['floor', 'health and safety'],
  },
  {
    title: "No pest activity",
    score: 3,
    options: [
        "Rodent or evidence",
        "Live Roach",
        "9 Flies",
        "Maggots",
        "Insects, pests in food"
    ],
    labels: ['pest', 'health and safety'],
  },
  {
    title: "Weekly cleaning not done",
    score: 3,
    options: [
        "No records",
        "Not complete"
    ],
    labels: ['cleaning'],
  },
  
  
];


