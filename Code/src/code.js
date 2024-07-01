document.addEventListener("DOMContentLoaded", function () {
  // Función para abrir un modal por su ID
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`No se encontró el modal con ID ${modalId}.`);
      return;
    }
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Función para cerrar un modal por su ID
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`No se encontró el modal con ID ${modalId}.`);
      return;
    }
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";

    if (modalId === "defaultModal") {
      var createProductForm = document.getElementById("createProductForm");
      if (createProductForm) {
        createProductForm.reset();
      }
    }
  }

  // Event listeners para abrir los modales
  var defaultModalButton = document.getElementById("defaultModalButton");
  var categoryModalButton = document.getElementById("categoryModalButton");

  if (defaultModalButton) {
    defaultModalButton.addEventListener("click", function () {
      openModal("defaultModal");
    });
  }

  if (categoryModalButton) {
    categoryModalButton.addEventListener("click", function () {
      openModal("categoryModal");
    });
  }

  // Cerrar modal haciendo clic fuera de él
  window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.classList.remove("show");
      event.target.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "auto"; // Permitir desplazamiento del fondo
    }
  };

  // Cargar opciones de categorías al cargar la página
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

      loadProducts(); // Llamar a loadProducts después de cargar las categorías
    })
    .catch((error) => console.error("Error fetching categories:", error));

  // Event listener para enviar el formulario de crear producto
  const createProductForm = document.getElementById("createProductForm");
  if (createProductForm) {
    createProductForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const fileInput = document.getElementById("file_input");

      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Debe seleccionar un archivo de imagen.");
        return;
      }

      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Image = event.target.result;

        const data = {
          name: formData.get("name"),
          price: parseFloat(formData.get("price")),
          categoryId: parseInt(formData.get("category")),
          image: base64Image,
        };

        fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer <tu-token-de-autorizacion>",
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
            loadProducts(); // Recargar la tabla después de crear el producto
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error al conectar con la API: " + error.message);
          });
      };

      reader.readAsDataURL(file);
    });
  }

  // Event listener para crear una nueva categoría
  const createCategoryForm = document.getElementById("createCategoryForm");
  if (createCategoryForm) {
    createCategoryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = {
        name: formData.get("categoryName"),
      };

      fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //  Authorization:
          //    "Bearer $2b$10$YewZWVue7GqmMgwxIy7GRuMbZvR18XhOVuJRuGCsC1BAe3fCJT6Pu", // Reemplaza con tu token de autorización real
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
  }

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

  // Función para eliminar un producto por su ID
  window.deleteProduct = function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:3000/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //  Authorization:
          //    "Bearer $2b$10$YewZWVue7GqmMgwxIy7GRuMbZvR18XhOVuJRuGCsC1BAe3fCJT6Pu", // Reemplaza con tu token de autorización real
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
  };
});
