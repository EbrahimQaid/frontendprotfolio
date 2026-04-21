// ====== Sample Data in LocalStorage ======
if (!localStorage.getItem("products")) {
  const products = [
    { name: "Sarah Jenkins", desc: "Senior UI/UX Designer specialized in creating interactive, user-centric interfaces.", img: "../image/avatar-2.jpg", instagram: "#", linkedin: "#", github: "#" },
    {
      name: "Michael Chen",
      desc: "Full-Stack Engineer building scalable web applications with Node and React.",
      img: "../image/avatar-3.jpg", instagram: "#", linkedin: "#", github: "#"
    },
    {
      name: "Ahmed Hassan",
      desc: "Frontend Developer focusing on performant UI design and modern JS frameworks.",
      img: "../image/avatar-4.jpg", instagram: "#", linkedin: "#", github: "#"
    },
    {
      name: "Emma Watson",
      desc: "Mobile App Developer passionate about cross-platform solutions.",
      img: "../image/avatar-5.jpg", instagram: "#", linkedin: "#", github: "#"
    },
    {
      name: "James Doe",
      desc: "Cloud Architect designing secure and robust backend systems and AWS platforms.",
      img: "../image/avatar.jpg", instagram: "#", linkedin: "#", github: "#"
    },
    {
      name: "Laila Othman",
      desc: "Product Manager translating business needs into high-quality digital products.",
      img: "../image/avatar-2.jpg", instagram: "#", linkedin: "#", github: "#"
    },
  ];
  localStorage.setItem("products", JSON.stringify(products));
}

// ====== Render Gallery Cards ======
const gallery = document.getElementById("gallery");
const products = JSON.parse(localStorage.getItem("products")) || [];

if (gallery) {
    products.forEach((product, index) => {
      const card = document.createElement("article");
      card.className = "profile-card";

      card.innerHTML = `
          <div class="profile-img-container">
            <img class="profile-img" src="${product.img}" alt="${product.name}" loading="lazy" style="height:100%; width:100%; object-fit:cover;">
          </div>
          <div class="profile-info">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
          </div>
          <div class="social-links">
            ${product.instagram ? `<a href="${product.instagram}" target="_blank" class="social-btn" title="Instagram"><i class="fab fa-instagram"></i></a>` : ''}
            ${product.linkedin ? `<a href="${product.linkedin}" target="_blank" class="social-btn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
            ${product.github ? `<a href="${product.github}" target="_blank" class="social-btn" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
            <button class="social-btn viewBtn" title="View Profile" aria-label="View Profile" style="cursor:pointer;"><i class="fas fa-eye"></i></button>
          </div>
        `;

      gallery.appendChild(card);

      // Show Modal on view button click
      card.querySelector(".viewBtn").addEventListener("click", () => {
        document.getElementById("modal").style.display = "block";
        document.getElementById("modalImg").src = product.img;
        document.getElementById("modalName").innerText = product.name;
        document.getElementById("modalDesc").innerText = product.desc;
      });
    });
}

// Close Modal
const closeModal = document.getElementById("closeModal");
if (closeModal) {
    closeModal.addEventListener("click", () => {
      document.getElementById("modal").style.display = "none";
    });
}

// Close Modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
