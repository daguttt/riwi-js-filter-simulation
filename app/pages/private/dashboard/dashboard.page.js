import { navigateTo } from '../../../Router';
import { API_URL } from '../../../constants';

export function DashboardPageComponent() {
  const user = JSON.parse(localStorage.getItem('user'));

  const html = /*html*/ `
    <h1>Todos los productos</h1>
    <section class="products-container"></section>
  `;
  const logic = async () => {
    // 1. Obtener y mostrar en el HTML los productos del JSON-server
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    const $infoProducts = document.querySelector('.products-container');

    const $fragment = document.createDocumentFragment();
    products.forEach((product) => {
      const $productCard = document.createElement('div');
      $productCard.classList.add('product-card');
      const productHtml = /*HTML*/ `
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <p>${product.stock}</p>
          <div id="btns-container-${product.id}" ></div>
      `;
      $productCard.innerHTML = productHtml;
      $fragment.appendChild($productCard);
      // 2. Mostrar botón de comprar para el visitante, y los de editar y eliminar para el admin
      const $buttonsContainer = $fragment.getElementById(
        `btns-container-${product.id}`
      );
      if (user.userRoleId === '1' /* Admin */) {
        $buttonsContainer.innerHTML = /*html*/ `
            <button class="edit-btn" data-product-id="${product.id}">Editar</button>
            <button class="delete-btn" data-product-id="${product.id}" >Eliminar</button>
          `;
        // -*********************************************************-
        // Añadir eventos desde aquí
        // Botón Editar
        const $buttonEdit = $fragment.querySelector(
          `.edit-btn[data-product-id="${product.id}"]`
        );
        $buttonEdit.addEventListener('click', () => {
          const productToEditId = $buttonEdit.dataset.productId;
          console.log(`Editando el producto con el id ${productToEditId}`);
          console.log(
            `Navegando a la ruta: /dashboard/products/edit?id=${productToEditId}`
          );
          navigateTo(`/dashboard/products/edit?id=${productToEditId}`); // -> Search params
          // navigateTo(`/products/edit/${productToEditId}`); // -> Route params. Esto no lo soporta el router que estamos implementando
        });
        // Boton Eliminar
        const $buttonDelete = $buttonsContainer.querySelector('.delete-btn');
        $buttonDelete.addEventListener('click', () => {
          console.log(`Eliminando el producto ${product.id}`);
          //     const productToDeleteId = $buttonDelete.dataset.productId;
          //     console.log(`Elinando el producto con el id ${productToDeleteId}`);
          //     // const deleteUrl = `$/products/${productToDeleteid}`;
          //     // fetch(deleteUrl, {
          //     //   method: 'DELETE',
          //     //   headers: {
          //     //     contentType: 'application/json',
          //     //   },
          //     // })
          //     //   .then((response) => {
          //     //     if (!response.ok) {
          //     //       throw new Error('Error al borrar el producto');
          //     //     }
          //     //     return response.json();
          //     //   })
          //     //   .then((data) => {
          //     //     console.log('Producto eliminado:', data);
          //     //   })
          //     //   .catch((error) => {
          //     //     console.error('error al eliminar el producto:', error);
          //     //   });
        });
      } else if (user.userRoleId === '2' /* Visitor */) {
        //   $buttonsContainer.innerHTML = /*html*/ `
        //       <button class="buy-btn">Comprar</button>
        //     `;
        //   //Añadir eventos desde aqui
        //   const $buyBtns = document.querySelectorAll('.buy-btn');
        //   $buyBtns.forEach(($button) => {
        //     $button.addEventListener('click', () => {
        //       console.log(
        //         'Vamooooooooooos la puta madreeeee, aguante tallereeees'
        //       );
        //     });
        //   });
      }
    }); //Fin forEach
    $infoProducts.appendChild($fragment);

    // 3. Añadir lógica a los botones de comprar en el caso de que sea visitante
    // 4. Añadir logíca a los botones del admin (editar y eliminar)
    // const $editBtnProductList = document.querySelectorAll('.edit-btn');
    // $editBtnProductList.forEach(($button) => {
    //   $button.addEventListener('click', () => {
    //     const productToEditid = $button.dataset.productId;
    //     navigateTo(`/products/edit/${productToEditid}`);
    //   });
    // });

    // const $deleteBtnProductList = document.querySelector('.delete-btn');
    // $deleteBtnProductList.forEach(($button) => {
    //   $button.addEventListener('click', () => {
    //     const productToDeleteid = $button.dataset.productId;
    //     const deleteUrl = `$/products/${productToDeleteid}`;
    //     fetch(deleteUrl, {
    //       method: 'DELETE',
    //       headers: {
    //         contentType: 'application/json',
    //       },
    //     })
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error('Error al borrar el producto');
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         console.log('Producto eliminado:', data);
    //       })
    //       .catch((error) => {
    //         console.error('error al eliminar el producto:', error);
    //       });
    //   });
    // });
  };
  return { html, logic };
}
