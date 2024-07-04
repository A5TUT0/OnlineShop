document.addEventListener("DOMContentLoaded", function () {
  // Función para manejar el registro
  function handleRegister() {
    const registerForm = document.getElementById("registerForm");
    if (!registerForm) return;

    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwörter stimmen nicht überein");
        return;
      }

      const data = { username, password, role: "user" };

      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error beim Registrieren");
          }
          return response.json();
        })
        .then((result) => {
          if (result.role === "admin") {
            const token = jwt.sign(
              { username: result.username, role: result.role },
              "your_secret_key"
            );
            localStorage.setItem("token", token);
            window.location.href = "./ProductsCRUD.html";
          } else {
            window.location.href = "./indexUSER.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Fehler beim Registrieren: " + error.message);
        });
    });
  }

  // Función para manejar el inicio de sesión
  function handleLogin() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const data = { username, password };

      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.error || "Invalid credentials");
            });
          }
          return response.json();
        })
        .then((result) => {
          const token = result.token;
          const payload = JSON.parse(atob(token.split(".")[1]));

          localStorage.setItem("token", token);

          if (payload.role === "admin") {
            window.location.href = "./ProductsCRUD.html";
          } else {
            window.location.href = "./indexUSER.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Fehler beim Einloggen: " + error.message);
        });
    });
  }

  // Función para manejar el restablecimiento de contraseña
  function handleResetPassword() {
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    if (!resetPasswordForm) return;

    resetPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwörter stimmen nicht überein");
        return;
      }

      const data = { username, newPassword: password };

      fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Fehler beim Zurücksetzen des Passworts");
          }
          return response.json();
        })
        .then((result) => {
          alert("Passwort erfolgreich zurückgesetzt");
          window.location.href = "./LogIn.html";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Fehler beim Zurücksetzen des Passworts: " + error.message);
        });
    });
  }

  // Función para cargar productos
  function loadProducts() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((products) => {
        const productTableBody = document.getElementById("productTableBody");
        if (!productTableBody) return;
        productTableBody.innerHTML = "";

        products.forEach((product) => {
          fetch(`http://localhost:3000/categories/${product.categoryId}`)
            .then((response) => response.json())
            .then((category) => {
              const card = document.createElement("div");
              card.className =
                "rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800";

              card.innerHTML = `
                <div class="h-56 w-full">
                  <a href="#">
                    <img class="mx-auto h-full dark:hidden" src="${
                      product.image
                    }" alt="${product.name}" />
                    <img class="mx-auto hidden h-full dark:block" src="${
                      product.image
                    }" alt="${product.name}" />
                  </a>
                </div>
                <div class="pt-6">
                  <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                    ${product.name}
                  </a>
                  <div class="mt-4 flex items-center justify-between gap-4">
                    <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                      $${product.price.toFixed(2)}
                    </p>
                    <button type="button" class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
                      </svg>
                      Warenkorb
                    </button>
                  </div>
                </div>
              `;
              productTableBody.appendChild(card);
            })
            .catch((error) => console.error("Error fetching category:", error));
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Función para cargar categorías
  function loadCategories() {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((categories) => {
        const categoryContainer = document.getElementById("categoryContainer");
        if (!categoryContainer) return;
        categoryContainer.innerHTML = "";

        categories.forEach((category) => {
          const categoryCard = document.createElement("div");
          categoryCard.className =
            "flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";
          categoryCard.innerHTML = `
            <svg class="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"/>
            </svg>
            <span class="text-sm font-medium text-gray-900 dark:text-white">${category.name}</span>
          `;
          categoryContainer.appendChild(categoryCard);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }

  handleRegister();
  handleLogin();
  handleResetPassword();
  loadProducts();
  loadCategories();
});
