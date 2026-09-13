import { productCatalogue,activeProducts } from "../assests/data/products-data.js";
const catalogueGrid = document.getElementById("catalogueGrid");
const activeProductTable =document.getElementById( "activeProductTable");
const mobileProductList =document.getElementById(  "mobileProductList");
const activeProductCount =document.getElementById( "activeProductCount");
const productSearch =document.getElementById("productSearch");
const categoryFilter =document.getElementById(  "categoryFilter");
const showAddProductButton = document.getElementById("showAddProductButton");
const addProductModal =document.getElementById("addProductModal");
const closeAddProductButton =document.getElementById("closeAddProductButton");
const cancelAddProductButton =document.getElementById("cancelAddProductButton");
const addProductForm =document.getElementById("addProductForm");




const quantityInput = document.getElementById("Quantity");
const quantityForm = document.getElementById("addQuantityForm");
const quantityAddButton = document.getElementById("quantityAddbutton");    
const cancelQuantityButton = document.getElementById("cancelQuantityButton");
const closeQuantityButtton = document.getElementById("closeQuantityButton");
const quantityModalDiv = document.getElementById("addQuantityModal");





const popDiv = document.getElementById("pop-id");
const details = document.querySelector(".details");
const closedButton = document.getElementById("closedAdded");
const addedProductButton = document.getElementById("added-product");
    function openQuantityModal() {
   quantityModalDiv.classList.add("active");
    quantityModalDiv.setAttribute("aria-hidden", "false");
   
       
}
 function closeQuantityModal() {
quantityModalDiv.classList.remove( "active");
     quantityModalDiv.setAttribute("aria-hidden", "true");
     quantityForm.reset();
}
closeQuantityButtton.addEventListener("click",closeQuantityModal);
cancelQuantityButton.addEventListener("click",closeQuantityModal);
async function activateModalQuantity() {    
    const quantity = await waitForQuantity();
    
    function waitForQuantity() {
        return new Promise(resolve => {
            quantityAddButton.addEventListener("click", (event) => {
                event.preventDefault();
                 
                const quantity = Number(quantityInput.value);
                resolve(quantity);
            },{once:true});
        });
    }
    
    closeQuantityModal();
    return quantity;

}

/* =========================
CATEGORY FILTER
========================= */

function populateCategories() {

    const categories = [  ...new Set(productCatalogue.map( product => product.category))];
             categories.forEach(
               category => {
                   const option = document.createElement( "option");
                   option.value = category;
                   option.textContent =category;
                   categoryFilter.appendChild(option);
                        }
              );
            };


            
/* =========================
ACTIVE PRODUCT CHECK
========================= */


function isProductActive(productId) {
    return activeProducts.some( product => product.id === productId);
};
// understading some() methods e.g [console.log(activeProducts.some(data => data.id));]


/* =========================
RENDER CATALOGUE
========================= */

function renderCatalogue() {
catalogueGrid.innerHTML = "";
    const searchValue = productSearch.value.trim().toLowerCase();
const selectedCategory =categoryFilter.value;
const filteredProducts =productCatalogue.filter( product => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue)
        || product.id.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory === "all" ||product.category === selectedCategory;
            return (  matchesSearch && matchesCategory);
        }
    );
if (  filteredProducts.length === 0) {
catalogueGrid.innerHTML = `
        <div class="empty-state">
            No products found.
        </div>
    `;
    return;
}

    function renderAlreadyActive(product) {
        const card = document.createElement("article");
           card.className ="catalogue-card";
        const alreadyActive =  isProductActive( product.id);
         card.innerHTML = `
             <h3>
                 ${product.name}
             </h3>
             <span class="product-id">
                 ${product.id}
             </span>
             <span class="product-category">
                 ${product.category}
             </span>
             <p>
                 ${product.description}
             </p>
             <button type="button"
                 class="${alreadyActive ? "secondary-button": "primary-button" }"
                 data-product-id="${product.id}"${alreadyActive  ? "disabled": ""}>
                 ${alreadyActive ? "Activated" : "Activate Product"}
             </button>
         `;
         catalogueGrid.appendChild(card);
    };
filteredProducts.forEach(
    product => {
        renderAlreadyActive(product);   
    }
);
};


/* =========================
ACTIVATE PRODUCT
========================= */

 async function activateProduct(productId) {
   const product = productCatalogue.find(item => item.id === productId);
if (!product) {
    return;
     }

  openQuantityModal();
  const quantity = await activateModalQuantity();
     if (!Number.isInteger(quantity) || quantity < 0) {
         alert("please enter a valid quantity");
    return;
}

 activeProducts.push({
    id: product.id,
    quantity,
    status:"Active"
 });
     const activateProductReq = {
};
     activateProductReq.id = product.id;
     activateProductReq.quantity = quantity;
     activateProductReq.status = "Active";
     console.log(activateProductReq);
    
renderAll();
}


/* =========================
RENDER ACTIVE PRODUCTS
========================= */


