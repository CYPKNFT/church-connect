/**
 * Comprehensive data structure for all ministries and their volunteer roles
 * 
 * TODO: Complete this structure for all ministries
 * - Each ministry should have:
 *   - Basic info (id, title, subtitle, description, category)
 *   - Volunteer roles with requirements
 *   - Donation items (if applicable)
 *   - Schedule information
 */

export interface VolunteerRole {
  id: string;
  name: string;
  needed: number;
  signedUp: number;
  description: string;
  requirements: string[];
  tasks?: string[]; // concrete responsibilities for this role
}

export interface MinistryVolunteerData {
  ministryId: string;
  roles: VolunteerRole[];
}

// Volunteer roles data for each ministry
export const ministriesVolunteerData: { [ministryId: string]: MinistryVolunteerData } = {
  "1": { // Homeless Outreach
    ministryId: "1",
    roles: [
      {
        id: "meal-prep",
        name: "Meal Preparation",
        needed: 8,
        signedUp: 5,
        description: "Prepare meals for distribution",
        requirements: [
          "Food handler certification preferred (training provided)",
          "Ability to stand for 2-3 hours",
          "Basic cooking skills",
          "Available Sunday mornings 8 AM - 12 PM",
          "Commitment to at least 2 Sundays per month"
        ],
        tasks: [
          "Prep produce, proteins, and sides per recipe cards",
          "Follow food safety and sanitation guidelines",
          "Package meals for transport to partner shelters",
          "Clean prep stations and kitchen equipment"
        ]
      },
      {
        id: "serving",
        name: "Serving",
        needed: 12,
        signedUp: 9,
        description: "Serve meals to guests",
        requirements: [
          "Friendly, welcoming attitude",
          "Ability to interact respectfully with diverse populations",
          "Physical ability to carry trays and serve food",
          "Available Sunday afternoons 12 PM - 3 PM",
          "Background check (provided by church)"
        ],
        tasks: [
          "Set up serving line and dining area",
          "Serve portions consistently to guests",
          "Offer prayer when requested and refer needs to coordinators",
          "Break down and clean serving area"
        ]
      },
      {
        id: "cleanup",
        name: "Cleanup Crew",
        needed: 6,
        signedUp: 4,
        description: "Clean and organize after service",
        requirements: [
          "Ability to lift 25+ lbs",
          "Attention to detail",
          "Available Sunday afternoons 2 PM - 4 PM",
          "Willingness to work as part of a team",
          "Commitment to maintaining clean, safe environment"
        ],
        tasks: [
          "Collect trash and recyclables",
          "Wash and store cookware and utensils",
          "Sanitize tables, counters, and equipment",
          "Inventory cleaning supplies and report low stock"
        ]
      },
      {
        id: "outreach",
        name: "Outreach Team",
        needed: 10,
        signedUp: 6,
        description: "Connect with community members",
        requirements: [
          "Strong communication skills",
          "Compassionate, non-judgmental attitude",
          "Comfortable engaging with people from all backgrounds",
          "Available for flexible scheduling (weekends and weekdays)",
          "Training in de-escalation techniques (provided)"
        ],
        tasks: [
          "Engage guests and collect prayer/support requests",
          "Provide information on resources and partner services",
          "Record basic metrics and feedback",
          "Coordinate follow-ups with ministry leads"
        ]
      }
    ]
  },
  "2": { // Winter Coat Drive
    ministryId: "2",
    roles: [
      // TODO: Add volunteer roles for Winter Coat Drive
      {
        id: "collection",
        name: "Collection Coordinator",
        needed: 4,
        signedUp: 2,
        description: "Organize and manage donation collection points",
        requirements: [
          "Organizational skills",
          "Available during collection hours",
          "Ability to coordinate with multiple locations"
        ],
        tasks: [
          "Monitor and empty collection bins",
          "Log incoming items by type and size",
          "Coordinate pickups with drivers",
          "Prepare items for sorting sessions"
        ]
      },
      {
        id: "sorting",
        name: "Sorting & Organization",
        needed: 8,
        signedUp: 5,
        description: "Sort and organize donated items",
        requirements: [
          "Attention to detail",
          "Ability to lift and move boxes",
          "Available weekday mornings"
        ],
        tasks: [
          "Sort by size, type, and condition",
          "Steam/clean items as needed",
          "Box and label items for distribution",
          "Maintain organized storage areas"
        ]
      },
      {
        id: "distribution",
        name: "Distribution Team",
        needed: 10,
        signedUp: 7,
        description: "Help distribute coats to families in need",
        requirements: [
          "Compassionate and patient",
          "Available weekends",
          "Ability to interact with diverse families"
        ],
        tasks: [
          "Set up distribution stations",
          "Assist families with sizing and selection",
          "Track items distributed for reporting",
          "Tear down and clean event area"
        ]
      }
    ]
  },
  "3": { // Community Garden Project
    ministryId: "3",
    roles: [
      // TODO: Add volunteer roles for Community Garden Project
      {
        id: "gardening",
        name: "Gardening Team",
        needed: 12,
        signedUp: 8,
        description: "Maintain and cultivate the community garden",
        requirements: [
          "Basic gardening knowledge (training provided)",
          "Physical ability to work outdoors",
          "Available weekday mornings or weekends",
          "Commitment to regular schedule"
        ],
        tasks: [
          "Weed, water, and mulch beds",
          "Start seedlings and transplant",
          "Manage compost bins",
          "Document growth and harvest notes"
        ]
      },
      {
        id: "harvest",
        name: "Harvest & Distribution",
        needed: 6,
        signedUp: 4,
        description: "Harvest produce and distribute to food bank",
        requirements: [
          "Available during harvest season",
          "Ability to lift produce boxes",
          "Reliable transportation"
        ],
        tasks: [
          "Harvest according to ripeness guidelines",
          "Wash and pack produce",
          "Deliver to food bank and obtain receipts",
          "Track pounds donated"
        ]
      }
    ]
  },
  "4": { // Food Pantry
    ministryId: "4",
    roles: [
      // TODO: Add volunteer roles for Food Pantry
      {
        id: "stocking",
        name: "Stocking & Inventory",
        needed: 8,
        signedUp: 6,
        description: "Stock shelves and manage inventory",
        requirements: [
          "Physical ability to lift 30+ lbs",
          "Organizational skills",
          "Available weekday mornings",
          "Food safety knowledge (training provided)"
        ],
        tasks: [
          "Receive deliveries and check invoices",
          "Rotate stock (FIFO) and label items",
          "Restock shelves and cold storage",
          "Report low inventory to coordinator"
        ]
      },
      {
        id: "client-services",
        name: "Client Services",
        needed: 15,
        signedUp: 12,
        description: "Assist clients with food selection and check-in",
        requirements: [
          "Friendly and patient demeanor",
          "Bilingual preferred (Spanish/English)",
          "Available Thursday mornings 9 AM - 12 PM",
          "Background check required"
        ],
        tasks: [
          "Greet and check in clients",
          "Assist with shopping route and choices",
          "Carry-out support for seniors/disabled",
          "Log visits and feedback"
        ]
      },
      {
        id: "delivery",
        name: "Delivery Driver",
        needed: 5,
        signedUp: 3,
        description: "Deliver food to homebound clients",
        requirements: [
          "Valid driver's license",
          "Reliable vehicle",
          "Available weekday afternoons",
          "Background check required"
        ],
        tasks: [
          "Pick up pre-packed orders",
          "Plan efficient delivery routes",
          "Deliver with courtesy and verify handoff",
          "Return delivery logs"
        ]
      }
    ]
  },
  "5": { // Back to School Drive
    ministryId: "5",
    roles: [
      // TODO: Add volunteer roles for Back to School Drive
      {
        id: "supplies-coordinator",
        name: "Supplies Coordinator",
        needed: 4,
        signedUp: 2,
        description: "Organize and manage school supply collection",
        requirements: [
          "Strong organizational skills",
          "Available during collection period",
          "Ability to coordinate with schools"
        ],
        tasks: [
          "Coordinate with partner schools on needs",
          "Manage donation bins and pickups",
          "Maintain supply inventory lists",
          "Schedule packing sessions"
        ]
      },
      {
        id: "packing",
        name: "Backpack Packing Team",
        needed: 10,
        signedUp: 7,
        description: "Pack backpacks with school supplies",
        requirements: [
          "Attention to detail",
          "Available weekday evenings or weekends",
          "Ability to follow packing lists"
        ],
        tasks: [
          "Assemble backpacks per grade-level lists",
          "Quality-check and seal completed kits",
          "Stage pallets for distribution",
          "Track kit counts per school"
        ]
      },
      {
        id: "distribution-event",
        name: "Distribution Event Volunteers",
        needed: 20,
        signedUp: 15,
        description: "Help at the distribution event",
        requirements: [
          "Available on distribution day",
          "Friendly and welcoming",
          "Ability to work with children and families"
        ],
        tasks: [
          "Set up check-in and distribution stations",
          "Manage lines and assist families",
          "Refill supplies and handle crowd flow",
          "Tear down and cleanup"
        ]
      }
    ]
  }
};

/**
 * Helper function to get volunteer roles for a specific ministry
 */
export function getVolunteerRolesForMinistry(ministryId: string): VolunteerRole[] {
  return ministriesVolunteerData[ministryId]?.roles || [];
}

