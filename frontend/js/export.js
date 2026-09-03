import { activeProducts } from "../assests/data/import-data.js";
import { exportRecords } from "../assests/data/export-data.js";
const exportForm =
document.getElementById("exportForm");
const productSelect =document.getElementById("productId");
const availableQuantity =document.getElementById("availableQuantity");


const tableBody =document.getElementById( "exportTableBody");


const mobileExportList =


document.getElementById(
    "mobileExportList"
);


const exportRecordCount =


document.getElementById(
    "exportRecordCount"
);


const recentExportCount =


document.getElementById(
    "recentExportCount"
);


/* =========================
PRODUCT SELECT
========================= */


function populateProducts() {


productSelect.innerHTML = `


    <option value="">


        Select active product


    </option>


`;






activeProducts.forEach(
    product => {




        const option =
            document.createElement(
                "option"
            );




        option.value =
            product.id;




        option.textContent =


            `${product.name} (${product.id})`;




        productSelect.appendChild(
            option
        );


    }
);


}


/* =========================
AVAILABLE QUANTITY
========================= */


function updateAvailableQuantity() {


const selectedProduct =


    activeProducts.find(
        product =>product.id ===productSelect.value);






if (!selectedProduct) {


    availableQuantity.textContent =
        "Select a product";


    return;


}






availableQuantity.textContent =


    `${selectedProduct.quantity} units available`;


}


/* =========================
COUNTS
========================= */


function updateExportCount() {


const count =
    exportRecords.length;




exportRecordCount.textContent =
    count;




recentExportCount.textContent =


    `${count} record${
        count === 1
            ? ""
            : "s"
    }`;


}


/* =========================
RENDER TABLE
========================= */


function renderTable() {


tableBody.innerHTML = "";




if (
    exportRecords.length === 0
) {




    tableBody.innerHTML = `


        <tr>


            <td colspan="7">


                <div class="empty-state">


                    No export records found.


                </div>


            </td>


        </tr>


    `;




    return;


}






exportRecords.forEach(
    record => {




        const row =
            document.createElement(
                "tr"
            );




        row.innerHTML = `


            <td>


                <span class="export-id">


                    ${record.id}


                </span>


            </td>




            <td>


                <span class="product-name">


                    ${record.productName}


                </span>


            </td>




            <td>


                ${record.quantity}


            </td>




            <td>


                ${record.destination}


            </td>




            <td>


                ${record.reference || "-"}


            </td>




            <td>


                ${record.date}


            </td>




            <td>


                <button


                    class="record-action"


                    type="button"


                    data-export-id="${record.id}"


                    aria-label="Export options">


                    ⋮


                </button>


            </td>


        `;




        tableBody.appendChild(row);


    }
);


}


/* =========================
MOBILE RECORDS
========================= */


function renderMobileRecords() {


mobileExportList.innerHTML = "";




if (
    exportRecords.length === 0
) {




    mobileExportList.innerHTML = `


        <div class="empty-state">


            No export records found.


        </div>


    `;




    return;


}






exportRecords.forEach(
    record => {
        const item =
            document.createElement(
                "article"
            );




        item.className =
            "mobile-record";




        item.innerHTML = `


            <div class="mobile-record-header">




                <div class="mobile-record-title">


                    <strong>


                        ${record.productName}


                    </strong>




                    <span>


                        ${record.id}


                    </span>


                </div>




                <button


                    class="record-action"


                    type="button"


                    data-export-id="${record.id}"
                    aria-label="Export options">
                    ⋮
                </button>




            </div>






            <div class="mobile-record-details">




                <div class="mobile-detail">


                    <span>
                        Product ID
                    </span>


                    <strong>
                        ${record.productId}
                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Quantity
                    </span>


                    <strong>
                        ${record.quantity}
                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Destination
                    </span>


                    <strong>
                        ${record.destination}
                    </strong>


                </div>




                <div class="mobile-detail">


                    <span>
                        Reference
                    </span>


                    <strong>
                        ${record.reference || "-"}
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




        mobileExportList.appendChild(
            item
        );


    }
);


}


/* =========================
RENDER ALL
========================= */


function renderExports() {


updateExportCount();


renderTable();


renderMobileRecords();


}


/* =========================
EXPORT FORM
========================= */


exportForm.addEventListener(
"submit",
function(event) {


    event.preventDefault();






    const selectedProduct =


        activeProducts.find(
            product =>
                product.id ===
                productSelect.value
        );






    if (!selectedProduct) {


        alert(
            "Please select an active product."
        );


        return;


    }






    const quantity =


        Number(
            document.getElementById(
                "quantity"
            ).value
        );






    if (
        !Number.isInteger(quantity) ||
        quantity < 1
    ) {


        alert(
            "Please enter a valid quantity."
        );


        return;


    }






    if (
        quantity >
        selectedProduct.quantity
    ) {


        alert(
            "Export quantity cannot exceed available inventory."
        );


        return;


    }






    const destination =


        document.getElementById(
            "destination"
        ).value.trim();




    const reference =


        document.getElementById(
            "reference"
        ).value.trim();




    const exportDate =


        document.getElementById(
            "exportDate"
        ).value;




    const note =


        document.getElementById(
            "note"
        ).value.trim();






    const newRecord = {




        id:


            `EXP-${
                String(
                    exportRecords.length + 1
                ).padStart(3, "0")
            }`,




        productId:
            selectedProduct.id,




        productName:
            selectedProduct.name,




        quantity,


        destination,


        reference,


        date:
            exportDate,


        note


    };






    exportRecords.unshift(
        newRecord
    );






    /*
     * Export decreases the
     * user's available inventory.
     */


    selectedProduct.quantity -=
        quantity;






    exportForm.reset();




    updateAvailableQuantity();




    renderExports();




    alert(
        "Export record added successfully."
    );


}


);


/* =========================
PRODUCT CHANGE
========================= */


productSelect.addEventListener(
"change",
updateAvailableQuantity
);


/* =========================
INITIALIZE
========================= */


populateProducts();


renderExports();


updateAvailableQuantity();

