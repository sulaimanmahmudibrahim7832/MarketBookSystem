
import { importRecords,activeProducts } from "../assests/data/import-data.js";
const importForm = document.getElementById("importForm");
const productSelect = document.getElementById("productId");
const tableBody = document.getElementById("importTableBody");
const mobileImportList = document.getElementById("mobileImportList");
const importRecordCount = document.getElementById( "importRecordCount");
const recentImportCount = document.getElementById("recentImportCount");

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
        const option =document.createElement("option");
        option.value =product.id;
        option.textContent =`${product.name} (${product.id})`;
        productSelect.appendChild(option);
    }
);
}


/* =========================
COUNTS
========================= */


function updateImportCount() {
const count =importRecords.length;
importRecordCount.textContent =count;
recentImportCount.textContent =
    `${count} record${count === 1 ? "": "s"}`;

}


/* =========================
RENDER TABLE
========================= */


function renderTable() {


tableBody.innerHTML = "";




if (importRecords.length === 0) {
    tableBody.innerHTML = `


        <tr>


            <td colspan="7">


                <div class="empty-state">


                    No import records found.


                </div>


            </td>


        </tr>


    `;




    return;


}






importRecords.forEach(
    record => {
        const row =document.createElement("tr");
        row.innerHTML = `
            <td>
                <span class="import-id">
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
                ${record.supplier}
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
                    data-import-id="${record.id}"
                    aria-label="Import options">
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


mobileImportList.innerHTML = "";




if (
    importRecords.length === 0
) {




    mobileImportList.innerHTML = `


        <div class="empty-state">


            No import records found.


        </div>


    `;




    return;


}






importRecords.forEach(
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


                    data-import-id="${record.id}"


                    aria-label="Import options">


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
                        Supplier
                    </span>


                    <strong>
                        ${record.supplier}
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




        mobileImportList.appendChild(
            item
        );


    }
);


}


/* =========================
RENDER ALL
========================= */


function renderImports() {


updateImportCount();


renderTable();


renderMobileRecords();


}


/* =========================
IMPORT FORM
========================= */


importForm.addEventListener(
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






    const supplier =


        document.getElementById(
            "supplier"
        ).value.trim();




    const reference =


        document.getElementById(
            "reference"
        ).value.trim();




    const importDate =


        document.getElementById(
            "importDate"
        ).value;




    const note = document.getElementById("note").value.trim();






    const newRecord = {
        id: `IMP-${String( importRecords.length + 1).padStart(3, "0") }`,
        productId:selectedProduct.id,
        productName:selectedProduct.name,
        quantity,
        supplier,
        reference,
        date:importDate,
        note
    };



    importRecords.unshift(newRecord);






    /*
     * Import increases the
     * user's available inventory.
     */


    selectedProduct.quantity +=quantity;
    importForm.reset();




    renderImports();




    alert(
        "Import record added successfully."
    );


}


);


/* =========================
INITIALIZE
========================= */


populateProducts();


renderImports();

