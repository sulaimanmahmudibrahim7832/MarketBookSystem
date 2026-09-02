
/* data objects for backend decisions */ 
const productCatalogue = [
{
    id: "PRD-001",
    name: "Nike Air Max 270",
    category: "Sneakers",
    brand: "Nike",
    description:
        "Sports and casual footwear."
},
{
    id: "PRD-002",
    name: "Men's Leather Shoe",
    category: "Formal Shoes",
    brand: "Generic",
    description:
        "Leather footwear for formal use."
},
{
    id: "PRD-003",
    name: "Canvas Shoe",
    category: "Casual Shoes",
    brand: "Generic",
    description:
        "Lightweight casual footwear."
},
{
    id: "PRD-004",
   name: "Leather Sandal",
    category: "Sandals",
    brand: "Generic",
    description:
        "Open footwear for everyday use."
}
];
const activeProducts = [
{
    id: "PRD-001",
    quantity: 20,
    status: "Active"
},
{
    id: "PRD-003",
    quantity: 35,
    status: "Active"
}
];

/* =========================
ELEMENTS
========================= */


const catalogueGrid =document.getElementById("catalogueGrid");
const activeProductTable =document.getElementById( "activeProductTable");
const mobileProductList =document.getElementById(  "mobileProductList");
const activeProductCount =document.getElementById( "activeProductCount");
const productSearch =document.getElementById("productSearch");
const categoryFilter =document.getElementById(  "categoryFilter");
const addProductModal =document.getElementById(    "addProductModal");
const showAddProductButton =document.getElementById("showAddProductButton");
const closeAddProductButton =document.getElementById("closeAddProductButton");
const cancelAddProductButton =document.getElementById("cancelAddProductButton");
const addProductForm =document.getElementById("addProductForm");


/* =========================
CATEGORY FILTER
========================= */


function populateCategories() {


    const categories = [  ...new Set(productCatalogue.map( product => product.category))];

   /* const array = [
        {
            odd: 1,
            even:2
        },
        {
            odd: 3,
            even:2
        },
        {
            odd: 5,
            even:6
        },
        {
            odd: 7,
            even:8
        },
        {
            odd: 9,
            even:10
        }
    ];

    const evens = [...new Set(array.map(number => number.even))];
    console.log(evens);
*/
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


function activateProduct(productId) {

const product =productCatalogue.find(item =>item.id === productId);
if (!product) {
    return;
}
    const quantityText = prompt(`Enter your available quantity for ${product.name}:`);
    if (quantityText === null) {
    return;
}

const quantity =  Number(quantityText);

if (!Number.isInteger(quantity) ||quantity < 0) {

    alert( "Please enter a valid quantity.");
    return;
}

activeProducts.push({
    id: product.id,
    quantity:quantity,
    status:"Active"
});



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
    activeProducts.splice(index,1);
    renderAll();
};


/* =========================
ADD NEW PRODUCT
========================= */


function openAddProductModal() {
addProductModal.classList.add("active");
addProductModal.setAttribute( "aria-hidden","false");
}


function closeAddProductModal() {
addProductModal.classList.remove( "active");
addProductModal.setAttribute( "aria-hidden","true");
addProductForm.reset();
}


/* =========================
NEW PRODUCT SUBMISSION
========================= */


addProductForm.addEventListener("submit",event=> {
    event.preventDefault();
    const name =document.getElementById("newProductName").value.trim();
    const category =document.getElementById("newProductCategory").value.trim();
    const brand =document.getElementById( "newProductBrand").value.trim();
    const description = document.getElementById("newProductDescription").value.trim();
    const nextId =
        `PRD-${String( productCatalogue.length + 1).padStart(3, "0")}`;
    const newProduct = {
        id:nextId,
        name,
        category: category || " no category Added",
        brand: brand || "Generic",
        description: description || "No description provided."
    };
    productCatalogue.push(newProduct);    
    closeAddProductModal();
    populateCategories();
    renderAll();
    alert(`${name} was added to the PITMS product catalogue.` );
});


/* =========================
EVENTS
========================= */


productSearch.addEventListener("input",renderCatalogue);
categoryFilter.addEventListener("change",renderCatalogue);
showAddProductButton.addEventListener("click",openAddProductModal);
closeAddProductButton.addEventListener("click",closeAddProductModal);
cancelAddProductButton.addEventListener("click",closeAddProductModal);
catalogueGrid.addEventListener("click",event=>{
    const button =
        event.target.closest(
            "button[data-product-id]"
        );
    if (!button) {
        return;
    }
    activateProduct(
        button.dataset.productId
    );
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
