// ====== Dark Mode Toggle ======
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ====== Sample Data in LocalStorage ======
// تأكد أنك تضيف بياناتك قبل تشغيل الصفحة
if (!localStorage.getItem("products")) {
  const products = [
    { name: "hoasm", desc: "Engineer", img: "../image/avatar-2.jpg" },
    {
      name: "Product 2",
      desc: "Software Engineer",
      img: "../image/avatar-3.jpg",
    },
    {
      name: "Product 3",
      desc: "Frontend Developer",
      img: "../image/avatar-4.jpg",
    },
    {
      name: "Product 4",
      desc: "Frontend Developer",
      img: "../image/avatar-2.jpg",
    },
    {
      name: "Product 5",
      desc: "Software Engineer",
      img: "../image/avatar-3.jpg",
    },
    {
      name: "Product 6",
      desc: "Architect Engineer",
      img: "../image/avatar-4.jpg",
    },
  ];
  localStorage.setItem("products", JSON.stringify(products));
}

// ====== Render Cards ======
const gallery = document.getElementById("gallery");
const products = JSON.parse(localStorage.getItem("products"));

products.forEach((product, index) => {
  const card = document.createElement("section");
  card.classList.add("gallery-card");

  card.innerHTML = `
        <img class="p-image" src="${product.img}" alt="${product.name}">
        <div class="card-info">
            <h2 class="p-name">${product.name}</h2>
            <h4 class="p-sc">Click to see details</h4>
            <div class="card-icon">
                <button class="viewBtn"><i class="fas fa-eye"></i></button>
            </div>
        </div>
    `;

  gallery.appendChild(card);

  // Show Modal
  card.querySelector(".viewBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modalImg").src = product.img;
    document.getElementById("modalName").innerText = product.name;
    document.getElementById("modalDesc").innerText = product.desc;
  });
});

// Close Modal
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// Close Modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('click',()=>{ 
      navLinks.classList.remove('active'); 
      menuToggle.classList.remove('active'); 
    });
  });

  document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav-container');
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
