import { dashboardData } from "../assests/data/dashboard-data.js";
const businessName =document.getElementById("businessName" );
const businessType =document.getElementById(  "businessType");
const activeProducts =document.getElementById("activeProducts");
const currentInventory =document.getElementById( "currentInventory");
const totalImports =document.getElementById("totalImports");
const totalExports =document.getElementById("totalExports");
const dailyMovement =document.getElementById("dailyMovement");
const weeklyMovement =document.getElementById( "weeklyMovement");
const monthlyMovement =document.getElementById("monthlyMovement");
const activityList =document.getElementById("activityList");


/* =========================
BUSINESS INFORMATION
========================= */


function renderBusinessInfo() {
    businessName.textContent = dashboardData.business.name;
    businessType.textContent =dashboardData.business.type;
}


/* =========================
SUMMARY
========================= */


function renderSummary()
{
        const inventory =    dashboardData.products.reduce( (total,product) => total +product.quantity,0);
        const imported =dashboardData.imports.reduce(( total, record) =>total +record.quantity,0);
        const exported = dashboardData.exports.reduce(( total,record)=>total +record.quantity,0);
        activeProducts.textContent =dashboardData.products.length;
        currentInventory.textContent = inventory;
        totalImports.textContent =imported;
        totalExports.textContent =exported;
}


/* =========================
MOVEMENT
========================= */


function renderMovement()
{

    dailyMovement.textContent =dashboardData.movement.daily;
    weeklyMovement.textContent =dashboardData.movement.weekly;
    monthlyMovement.textContent = dashboardData.movement.monthly;
}


/* =========================
RECENT ACTIVITY
========================= */


function renderActivity() {
activityList.innerHTML = "";
    if (dashboardData.recentActivity.length === 0)
    {
        activityList.innerHTML = `
        <div class="empty-state">
            No recent activity.
        </div>

    `;
    return;
    }

dashboardData.recentActivity.forEach(activity => {
            const item =document.createElement("div");
            item.className ="activity-item";
            item.innerHTML = `
                <div class="activity-main">
                    <strong>
                        ${activity.type}
                        — 
                        ${activity.product}
                    </strong>
                    <span>
                        ${activity.date}
                    </span>
                </div>
                <span class="activity-quantity">
                    ${ activity.type === "Import"     ? "+"    : "-" }${activity.quantity}
                </span>
            `;
            activityList.appendChild(item);});
}


/* =========================
INITIALIZE
========================= */


function initializeDashboard()
{
    renderBusinessInfo();
    renderSummary();
    renderMovement();
    renderActivity();
}
initializeDashboard();

