const logoutBtn = document.getElementById("sidebarLogout");
const mainContent = document.getElementById("mainContent");
const asideLinks = document.querySelectorAll("aside a[data-page]");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userLoggedIn");
    window.location.href = "../index.html";
  });
}

// Initialize products in LocalStorage if empty
if (!localStorage.getItem("products"))
  localStorage.setItem("products", JSON.stringify([]));

// Load default page
loadPage("overview");

asideLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    loadPage(page);
  });
});

// Page Router
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
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let html = `<h1>Overview</h1>
                <table>
                <tr><th>Image</th><th>Name</th><th>Description</th><th>Actions</th></tr>`;

  products.forEach((item, index) => {
    html += `<tr id="row-${index}">
                    <td><img src="${item.img}" alt="Profile Image" style="width:80px; height:80px; object-fit:cover; border-radius:8px;"></td>
                    <td>${item.name}</td>
                    <td>${item.desc}</td>
                    <td>
                        <button class="action-btn" onclick="editItem(${index})" style="margin-right:5px; font-size:0.85rem;"><i class="fas fa-edit"></i> Edit</button>
                        <button class="action-btn" onclick="deleteItem(${index})" style="font-size:0.85rem;"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                 </tr>`;
  });
  html += "</table>";
  mainContent.innerHTML = html;
}

window.editItem = function (index) {
  const products = JSON.parse(localStorage.getItem("products"));
  const item = products[index];
  
  const tr = document.getElementById(`row-${index}`);
  tr.innerHTML = `
    <td>
      <input type="file" id="editFile-${index}" accept="image/*">
      <br><small>Leave empty to keep image</small>
    </td>
    <td><input type="text" id="editName-${index}" value="${item.name}"></td>
    <td>
      <input type="text" id="editDesc-${index}" value="${item.desc}" style="width:100%; margin-bottom:8px;">
      <input type="text" id="editIg-${index}" value="${item.instagram || ''}" placeholder="Instagram URL" style="width:100%; margin-bottom:4px; font-size:0.8rem; padding:6px;">
      <input type="text" id="editLi-${index}" value="${item.linkedin || ''}" placeholder="LinkedIn URL" style="width:100%; margin-bottom:4px; font-size:0.8rem; padding:6px;">
      <input type="text" id="editGh-${index}" value="${item.github || ''}" placeholder="GitHub URL" style="width:100%; font-size:0.8rem; padding:6px;">
    </td>
    <td>
      <button class="action-btn" onclick="saveEdit(${index})" style="margin-right:5px; margin-bottom:5px; font-size:0.85rem;">Save</button>
      <button class="action-btn action-btn-secondary" onclick="loadOverview()" style="font-size:0.85rem;">Cancel</button>
    </td>
  `;
};

window.saveEdit = function (index) {
  const products = JSON.parse(localStorage.getItem("products"));
  const name = document.getElementById(`editName-${index}`).value;
  const desc = document.getElementById(`editDesc-${index}`).value;
  const instagram = document.getElementById(`editIg-${index}`).value;
  const linkedin = document.getElementById(`editLi-${index}`).value;
  const github = document.getElementById(`editGh-${index}`).value;
  const fileInput = document.getElementById(`editFile-${index}`);
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          products[index] = { img: reader.result, name, desc, instagram, linkedin, github };
          localStorage.setItem("products", JSON.stringify(products));
          loadOverview();
      };
      reader.readAsDataURL(file);
  } else {
      products[index] = { img: products[index].img, name, desc, instagram, linkedin, github };
      localStorage.setItem("products", JSON.stringify(products));
      loadOverview();
  }
};

