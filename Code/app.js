// Función para abrir un modal por su ID
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Evita el desplazamiento del fondo
}

// Función para cerrar un modal por su ID
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto"; // Permite el desplazamiento del fondo
}

// Event listeners para abrir los modales
document
  .getElementById("defaultModalButton")
  .addEventListener("click", function () {
    openModal("defaultModal");
  });

document
  .getElementById("categoryModalButton")
  .addEventListener("click", function () {
    openModal("categoryModal");
  });

// Cerrar modal haciendo clic fuera de él
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("show");
    event.target.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto"; // Permitir desplazamiento del fondo
  }
};

// Enviar datos del formulario de productos
document
  .getElementById("createProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      categoryId: parseInt(formData.get("category")),
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NjkxMzU5fQ.6GKGMSpcI-q2XVvFA-lAnry0XsAzija7TScblDDw4Ss", // Replace with your actual authorization token
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el producto");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Producto creado:", result);
        alert("Producto creado exitosamente");
        closeModal("defaultModal");
        // Optionally update the product table here
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al conectar con la API: " + error.message);
      });
  });

// Cargar opciones de categorías al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/categories")
    .then((response) => response.json())
    .then((data) => {
      const categorySelect = document.getElementById("category");

      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
});

// Event listener para crear una nueva categoría
document
  .getElementById("createCategoryForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("categoryName"),
    };

    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NjkxMzU5fQ.6GKGMSpcI-q2XVvFA-lAnry0XsAzija7TScblDDw4Ss", // Replace with your actual authorization token
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear la categoría");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Categoría creada:", result);
        alert("Categoría creada exitosamente");
        closeModal("categoryModal");
        // Add new category to the select element
        const categorySelect = document.getElementById("category");
        const option = document.createElement("option");
        option.value = result.id;
        option.textContent = result.name;
        categorySelect.appendChild(option);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al conectar con la API: " + error.message);
      });
  });
