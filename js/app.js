var modal = document.getElementById('add-product-modal');
var closeBtn = document.getElementsByClassName('close')[0];
var addProductBtn = document.getElementById('add-product-btn');
var selectImageBtn = document.getElementById('select-image-btn');

addProductBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

var addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var imageUrl = document.getElementById('image-url').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var frame = document.getElementById('frame').value;
    var size = document.getElementById('size').value;
    var depth = document.getElementById('depth').value;
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><img src="${imageUrl}" alt="Product Image"></td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>${frame}</td>
        <td>${size}</td>
        <td>${depth}</td>
        <td><button>Delete</button></td>
    `;
    document.getElementById('product-list').appendChild(newRow);
    addProductForm.reset();
    modal.style.display = 'none';
});

selectImageBtn.addEventListener('click', function() {
    document.getElementById('image-upload').click();
});

document.getElementById('image-upload').addEventListener('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('image-url').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


var addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var fileInput = document.getElementById('image-file');
    var file = fileInput.files[0]; // Get the first selected file
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var frame = document.getElementById('frame').value;
    var size = document.getElementById('size').value;
    var depth = document.getElementById('depth').value;
    
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><img src="${reader.result}" alt="Product Image" style="width: 110px; height: 40px;"></td>
                <td>${price}</td>
                <td>${quantity}</td>
                <td>${frame}</td>
                <td>${size}</td>
                <td>${depth}</td>
                <td><button>Delete</button></td>
            `;
            document.getElementById('product-list').appendChild(newRow);
            addProductForm.reset();
            modal.style.display = 'none';
        };
    } else {
        alert('Please select an image file.');
    }
});



let searchBtn = document.getElementById('search-btn');
let searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', function() {
    let query = searchInput.value.toLowerCase();

    let rows = document.querySelectorAll('#product-list tr');

    rows.forEach(function(row) {
        var textContent = row.textContent.toLowerCase();

        if (textContent.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
