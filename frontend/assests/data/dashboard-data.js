export { dashboardData };
import { activeProducts } from "./import-data.js";

const dashboardData = {
business: {
    name: "My Tixtile Store",
    type: "Retail Business"
},
products: [
    {
        id: "PRD-001",
    name: "Nike Air Max 270",
        quantity: 62
    },
    {
        id: "PRD-002",
        name: "Leather Shoe",
        quantity: 35
    },
    {
        id: "PRD-003",
        name: "Canvas Shoe",
        quantity: 48
    }
],
imports: [
    {
        id: "IMP-001",
        productId: "PRD-001",
        quantity: 50
    },
    {
        id: "IMP-002",
        productId: "PRD-002",
        quantity: 35
    }
],
exports: [
    {
        id: "EXP-001",
        productId: "PRD-001",
        quantity: 8
    }
],
recentActivity: [
    {
        type: "Import",
        product: "Nike Air Max 270",
        quantity: 50,
        date: "Today"
    },
    {
        type: "Export",
        product: "Nike Air Max 270",
        quantity: 8,
        date: "Today"
    },
    {
        type: "Import",
        product: "Leather Shoe",
        quantity: 35,
        date: "Yesterday"
    }
],
movement: {
    daily: 58,
    weekly: 143,
    monthly: 421
     }
};