function renderActiveProducts() {
activeProductTable.innerHTML = "";
mobileProductList.innerHTML = "";
if (activeProducts.length === 0) {
    activeProductTable.innerHTML = `
        <tr>
            <td colspan="6">
                <div class="empty-state">
                    You have no active products.
                </div>
            </td>
        </tr>
    `;


    mobileProductList.innerHTML = `
        <div class="empty-state">
            You have no active products.
        </div>
    `;
    return;
    };

    activeProducts.forEach(
        activeProduct => {
            const product = productCatalogue.find( item => item.id === activeProduct.id);
            if (!product) {
                return;
            }
        /* DESKTOP */

    
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <span class="product-id">
                    ${product.id}
                </span>
            </td>
            <td>
                <span class="product-name">
                    ${product.name}
                </span>
            </td>
            <td>
                ${product.category}
            </td>
            <td>
                ${activeProduct.quantity}
            </td>
            <td>
                <span class="status">
                    ${activeProduct.status}
                </span>
            </td>
            <td>
                <button
                    type="button"
                    class="secondary-button"
                    data-remove-product-id="${product.id}">
                    Deactivate
                </button>
            </td>
        `;
        activeProductTable.appendChild(row);
        /* MOBILE */
        const item = document.createElement("article");

        item.className ="mobile-product";
        item.innerHTML = `
            <div class="mobile-product-header">
                <div class="mobile-product-title">
                    <strong>
                        ${product.name}
                    </strong>
                    <span>
                        ${product.id}
                    </span>
                </div>
                <span class="status">
                    ${activeProduct.status}
                </span>
            </div>
            <div class="mobile-product-details">
                <div class="mobile-detail">
                    <span>
                        Category
                    </span>
                    <strong>
                        ${product.category}
                    </strong>
                </div>
                <div class="mobile-detail">
                    <span>
                        Quantity
                    </span>
                    <strong>
                        ${activeProduct.quantity}
                    </strong>
                </div>
            </div>
            <div style="margin-top: 14px;">
                <button
                    type="button"
                    class="secondary-button"
                    data-remove-product-id="${product.id}">
                    Deactivate
                </button>
            </div>
        `;
        mobileProductList.appendChild(item);
    }
);
activeProductCount.textContent = activeProducts.length;
}


/* =========================
DEACTIVATE PRODUCT
========================= */


function deactivateProduct(productId)
{
    const index =activeProducts.findIndex(product =>  product.id === productId);
    if (index === -1) {
        return;
    }
    const deActivateReq = {
    }
    deActivateReq.id = activeProducts[index].id;
    deActivateReq.quantity = activeProducts[index].quantity;
    deActivateReq.status = activeProducts[index].status;
    console.log(deActivateReq);
    activeProducts.splice(index,1);
    renderAll();
};


/* =========================
ADD NEW PRODUCT
========================= */


function openAddProductModal() {
addProductModal.classList.add("active");
    addProductModal.setAttribute("aria-hidden", "false");
    
}


function closeAddProductModal() {
addProductModal.classList.remove( "active");
addProductModal.setAttribute( "aria-hidden","true");
    addProductForm.reset();
   
}


/* =========================
NEW PRODUCT SUBMISSION
========================= */





function openAddedProduct() {
    popDiv.style.display = "grid";
}
function closedAddedProduct() {
    popDiv.style.display = "none";
}
addedProductButton.addEventListener("click", openAddedProduct);
closedButton.addEventListener("click", closedAddedProduct);
addProductForm.addEventListener("submit", event => {
    event.preventDefault();
    const name =document.getElementById("newProductName").value.trim();
    const category =document.getElementById("newProductCategory").value.trim();
    const brand =document.getElementById( "newProductBrand").value.trim();
    const description = document.getElementById("newProductDescription").value.trim();
    const nextId =  `PRD-${String( productCatalogue.length + 1).padStart(3, "0")}`;
    const newProduct = {
        id:nextId,
        name,
        category: category || " no category Provided",
        brand: brand || "Generic",
        description: description || "No description provided."
    };
    productCatalogue.push(newProduct);    
    closeAddProductModal();
    populateCategories();
    renderAll();
    setTimeout(() => {
        closedAddedProduct(); 
    }, 5000)
    details.innerHTML = `${name} \t was added to the PITMS product catalogue.`;
}); 


const Description = document.getElementById("newProductDescription");
Description.addEventListener("mouseenter", () => {
    Description.textContent = "\t \t";
})
closedAddedProduct();
/* =========================
EVENTS
========================= */


productSearch.addEventListener("input",renderCatalogue);
categoryFilter.addEventListener("change",renderCatalogue);
showAddProductButton.addEventListener("click",openAddProductModal);
closeAddProductButton.addEventListener("click",closeAddProductModal);
cancelAddProductButton.addEventListener("click",closeAddProductModal);
catalogueGrid.addEventListener("click",event=>{
    const button = event.target.closest("button[data-product-id]");
    if (!button) {
        return;
    }
    activateProduct( button.dataset.productId);
});


activeProductTable.addEventListener("click",event=> {
 const button =   event.target.closest("button[data-remove-product-id]");
    if (!button) {
        return;
    }

    deactivateProduct(button.dataset.removeProductId);
});

mobileProductList.addEventListener("click",
event=> {
    const button =
        event.target.closest("button[data-remove-product-id]");
    if (!button) {
        return;
    }
    deactivateProduct(button.dataset.removeProductId);
});


/* =========================
RENDER ALL
========================= */


function renderAll() {
renderCatalogue();
renderActiveProducts();
}


/* =========================
INITIALIZE
========================= */
populateCategories();
renderAll();
