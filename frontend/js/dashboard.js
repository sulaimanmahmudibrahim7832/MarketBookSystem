

const dashboardData = {


business: {


    name: "My Shoe Store",


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


/* =========================
ELEMENTS
========================= */


const businessName =


document.getElementById(
    "businessName" 
);


const businessType =


document.getElementById(
    "businessType"
);


const activeProducts =


document.getElementById(
    "activeProducts"
);


const currentInventory =


document.getElementById(
    "currentInventory"
);


const totalImports =


document.getElementById(
    "totalImports"
);


const totalExports =


document.getElementById(
    "totalExports"
);


const dailyMovement =


document.getElementById(
    "dailyMovement"
);


const weeklyMovement =


document.getElementById(
    "weeklyMovement"
);


const monthlyMovement =


document.getElementById(
    "monthlyMovement"
);


const activityList =


document.getElementById(
    "activityList"
);


/* =========================
BUSINESS INFORMATION
========================= */


function renderBusinessInfo() {


businessName.textContent =
    dashboardData.business.name;




businessType.textContent =
    dashboardData.business.type;


}


/* =========================
SUMMARY
========================= */


function renderSummary() {


const inventory =


    dashboardData.products.reduce(


        (
            total,
            product
        ) =>


            total +
            product.quantity,


        0


    );




const imported =


    dashboardData.imports.reduce(


        (
            total,
            record
        ) =>


            total +
            record.quantity,


        0


    );




const exported =


    dashboardData.exports.reduce(


        (
            total,
            record
        ) =>


            total +
            record.quantity,


        0


    );






activeProducts.textContent =


    dashboardData.products.length;




currentInventory.textContent =
    inventory;




totalImports.textContent =
    imported;




totalExports.textContent =
    exported;


}


/* =========================
MOVEMENT
========================= */


function renderMovement() {


dailyMovement.textContent =


    dashboardData.movement.daily;




weeklyMovement.textContent =


    dashboardData.movement.weekly;




monthlyMovement.textContent =


    dashboardData.movement.monthly;


}


/* =========================
RECENT ACTIVITY
========================= */


function renderActivity() {


activityList.innerHTML = "";




if (
    dashboardData.recentActivity.length === 0
) {


    activityList.innerHTML = `


        <div class="empty-state">


            No recent activity.


        </div>


    `;


    return;


}






dashboardData.recentActivity
    .forEach(
        activity => {




            const item =
                document.createElement(
                    "div"
                );




            item.className =
                "activity-item";




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


                    ${
                        activity.type === "Import"
                            ? "+"
                            : "-"
                    }${activity.quantity}


                </span>


            `;




            activityList.appendChild(
                item
            );


        }
    );


}


/* =========================
INITIALIZE
========================= */


function initializeDashboard() {


renderBusinessInfo();


renderSummary();


renderMovement();


renderActivity();


}


initializeDashboard();