window.deleteItem = function (index) {
  let modal = document.getElementById('deleteModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'deleteModal';
    modal.className = 'dashboard-modal';
    modal.innerHTML = `
      <div class="dashboard-modal-content">
        <i class="fa-solid fa-trash-can" style="font-size: 3.5rem; color: #ef4444; margin-bottom: 20px;"></i>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this profile?</p>
        <div class="modal-actions">
          <button id="confirmDeleteBtn" class="action-btn action-btn-danger">Delete</button>
          <button id="cancelDeleteBtn" class="action-btn action-btn-secondary">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  modal.style.display = 'flex';
  
  document.getElementById('confirmDeleteBtn').onclick = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    modal.style.display = 'none';
    loadOverview();
  };
  
  document.getElementById('cancelDeleteBtn').onclick = () => {
    modal.style.display = 'none';
  };
};

// ===== Add Data Page =====
function loadAddData() {
  mainContent.innerHTML = `
        <h1>Add New Profile</h1>
        <form id="addForm" class="dashboard-form" style="max-width:400px; margin-top:20px;">
            <label style="display:block; margin-bottom:8px; font-weight:bold;">Profile Image</label>
            <input type="file" id="imgFile" accept="image/*" required style="margin-bottom:15px;">
            
            <label style="display:block; margin-bottom:8px; font-weight:bold;">Name</label>
            <input type="text" id="name" placeholder="Enter Full Name" required>
            
            <label style="display:block; margin-bottom:8px; font-weight:bold;">Description</label>
            <input type="text" id="desc" placeholder="Enter Job Title/Description" required>
            
            <label style="display:block; margin-bottom:8px; font-weight:bold;">Social Links (Optional)</label>
            <input type="text" id="igLink" placeholder="Instagram URL">
            <input type="text" id="liLink" placeholder="LinkedIn URL">
            <input type="text" id="ghLink" placeholder="GitHub URL">
            
            <button type="submit" class="action-btn" style="width:100%; padding:12px; font-size:1.1rem;"><i class="fa-solid fa-plus"></i> Add Profile</button>
        </form>
        <p id="addMsg" style="color:var(--primary); margin-top:15px; font-weight:bold;"></p>
    `;

  document.getElementById("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("imgFile");
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const instagram = document.getElementById("igLink").value;
    const linkedin = document.getElementById("liLink").value;
    const github = document.getElementById("ghLink").value;

    const file = fileInput.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
          alert("Image is too large! Please upload an image smaller than 2MB.");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
          const cards = JSON.parse(localStorage.getItem("products")) || [];
          cards.push({img: reader.result, name, desc, instagram, linkedin, github});
          localStorage.setItem("products", JSON.stringify(cards));

          document.getElementById("addMsg").innerHTML = '<i class="fa-solid fa-check-circle"></i> Profile added successfully!';
          e.target.reset();
          setTimeout(() => { document.getElementById("addMsg").innerHTML = ''; }, 3000);
      };
      reader.readAsDataURL(file);
    }
  });
}

// ===== Settings Page =====
function loadSettings() {
  let currentTheme = localStorage.getItem("theme") || "light";
  let currentColor = localStorage.getItem("primaryColor") || "#af0e0e";

  mainContent.innerHTML = `
        <h1>Settings</h1>
        <div class="dashboard-form" style="max-width: 400px; margin-top:20px; background:var(--surface-color); padding:30px; border-radius:12px; border:1px solid var(--border-color);">
            <label style="display:block; margin-bottom:8px; font-weight:bold;">Theme:</label>
            <select id="themeSelect">
                <option value="light">☀️ Light Mode</option>
                <option value="dark">🌙 Dark Mode</option>
            </select>
            
            <label style="display:block; margin-bottom:8px; font-weight:bold;">Primary Brand Color:</label>
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px; padding:10px; background:var(--bg-color); border:1px solid var(--border-color); border-radius:8px;">
                <input type="color" id="colorPicker" value="${currentColor}" style="width:40px; height:40px; border:none; cursor:pointer; background:transparent;">
                <span class="color-text" style="font-weight:600; font-family:monospace;">${currentColor}</span>
            </div>
            
            <button id="saveSettingsBtn" class="action-btn" style="width:100%; padding:14px; font-size:1.1rem;"><i class="fa-solid fa-floppy-disk"></i> Save Configuration</button>
            <p id="settingsMsg" style="color:var(--primary); margin-top:15px; font-weight:bold; text-align:center;"></p>
        </div>
    `;

  document.getElementById("themeSelect").value = currentTheme;

  const colorInput = document.getElementById("colorPicker");
  colorInput.addEventListener("input", (e) => {
    document.querySelector(".color-text").innerText = e.target.value.toUpperCase();
  });

  document.getElementById("saveSettingsBtn").addEventListener("click", () => {
    const themeVal = document.getElementById("themeSelect").value;
    const colorVal = document.getElementById("colorPicker").value;
    
    localStorage.setItem("theme", themeVal);
    localStorage.setItem("primaryColor", colorVal);
    applySettings();
    const msg = document.getElementById("settingsMsg");
    msg.innerHTML = '<i class="fa-solid fa-check-circle"></i> Settings Saved Successfully!';
    setTimeout(() => { msg.innerHTML = ''; }, 3000);
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
