// ================= CAR DATA =================

const cars = [
    {
        id: 1,
        name: "BMW 3 Series",
        brand: "BMW",
        category: "Sedan",
        price: 4800000,
        year: 2026,
        img: "car1.jpg"
    },
    {
        id: 2,
        name: "Mercedes C-Class",
        brand: "Mercedes",
        category: "Sedan",
        price: 5600000,
        year: 2026,
        img: "car2.jpg"
    },
    {
        id: 3,
        name: "Audi Q5",
        brand: "Audi",
        category: "SUV",
        price: 6200000,
        year: 2025,
        img: "car3.jpg"
    },
    {
        id: 4,
        name: "Toyota Fortuner",
        brand: "Toyota",
        category: "SUV",
        price: 4200000,
        year: 2026,
        img: "car4.jpg"
    },
    {
        id: 5,
        name: "Hyundai Creta",
        brand: "Hyundai",
        category: "SUV",
        price: 1850000,
        year: 2026,
        img: "car5.jpg"
    },
    {
        id: 6,
        name: "Honda City",
        brand: "Honda",
        category: "Sedan",
        price: 1650000,
        year: 2025,
        img: "car6.jpg"
    },
    {
        id: 7,
        name: "Mahindra Thar",
        brand: "Mahindra",
        category: "Off-Road",
        price: 1900000,
        year: 2026,
        img: "car7.jpg"
    },
    {
        id: 8,
        name: "Tata Nexon EV",
        brand: "Tata",
        category: "Electric",
        price: 1750000,
        year: 2026,
        img: "car3.jpg"
    }
];


// ================= PRICE =================

function money(price) {
    return "₹" + price.toLocaleString("en-IN");
}


// ================= CAR CARD =================

function createCarCard(car) {

    return `
        <div class="col-md-6 col-lg-4 mb-4">

            <div class="card car-card h-100">

                <img src="${car.img}"
                     class="card-img-top"
                     alt="${car.name}">

                <div class="card-body p-4">

                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge bg-danger">
                            ${car.category}
                        </span>

                        <small>${car.year}</small>
                    </div>

                    <h5 class="fw-bold">
                        ${car.name}
                    </h5>

                    <p class="text-muted">
                        ${car.brand} • Premium Vehicle
                    </p>

                    <h5 class="text-danger fw-bold mb-3">
                        ${money(car.price)}
                    </h5>

                    <div class="d-flex gap-2">

                        <a href="car-details.html?id=${car.id}"
                           class="btn btn-dark flex-fill">
                            Details
                        </a>

                        <button class="btn btn-danger"
                                onclick="openDrive(${car.id})">
                            Test Drive
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;
}


// ================= SHOW CARS =================

function showCars(carArray) {

    const carList = document.getElementById("carList");

    if (!carList) {
        return;
    }

    if (carArray.length === 0) {

        carList.innerHTML = `
            <div class="col-12 text-center py-5">

                <h4>No cars found</h4>

                <p class="text-muted">
                    Try another car name or brand.
                </p>

            </div>
        `;

    } else {

        carList.innerHTML =
            carArray.map(createCarCard).join("");

    }

    const count = document.getElementById("count");

    if (count) {
        count.innerText =
            carArray.length + " vehicles found";
    }
}


// ================= CARS PAGE =================

function carsPage() {

    const search = document.getElementById("search");
    const brand = document.getElementById("brand");
    const category = document.getElementById("cat");

    if (!search || !brand || !category) {
        return;
    }


    // Brand options

    const brands = [...new Set(
        cars.map(car => car.brand)
    )];

    brands.sort();

    brands.forEach(item => {

        brand.innerHTML += `
            <option value="${item}">
                ${item}
            </option>
        `;

    });


    // Category options

    const categories = [...new Set(
        cars.map(car => car.category)
    )];

    categories.sort();

    categories.forEach(item => {

        category.innerHTML += `
            <option value="${item}">
                ${item}
            </option>
        `;

    });


    // Search + Filter

    function filterCars() {

        const searchText =
            search.value.toLowerCase().trim();

        const selectedBrand =
            brand.value;

        const selectedCategory =
            category.value;


        const filteredCars = cars.filter(car => {

            const matchesSearch =
                car.name.toLowerCase().includes(searchText) ||
                car.brand.toLowerCase().includes(searchText);

            const matchesBrand =
                selectedBrand === "" ||
                car.brand === selectedBrand;

            const matchesCategory =
                selectedCategory === "" ||
                car.category === selectedCategory;

            return (
                matchesSearch &&
                matchesBrand &&
                matchesCategory
            );

        });


        showCars(filteredCars);
    }


    search.addEventListener(
        "input",
        filterCars
    );

    brand.addEventListener(
        "change",
        filterCars
    );

    category.addEventListener(
        "change",
        filterCars
    );


    // Show all cars initially

    showCars(cars);
}


// ================= LOGIN =================

function login(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();


    if (
        username === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem("admin", "1");

        alert("Login successful!");

        window.location.href =
            "admin.html";

    }

    else if (
        username === "user" &&
        password === "user123"
    ) {

        localStorage.setItem("user", "1");

        alert("Login successful!");

        window.location.href =
            "index.html";

    }

    else {

        alert(
            "Invalid username or password"
        );

    }

}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("admin");
    localStorage.removeItem("user");

    window.location.href =
        "login.html";
}


// ================= TEST DRIVE =================

function openDrive(id) {

    const car =
        cars.find(item => item.id === id);

    if (!car) {
        return;
    }

    const driveCar =
        document.getElementById("driveCar");

    if (driveCar) {
        driveCar.value = car.name;
    }

    const modal =
        new bootstrap.Modal(
            document.getElementById("driveModal")
        );

    modal.show();
}


// ================= PAGE LOAD =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (document.getElementById("carList")) {
            carsPage();
        }

    }
);