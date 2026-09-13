import { importRecords, activeProducts } from "../assests/data/import-data.js";
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
                    class="dot record-action"
                    type="button"
                    data-import-id="${record.id}"
                    aria-label="Import options">
                    ⋮
                </button>
            </td>
            <section id="action-buttons" class="action-section">
<div class="action-container">
  <div class="button-row"
     id="btn-row"
   >
   <button class="record-action edit-btn" 
    id="editButton">
     &#9998;
   </button>


   <button class="record-action delete-btn"
      id="deleteButton"
   >
    &#128465;
   </button>
  </div>
</div>
</section>


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
if (importRecords.length === 0) {
    mobileImportList.innerHTML = `


        <div class="empty-state">


            No import records found.


        </div>


    `;


    return;
}
    importRecords.forEach(
        record => {
            const item = document.createElement("article");




            item.className ="mobile-record";
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
                    class="record-action  dot"
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
                <section id="action-buttons" class="action-section">
<div class="action-container">
  <div class="button-row"
     id="btn-row"
   >
   <button class="record-action edit-btn" 
    id="editButton">
     &#9998;
   </button>
   <button class="record-action delete-btn"
      id="deleteButton"
   >
    &#128465;
   </button>
  </div>
</div>
</section>

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
    const editButtons = document.querySelectorAll(".edit-btn")
    const deleteButtons = document.querySelectorAll(".delete-btn");
    //console.log(editButtons);
    //console.log(deleteButtons);
    const edtbtnArr = [...editButtons];
    const delbtnArr = [...deleteButtons];

    //console.log(edtbtnArr[0], delbtnArr[4]);

    const recordActionButtons = document.querySelectorAll(".dot");
    
    const sections = document.querySelectorAll(".action-section");
    sections.forEach(section => {
        section.style.display = "none";
    });
    //const sectionsArr = [...sections];
    const buttonsArr = [...recordActionButtons];
   
    //const btnRow = document.querySelectorAll(".btn");
    //const btnRowArr = [...btnRow];


    /*let seconds = 0;
    let minutes = 0;
    let hours = 0;
            setInterval(() => {
    seconds = seconds + 1;
                console.log(seconds, `second${seconds === 1 ? "" : "s"}`);
                if (seconds%60 === 0) {
                    minutes = 1 + minutes;
                    console.log(minutes,`minute ${minutes === 0 ? "":"s"}`);
                }
                if (minutes % 60 === 0) {
                    hours = 1 + hours;
                    console.log(hours, `${hours === 0 ? "" : "s"}`);
                }
  },
            1000);*/
    /*setTimeout(() => {
          console.log("1 minute");
    },60000)*/
    buttonsArr.forEach(btn => {
        btn.addEventListener("click", () => {
            let currentIndex = buttonsArr.indexOf(btn);
            //let length = buttonsArr.length;
            sections[currentIndex].style.display = "grid";
            setTimeout(() => {
                sections[currentIndex].style.display = "none";
             },
                5000);
           //console.log(btnRowArr)
            /*btnRowArr.forEach(btnR => {
                btnR.addEventListener("click", () => {
                    const btnIndex = btnRowArr.indexOf(btnR);
                    console.log("clicked")
               }) 
            });   */         
          /*  if (currentIndex > ((length/2)-1)) {
                currentIndex = Math.abs(((length / 2)) - currentIndex);
            }*/
            
        })
    });


    editButtons.forEach(edit => {
        edit.addEventListener("click", () => {
            let editIndex = edtbtnArr.indexOf(edit);
            const lenArr = edtbtnArr.length;
            if (editIndex > (lenArr / 2)-1) {
                 editIndex = editIndex - ((lenArr / 2));
            }
        
            //console.log(importRecords[editIndex]);
            const record = importRecords[editIndex];
            let newProductName = prompt("Enter name of the product please");
            let newQuantity = prompt("Enter edit quantity please");
            let newsupplierName = prompt("Enter the name of supplier");

            record.quantity = Number(newQuantity);
            record.productName = newProductName;
            record.supplier = newsupplierName;
            renderImports();
            
            //console.log(record);


            //console.log(record);
    });
});
    deleteButtons.forEach(del => {
        del.addEventListener("click", () => {
          let delIndex = delbtnArr.indexOf(del);
                const lenArr = delbtnArr.length;
        if (delIndex > (lenArr / 2)-1) {
            delIndex = Math.abs(delIndex - ((lenArr / 2)));
            
            }
            console.log(delIndex);
            importRecords.splice(delIndex, 1);
            renderImports();

            //console.log("delted was clicked");
            
   }) 
});
        
   /* const list = [1, 2, 4, 5, 0];
    list.splice(4, 1);
    console.log(list);*/
      
};


/* =========================
IMPORT FORM
========================= */

importForm.addEventListener("submit",event=> {
    event.preventDefault();
const selectedProduct =activeProducts.find(product =>product.id ===     productSelect.value);
    if (!selectedProduct) {
        alert( "Please select an active product.");
        return;
    }
    const quantity = Number(document.getElementById("quantity").value );

    if (  !Number.isInteger(quantity) ||  quantity < 1) {
        alert( "Please enter a valid quantity.");
        return;
    }
    const supplier =  document.getElementById(  "supplier" ).value.trim();
    const reference =document.getElementById( "reference").value.trim();
    const importDate = document.getElementById( "importDate").value;
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
    alert(`your description for ${newRecord.productName}, is :
         ${newRecord.note === "" ? "no description provided" : newRecord.note}.
        `);
    importRecords.unshift(newRecord);
    /*
     * Import increases the
     * user's available inventory.
     */
// backend rule 
    selectedProduct.quantity +=quantity;
    importForm.reset();
    renderImports();
    alert( "Import record added successfully.");
});


/* =========================
INITIALIZE
========================= */


populateProducts();


renderImports();

