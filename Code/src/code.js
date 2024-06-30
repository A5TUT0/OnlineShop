// Función para abrir un modal por su ID
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Evita el desplazamiento del fondo
}

// Función para cerrar un modal por su ID y limpiar el formulario correspondiente
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto"; // Permite el desplazamiento del fondo

  // Limpiar el formulario de productos si se cierra el modal de productos
  if (modalId === "defaultModal") {
    document.getElementById("createProductForm").reset();
  }

  // Limpiar el formulario de categorías si se cierra el modal de categorías
  if (modalId === "categoryModal") {
    document.getElementById("createCategoryForm").reset();
  }
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
      categoryId: parseInt(formData.get("category")), // Convertimos el ID de la categoría a número entero
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NjkxMzU5fQ.6GKGMSpcI-q2XVvFA-lAnry0XsAzija7TScblDDw4Ss", // Reemplaza con tu token de autorización real
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
        loadProducts(); // Cargar productos nuevamente para reflejar el nuevo producto
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
        option.value = category.id; // Asegúrate de que el valor sea el ID de la categoría
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  loadProducts(); // Cargar productos al cargar la página
});

// Función para cargar productos y agregarlos a la tabla
function loadProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      const productTableBody = document.getElementById("productTableBody");
      productTableBody.innerHTML = ""; // Limpiar el contenido actual de la tabla

      data.forEach((product) => {
        const row = document.createElement("tr");

        // Obtener el nombre de la categoría para el producto actual
        fetch(`http://localhost:3000/categories/${product.categoryId}`)
          .then((response) => response.json())
          .then((category) => {
            row.innerHTML = `
              <td class="px-6 py-4">${product.name}</td>
              <td class="px-6 py-4">${category.name}</td>
              <td class="px-6 py-4">$${product.price.toFixed(2)}</td>
              <td class="px-6 py-4">
                <button class="text-blue-600 hover:text-blue-900">Edit</button>
              </td>
              <td class="px-6 py-4">
                <button class="text-red-600 hover:text-red-900" onclick="deleteProduct(${
                  product.id
                })">Delete</button>
              </td>
            `;
            productTableBody.appendChild(row);
          })
          .catch((error) => console.error("Error fetching category:", error));
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NjkxMzU5fQ.6GKGMSpcI-q2XVvFA-lAnry0XsAzija7TScblDDw4Ss", // Reemplaza con tu token de autorización real
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
        // Añadir nueva categoría al elemento select
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

document.addEventListener("DOMContentLoaded", function () {
  const deleteButton = document.getElementById("confirmDelete");
  const deleteModal = document.getElementById("deleteModal");
  const successModal = document.getElementById("successModal");
});
// Función para eliminar un producto por su ID
function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NjkxMzU5fQ.6GKGMSpcI-q2XVvFA-lAnry0XsAzija7TScblDDw4Ss", // Reemplaza con tu token de autorización real        , // Reemplaza con tu token de autorización real
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting product");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Product deleted:", result);
        alert("Product deleted successfully");
        loadProducts(); // Recargar la tabla después de eliminar el producto
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error deleting product: " + error.message);
      });
  }
}
