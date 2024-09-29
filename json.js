let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('btnpapa');
let search = document.getElementById('search');
let search_title = document.getElementById('searchbytitle');
let searchcategory = document.getElementById('searchcategory');
let small = document.getElementById('small');
let mood = 'create';
let tempIndex;

function gettotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        small.innerHTML = result;
        small.style.backgroundColor = 'green';
    } else {
        small.style.backgroundColor = 'red';
        small.innerHTML = '';
    }
}

let ARRAY_MANEGER;
if (localStorage.getItem('BIGDATA') !== null) {
    ARRAY_MANEGER = JSON.parse(localStorage.getItem('BIGDATA'));
} else {
    ARRAY_MANEGER = [];
}

submit.onclick = function () {
    let OPJ = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        small: small.innerHTML,
        count: count.value,
        category: category.value,
    };

    if (mood === 'create') {
        if (OPJ.count > 1) {
            for (let i = 0; i < OPJ.count; i++) {
                ARRAY_MANEGER.push(OPJ);
            }
        } else {
            ARRAY_MANEGER.push(OPJ);
        }
    } else {
        ARRAY_MANEGER[tempIndex] = OPJ;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    PUSH_DATA_TO_LOCAL();
    SHOW_DATA_NEW();
    CLEARDATA();
};

function PUSH_DATA_TO_LOCAL() {
    window.localStorage.setItem('BIGDATA', JSON.stringify(ARRAY_MANEGER));
}

function SHOW_DATA_NEW() {
    let SHOW = '';
    for (let i = 0; i < ARRAY_MANEGER.length; i++) {
        SHOW += `
        <tr>
            <td data-label="Product id:">${i + 1}</td>
            <td data-label="Title">${ARRAY_MANEGER[i].title}</td>
            <td data-label="Price">${ARRAY_MANEGER[i].price}</td>
            <td data-label="Taxes">${ARRAY_MANEGER[i].taxes}</td>
            <td data-label="Ads">${ARRAY_MANEGER[i].ads}</td>
            <td data-label="Discount">${ARRAY_MANEGER[i].discount}</td>
            <td data-label="Total">${ARRAY_MANEGER[i].small}</td>
            <td data-label="Category">${ARRAY_MANEGER[i].category}</td>
            <td data-label="Update">
                <button onclick="EditDATA(${i})" class="btn btn-halopeno">UPDATE</button>
            </td>
            <td data-label="Delete">
                <button onclick="DEL(${i})" class="btn btn-halopeno">DELETE</button>
            </td>
        </tr>`;
    }

    let tbody = document.getElementById('tbody');
    if (tbody) {
        tbody.innerHTML = SHOW;
    } else {
        console.error("Element with ID 'tbody' not found.");
    }

    let container = document.querySelector('.NNNNN');
    let deleteAllButton = document.getElementById('deleteAll');

    if (ARRAY_MANEGER.length > 0) {
        if (!deleteAllButton) {
            let deleteAllBtnHTML = `
            <button id="deleteAll" onclick="DeleteAll()" class="btn botnN  m-auto btnpapa">
                Delete All (${ARRAY_MANEGER.length})
            </button>`;
            container.insertAdjacentHTML('beforeend', deleteAllBtnHTML);
        } else {
            deleteAllButton.innerHTML = `Delete All (${ARRAY_MANEGER.length})`;
        }
    } else {
        if (deleteAllButton) {
            deleteAllButton.remove();
        }
    }
}

function CLEARDATA() {
    title.value = '';
    taxes.value = '';
    price.value = '';
    ads.value = '';
    discount.value = '';
    small.innerHTML = '';
    category.value = '';
    count.value = '';
}

function DEL(index) {
    ARRAY_MANEGER.splice(index, 1);
    PUSH_DATA_TO_LOCAL();
    SHOW_DATA_NEW();
}

function DeleteAll() {
    ARRAY_MANEGER = [];
    PUSH_DATA_TO_LOCAL();
    SHOW_DATA_NEW();
}

