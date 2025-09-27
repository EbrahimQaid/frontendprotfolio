document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if(!name || !email || !message) return showToast("⚠️ Please fill all fields!");
        if(!validateEmail(email)) return showToast("⚠️ Please enter a valid email!");

        showToast("✅ Your message has been sent successfully!");
        form.reset();
    });

    function showToast(msg){
        toast.innerText = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }

    function validateEmail(email){
        const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
