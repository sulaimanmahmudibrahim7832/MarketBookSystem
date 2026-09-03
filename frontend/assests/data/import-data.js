export { importRecords ,activeProducts};
    const activeProducts = [
{
    id: "PRD-001",
    name: "Nike Air Max 270",
    quantity: 62
},
{
    id: "PRD-003",
    name: "Canvas Shoe",
    quantity: 35
},
    {
        id: "PRD-005",
        name: "Men's Leather Shoe",
        quantity: 47
    }
];
const importRecords = [
{
    id: "IMP-001",
    productId: "PRD-001",
    productName: "Nike Air Max 270",
    quantity: 50,
    supplier: "Supplier A",
    reference: "INV-1001",
    date: "2026-08-28",
},
{
    id: "IMP-002",
    productId: "PRD-003",
    productName: "Canvas Shoe",
    quantity: 80,
    supplier: "Supplier B",
    reference: "INV-1002",
    date: "2026-08-27"
},
{
    id: "IMP-003",
    productId: "PRD-005",
    productName: "Men's Leather Shoe",
    quantity: 35,
    supplier: "Supplier C",
    reference: "INV-1003",
    date: "2026-08-26"
  },
{
    id: "IMP-004",
    productId: "PRD-002",
    productName: "Men's Leather Shoe",
    quantity: 35,
    supplier: "Supplier F",
    reference: "INV-1003",
    date: "2026-10-26"
}
];