SHOW_DATA_NEW();
window.onload = function () {
    SHOW_DATA_NEW();
};

function EditDATA(INDEX) {
    title.value = ARRAY_MANEGER[INDEX].title;
    taxes.value = ARRAY_MANEGER[INDEX].taxes;
    price.value = ARRAY_MANEGER[INDEX].price;
    ads.value = ARRAY_MANEGER[INDEX].ads;
    discount.value = ARRAY_MANEGER[INDEX].discount;
    category.value = ARRAY_MANEGER[INDEX].category;
    gettotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tempIndex = INDEX;
}

let searchMood = 'TITLE';
let SUBMITSEARCH = document.getElementById('search');

function HANDALA(IDE) {
    if (IDE === 'searchbytitle') {
        searchMood = 'TITLE';
        SUBMITSEARCH.placeholder = "Search By Title";
    } else {
        searchMood = 'Category';
        SUBMITSEARCH.placeholder = "Search By Category";
    }
    SUBMITSEARCH.focus();
}

function TAKETOTOOK(VALUEE) {
    let SHOW = '';
    if (searchMood === 'TITLE') {
        for (let i = 0; i < ARRAY_MANEGER.length; i++) {
            if (ARRAY_MANEGER[i].title.includes(VALUEE)) {
                SHOW += `
                 <tr>
            <td data-label="Product">${i + 1}</td>
            <td data-label="Title">${ARRAY_MANEGER[i].title}</td>
            <td data-label="Price">${ARRAY_MANEGER[i].price}</td>
            <td data-label="Taxes">${ARRAY_MANEGER[i].taxes}</td>
            <td data-label="Ads">${ARRAY_MANEGER[i].ads}</td>
            <td data-label="Discount">${ARRAY_MANEGER[i].discount}</td>
            <td data-label="Total">${ARRAY_MANEGER[i].small}</td>
            <td data-label="Category">${ARRAY_MANEGER[i].category}</td>
            <td data-label="Update">
                <button onclick="EditDATA(${i})" class="btn btn-halopeno">UPDATE</button>
            </td>
            <td data-label="Delete">
                <button onclick="DEL(${i})" class="btn btn-halopeno">DELETE</button>
            </td>
        </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML = SHOW;
    } else if (searchMood === 'Category') {
        for (let i = 0; i < ARRAY_MANEGER.length; i++) {
            if (ARRAY_MANEGER[i].category.includes(VALUEE)) {
                SHOW += `
                 <tr>
            <td data-label="Product">${i + 1}</td>
            <td data-label="Title">${ARRAY_MANEGER[i].title}</td>
            <td data-label="Price">${ARRAY_MANEGER[i].price}</td>
            <td data-label="Taxes">${ARRAY_MANEGER[i].taxes}</td>
            <td data-label="Ads">${ARRAY_MANEGER[i].ads}</td>
            <td data-label="Discount">${ARRAY_MANEGER[i].discount}</td>
            <td data-label="Total">${ARRAY_MANEGER[i].small}</td>
            <td data-label="Category">${ARRAY_MANEGER[i].category}</td>
            <td data-label="Update">
                <button onclick="EditDATA(${i})" class="btn btn-halopeno">UPDATE</button>
            </td>
            <td data-label="Delete">
                <button onclick="DEL(${i})" class="btn btn-halopeno">DELETE</button>
            </td>
        </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML = SHOW;
    }
}

let Moon_btn = document.getElementById('Moon');
if (Moon_btn) {
    Moon_btn.onclick = function () {
        document.body.classList.toggle('TOGGLE');
        TOGGLEICON();
    };
}

function TOGGLEICON() {
    let moon = document.getElementById('Moon');
    if (moon.classList.contains('fa-cloud-moon')) {
        moon.classList.remove('fa-cloud-moon');
        moon.classList.add('fa-cloud-sun');
    } else {
        moon.classList.remove('fa-cloud-sun');
        moon.classList.add('fa-cloud-moon');
    }
}
