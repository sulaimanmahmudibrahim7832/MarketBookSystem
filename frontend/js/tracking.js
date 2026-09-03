import { movementRecords } from "../assests/data/tracking-data.js";
/* =========================
ELEMENTS
========================= */


const periodButtons =document.querySelectorAll( ".period-button");
const totalMovement = document.getElementById("totalMovement");
const importedQuantity =document.getElementById("importedQuantity");
const exportedQuantity =document.getElementById( "exportedQuantity");
const netMovement =document.getElementById("netMovement");
const importBar =document.getElementById("importBar");
const exportBar =document.getElementById("exportBar");
const importBarValue =document.getElementById("importBarValue");
const exportBarValue =document.getElementById("exportBarValue");
const chartDescription =document.getElementById("chartDescription");
const movementRecordCount =document.getElementById("movementRecordCount");
const movementTableBody =document.getElementById("movementTableBody");
const mobileMovementList =document.getElementById("mobileMovementList");
let currentPeriod = "daily";
/* =========================
GET PERIOD DATA
========================= */

function getPeriodData(record) {
return {
    imported:record[`${currentPeriod}Import`],
    exported: record[ `${currentPeriod}Export` ]
};
}


/* =========================
PERIOD LABEL
========================= */


function getPeriodLabel() {


if (
    currentPeriod === "daily"
) {


    return "Today's";


}




if (
    currentPeriod === "weekly"
) {


    return "This week's";


}




return "This month's";


}


/* =========================
UPDATE SUMMARY
========================= */


function updateSummary() {


let totalImported = 0;


let totalExported = 0;






movementRecords.forEach(
    record => {




        const data =
            getPeriodData(record);

        totalImported +=
            data.imported;

        totalExported +=
            data.exported;


    }
);






const net =
    totalImported -
    totalExported;




const total =
    totalImported +
    totalExported;






importedQuantity.textContent =
    totalImported;




exportedQuantity.textContent =
    totalExported;




netMovement.textContent =
    net;




totalMovement.textContent =
    total;






importBarValue.textContent =
    totalImported;




exportBarValue.textContent =
    totalExported;






const maximum =
    Math.max(
        totalImported,
        totalExported,
        1
    );






importBar.style.width =


    `${(
        totalImported /
        maximum
    ) * 100}%`;




exportBar.style.width =


    `${(
        totalExported /
        maximum
    ) * 100}%`;




chartDescription.textContent =


    `${getPeriodLabel()}
     product movement`;


}


/* =========================
RENDER TABLE
========================= */


function renderTable() {


movementTableBody.innerHTML = "";






if (
    movementRecords.length === 0
) {




    movementTableBody.innerHTML = `


        <tr>


            <td colspan="5">


                <div class="empty-state">


                    No movement records found.


                </div>


            </td>


        </tr>


    `;




    return;


}






movementRecords.forEach(
    record => {




        const data =
            getPeriodData(record);




        const net =
            data.imported -
            data.exported;






        const row =
            document.createElement(
                "tr"
            );




        row.innerHTML = `


            <td>


                <span class="product-name">


                    ${record.productName}


                </span>


            </td>




            <td>


                <span class="product-id">


                    ${record.productId}


                </span>


            </td>




            <td>


                ${data.imported}


            </td>




            <td>


                ${data.exported}


            </td>




            <td>


                ${net}


            </td>


        `;




        movementTableBody.appendChild(
            row
        );


    }
);


}


/* =========================
MOBILE RECORDS
========================= */


function renderMobile() {


mobileMovementList.innerHTML = "";






if (
    movementRecords.length === 0
) {




    mobileMovementList.innerHTML = `


        <div class="empty-state">


            No movement records found.


        </div>


    `;




    return;


}






movementRecords.forEach(
    record => {




        const data =
            getPeriodData(record);




        const net =
            data.imported -
            data.exported;






        const item =
            document.createElement(
                "article"
            );




        item.className =
            "mobile-movement";




        item.innerHTML = `


            <div class="mobile-movement-header">


                <div class="mobile-movement-title">


                    <strong>


                        ${record.productName}


                    </strong>




                    <span>


                        ${record.productId}


                    </span>


                </div>


            </div>




            <div class="mobile-movement-details">




                <div class="mobile-detail">


                    <span>
                        Imported
                    </span>


                    <strong>
                        ${data.imported}
                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Exported
                    </span>


                    <strong>
                        ${data.exported}
                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Net Movement
                    </span>


                    <strong>
                        ${net}
                    </strong>


                </div>




            </div>


        `;




        mobileMovementList.appendChild(
            item
        );


    }
);


}


/* =========================
RENDER
========================= */


function renderTracking() {


movementRecordCount.textContent =


    `${movementRecords.length} products`;




updateSummary();


renderTable();


renderMobile();


}


/* =========================
PERIOD BUTTONS
========================= */


periodButtons.forEach(
button => {


    button.addEventListener(
        "click",
        function() {




            periodButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );




            this.classList.add(
                "active"
            );




            currentPeriod =
                this.dataset.period;




            renderTracking();


        }
    );


}


);


/* =========================
INITIALIZE
========================= */


renderTracking();

