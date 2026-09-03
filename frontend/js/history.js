/* =========================
TEMPORARY HISTORY DATA


Later this will come from
the backend activity records.
========================= */


const historyRecords = [


{


    id: "ACT-001",


    type: "import",


    description:
        "Imported 50 units of Nike Air Max 270",


    reference:
        "INV-1001",


    date:
        "2026-08-28"


},




{


    id: "ACT-002",


    type: "export",


    description:
        "Exported 8 units of Nike Air Max 270",


    reference:
        "INV-2001",


    date:
        "2026-08-28"


},




{


    id: "ACT-003",


    type: "product",


    description:
        "Activated Canvas Shoe for inventory",


    reference:
        "PRD-003",


    date:
        "2026-08-27"


},




{


    id: "ACT-004",


    type: "import",


    description:
        "Imported 80 units of Canvas Shoe",


    reference:
        "INV-1002",


    date:
        "2026-08-27"


},




{


    id: "ACT-005",


    type: "export",


    description:
        "Exported 5 units of Canvas Shoe",


    reference:
        "INV-2002",


    date:
        "2026-08-27"


},




{


    id: "ACT-006",


    type: "account",


    description:
        "Business account information updated",


    reference:
        "-",


    date:
        "2026-08-26"


}


];


/* =========================
ELEMENTS
========================= */


const historyCount =


document.getElementById(
    "historyCount"
);


const visibleHistoryCount =


document.getElementById(
    "visibleHistoryCount"
);


const activityType =


document.getElementById(
    "activityType"
);


const historyDate =


document.getElementById(
    "historyDate"
);


const clearFilters =


document.getElementById(
    "clearFilters"
);


const historyTableBody =


document.getElementById(
    "historyTableBody"
);


const mobileHistoryList =


document.getElementById(
    "mobileHistoryList"
);


/* =========================
UPDATE TOTAL COUNT
========================= */


function updateTotalCount() {


historyCount.textContent =
    historyRecords.length;


}


/* =========================
FILTER RECORDS
========================= */


function getFilteredRecords() {


const selectedType =
    activityType.value;




const selectedDate =
    historyDate.value;






return historyRecords.filter(
    record => {




        const typeMatches =


            selectedType === "all" ||
            record.type ===
                selectedType;




        const dateMatches =


            !selectedDate ||
            record.date ===
                selectedDate;






        return (
            typeMatches &&
            dateMatches
        );


    }
);


}


/* =========================
FORMAT TYPE
========================= */


function formatActivityType(
type
) {


if (type === "import") {


    return "Import";


}




if (type === "export") {


    return "Export";


}




if (type === "product") {


    return "Product";


}




if (type === "account") {


    return "Account";


}




return type;


}


/* =========================
RENDER TABLE
========================= */


function renderTable(
records
) {


historyTableBody.innerHTML =
    "";






if (
    records.length === 0
) {




    historyTableBody.innerHTML = `


        <tr>


            <td colspan="6">


                <div class="empty-state">


                    No activity records found.


                </div>


            </td>


        </tr>


    `;




    return;


}






records.forEach(
    record => {




        const row =
            document.createElement(
                "tr"
            );




        row.innerHTML = `


            <td>


                <span class="activity-id">


                    ${record.id}


                </span>


            </td>




            <td>


                <span class="activity-type">


                    ${formatActivityType(
                        record.type
                    )}


                </span>


            </td>




            <td>


                <span class="activity-description">


                    ${record.description}


                </span>


            </td>




            <td>


                ${record.reference}


            </td>




            <td>


                ${record.date}


            </td>




            <td>


                <button


                    class="record-action"


                    type="button"


                    data-history-id="${record.id}"


                    aria-label="History options">


                    ⋮


                </button>


            </td>


        `;




        historyTableBody.appendChild(
            row
        );


    }
);


}


/* =========================
MOBILE RECORDS
========================= */


function renderMobile(
records
) {


mobileHistoryList.innerHTML =
    "";






if (
    records.length === 0
) {




    mobileHistoryList.innerHTML = `


        <div class="empty-state">


            No activity records found.


        </div>


    `;




    return;


}






records.forEach(
    record => {




        const item =
            document.createElement(
                "article"
            );




        item.className =
            "mobile-history-record";




        item.innerHTML = `


            <div class="mobile-history-header">




                <div class="mobile-history-title">


                    <strong>


                        ${record.description}


                    </strong>




                    <span>


                        ${record.id}


                    </span>


                </div>




                <button


                    class="record-action"


                    type="button"


                    data-history-id="${record.id}"


                    aria-label="History options">


                    ⋮


                </button>




            </div>






            <div class="mobile-history-details">




                <div class="mobile-detail">


                    <span>
                        Activity
                    </span>


                    <strong>


                        ${formatActivityType(
                            record.type
                        )}


                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Reference
                    </span>


                    <strong>
                        ${record.reference}
                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Date
                    </span>


                    <strong>
                        ${record.date}
                    </strong>


                </div>




            </div>


        `;




        mobileHistoryList.appendChild(
            item
        );


    }
);


}


/* =========================
RENDER HISTORY
========================= */


function renderHistory() {


const records =
    getFilteredRecords();




visibleHistoryCount.textContent =


    `${records.length} activit${
        records.length === 1
            ? "y"
            : "ies"
    }`;




renderTable(records);


renderMobile(records);


}


/* =========================
FILTER EVENTS
========================= */


activityType.addEventListener(
"change",
renderHistory
);


historyDate.addEventListener(
"change",
renderHistory
);


/* =========================
CLEAR FILTERS
========================= */


clearFilters.addEventListener(
"click",
function() {
 

    activityType.value =
        "all";




    historyDate.value =
        "";




    renderHistory();


}


);


/* =========================
INITIALIZE
========================= */


updateTotalCount();


renderHistory();

