import { API_URL } from '../../../constants';
import { navigateTo } from '../../../Router';

export function EditProductPageComponent(searchParams) {
  const productId = searchParams.get('id');
  const html = /* html */ `
    <h3>Editando producto</h3>
    <div id="product"></div>
  `;
  const logic = async () => {
    // 1. Cargar los datos del producto en un formulario
    const $product = document.getElementById('product');
    const response = await fetch(`http://localhost:4000/products/${productId}`);
    const product = await response.json();
    $product.innerHTML = /*html*/ `
      <form id="form-edit-product">
        <div>
          <label>Nombre</label>
          <input value="${product.name}" name="name" id="name" disabled>
        </div>
        <div>
          <label>Descripción: </label>
          <textarea name="description" id="description">${product.description}</textarea>
        </div>
        <div>
          <label>Precio: </label>
          <input type="number" value="${product.price}" name="price" id="price">
        </div>
        <div>
          <label>Stock: </label>
          <input type="number" value="${product.stock}" name="stock" id="stock">
        <div>
          <label>Categoría: </label>
          <input type="text" value="${product.category}" name="category" id="category">
        </div>
        <button type="submit">Guardar</button>
      </form>
    `;

    // 2. Añadir logica al formulario para editar el producto.
    const $editedForm = document.getElementById('form-edit-product');
    const $descriptionInput = document.getElementById('description');
    const $priceInput = document.getElementById('price');
    const $stockInput = document.getElementById('stock');
    const $categoryInput = document.getElementById('category');
    $editedForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      // 3. Almacenar los datos del formulario en la base de datos.
      await fetch(`${API_URL}/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: $descriptionInput.value,
          price: $priceInput.value,
          stock: $stockInput.value,
          category: $categoryInput.value,
        }),
      });
      alert('¡Producto editado con exito!');
      navigateTo('/dashboard/products');
    });
  }; //Fin Logic
  return { html, logic };
}
