const logoutBtn = document.getElementById("logoutBtn");
const mainContent = document.getElementById("mainContent");
const asideLinks = document.querySelectorAll("aside a");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../index.html";
});

// البيانات في LocalStorage
if (!localStorage.getItem("products"))
  localStorage.setItem("products", JSON.stringify([]));

// تحميل الصفحة الافتراضية
loadPage("overview");

asideLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    loadPage(page);
  });
});

// تحميل كل صفحة
function loadPage(page) {
  if (page === "overview") {
    loadOverview();
  } else if (page === "add") {
    loadAddData();
  } else if (page === "settings") {
    loadSettings();
  }
}

// ===== Overview Page =====
function loadOverview() {
  const products = JSON.parse(localStorage.getItem("products"));
  let html = `<h1>Overview</h1>
                <table border="1" style="width:100%; border-collapse: collapse;">
                <tr><th>URL</th><th>Name</th><th>Description</th><th>Actions</th></tr>`;

  products.forEach((item, index) => {
    html += `<tr>
                    <td>${item.img}</td>
                    <td>${item.name}</td>
                    <td>${item.desc}</td>
                    <td>
                        <button onclick="editItem(${index})">Edit</button>
                        <button onclick="deleteItem(${index})">Delete</button>
                    </td>
                 </tr>`;
  });
  html += "</table>";
  mainContent.innerHTML = html;
}

window.editItem = function (index) {
  const products = JSON.parse(localStorage.getItem("products"));
  const item = products[index];
  const img = prompt("Edit Url:", item.img);
  if (img === null) return;
  const name = prompt("Edit Name:", item.name);
  if (name === null) return;
  const desc = prompt("Edit Desc:", item.desc);
  if (desc === null) return;

  products[index] = { img, name, desc };
  localStorage.setItem("products", JSON.stringify(products));
  loadOverview();
};

window.deleteItem = function (index) {
  if (confirm("Are you sure you want to delete this item?")) {
    const products = JSON.parse(localStorage.getItem("products"));
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadOverview();
  }
};

// ===== Add Data Page =====
function loadAddData() {
  mainContent.innerHTML = `
        <h1>Add Data</h1>
        <form id="addForm">
            <input type="text" id="img" placeholder="URL Image" required><br><br>
            <input type="text" id="name" placeholder="Name" required><br><br>
            <input type="text" id="desc" placeholder="Description" required><br><br>
            <button type="submit">Add</button>
        </form>
        <p id="addMsg" style="color:green;"></p>
    `;

  document.getElementById("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const img = document.getElementById("img");
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;

    const cards = JSON.parse(localStorage.getItem("products")) || [];
    cards.push({img:img.value, name, desc});
    localStorage.setItem("products", JSON.stringify(cards));

    document.getElementById("addMsg").textContent =
      "✅ Data added successfully!";
    e.target.reset();
  });
}

// ===== Settings Page =====
function loadSettings() {
  let currentTheme = localStorage.getItem("theme") || "light";
  let currentColor = localStorage.getItem("primaryColor") || "#af0e0e";

  mainContent.innerHTML = `
        <h1>Settings</h1>
        <label>Theme: 
            <select id="themeSelect">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label><br><br>
        <label>Primary Color: 
            <input type="color" id="colorPicker" value="${currentColor}">
        </label>
    `;

  document.getElementById("themeSelect").value = currentTheme;

  document.getElementById("themeSelect").addEventListener("change", (e) => {
    localStorage.setItem("theme", e.target.value);
    applySettings();
  });

  document.getElementById("colorPicker").addEventListener("input", (e) => {
    localStorage.setItem("primaryColor", e.target.value);
    applySettings();
  });

  applySettings();
}

function applySettings() {
  const theme = localStorage.getItem("theme") || "light";
  const color = localStorage.getItem("primaryColor") || "#af0e0e";

  document.body.style.backgroundColor =
    theme === "dark" ? "#2c2c2c" : "#f4f9f6";
  document
    .querySelectorAll(".Sing_button, .sec_title, .logo_text")
    .forEach((el) => {
      el.style.color = color;
    });
}
