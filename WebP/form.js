// ====== FORM VALIDATION ======
const form = document.getElementById("quickForm");
form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.classList.add("shake");
            setTimeout(() => input.classList.remove("shake"), 500);
        }
    });
    if (!valid) e.preventDefault();
});
    const popupForm = document.getElementById("popupForm");
popupForm.addEventListener("submit", function(e) {
    let valid = true;

    document.querySelectorAll("#popupForm .form-group").forEach(group => {
        const input = group.querySelector("input, select, textarea");
        const errorText = group.querySelector(".error-text");

        if (!input.checkValidity()) {
            valid = false;
            errorText.textContent = "This field is required";
            group.classList.add("error-shake");

            setTimeout(() => {
                group.classList.remove("error-shake");
            }, 300);
        } else {
            errorText.textContent = "";
        }
    });

    if (!valid) e.preventDefault();
});
function submitToAPI(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    fetch("https://itzadarsh.co.in/api/v1/post", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(err => {
        alert("Network error — please try again.");
        console.error(err);
    });
}

// ===== POPUP FORM =====
document.getElementById("popupForm").addEventListener("submit", function(e) {
    e.preventDefault();
    submitToAPI("popupForm");
});
// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    submitToAPI("contactForm");
});
// ===== QUICK FORM (cities section) =====
document.getElementById("quickForm").addEventListener("submit", function(e) {
    e.preventDefault();
    submitToAPI("quickForm");
});