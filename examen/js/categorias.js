const divCategories = document.getElementById('categorias');
async function loadCategories() {
  let url = 'http://localhost:3000/api/categoria';

  let response = await fetch(url);
  let categories = await response.json();
  console.log(categories);
  categories.forEach(category => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = category.id;
    checkbox.id = "category_" + category.id;
    divCategories.append(checkbox);
    const label = document.createElement('label');
    label.textContent = category.nombre;
    label.htmlFor = "category_" + category.id;
    // OTRA FORMA DE HACERLO
    // label.setAttribute("for", "category_" + category.id);
    divCategories.append(label);
  });
}

function saveData() {
  let categoriesChecked = document.querySelectorAll('input[type="checkbox"]:checked');
  let ids = [...categoriesChecked].map(category => category.value);
  localStorage.categories = JSON.stringify(ids);
}

document.getElementById('actualizar').addEventListener('click', saveData);

loadCategories();