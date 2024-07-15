async function getBikeData() {
  try {
    const response = await fetch(
      `https://challenges.brainster.tech/ajax_data/data.json`
    );
    if (!response.ok) {
      throw new Error("Network response was not good");
    }

    const data = await response.json();
    const products = data.products;
console.log(products);
    const parentEl = document.querySelector(".parent");

    // function for creating the list elements
    function createLiEl(key, value, dataAttribute) {
      return `
          <li class="d-flex space-between li-item" data-${dataAttribute}="${key}">
            <span>${key}</span>
            <span>${value}</span>
          </li>
        `;
    }

    // Added extra format functionality for the price numbers
    const formatCurr = function (value, locale, currency = "USD") {
      const roundedValue = Math.round(value);

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(roundedValue);
    };

    // create html for the product cards
    function createProductCards(item, locale) {
      const formattedPrice = formatCurr(item.price, locale);

      return `
          <div class="flex-basis-33">
            <div class="m-l-3rem item">
              <img src="img/${item.image}.png" class="image-zoom">
              <div class="bg-orange p-1rem b-radius-e-b">
                <h4>${item.name}</h4>
                <p>${formattedPrice}</p>
              </div>
            </div>
          </div>
        `;
    }

    // function for rendering the side menu
    function createMenu() {
      const filterBrand = document.querySelector(".filterBrand");
      const showAllFilter = document.querySelector(".showAll");
      const filterGender = document.querySelector(".filterGender");

      // displaying all products
      createAll();

      // function for rendering the badges using reduce method
      function createBadge(property, element, dataAttribute) {
        const badges = products.reduce((acc, cur) => {
          const value = property ? cur[property] : "Show all";
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});

        Object.entries(badges).forEach(([key, badge]) => {
          const li = createLiEl(key, badge, dataAttribute);
          element.innerHTML += li;
        });

        // I used event delegation/bubbling to manage click events
        element.addEventListener("click", function (e) {
          createItemsByFilter(e, property, dataAttribute);
        });
      }

      createBadge("gender", filterGender, "genders");
      createBadge("brand", filterBrand, "name");
      createBadge(undefined, showAllFilter, "show-all");

      const firstLiElement = showAllFilter.querySelector("li");
      const secondSpanElement = showAllFilter.querySelector(
        "li span:nth-child(2)"
      );

      firstLiElement.classList.add("color-orange");
      secondSpanElement.style.backgroundColor = "#ffa500";
      secondSpanElement.style.color = "#000";
    }

    createMenu();

    // function to display all items
    function createAll() {
      parentEl.innerHTML = products.map(createProductCards).join("");
    }

    // function to create items by filter
    function createItemsByFilter(e, filterKey, filterValue) {
      // I used event delegation/bubbling to manage click events
      const target = e.target.closest("li");
      if (!target) return;

  
      const filteredProducts = products.filter(
        (el) => el[filterKey] === target.dataset[filterValue]
      );
console.log(filteredProducts);
      const resultProducts = filteredProducts.map(createProductCards).join("");

      parentEl.innerHTML = resultProducts;

      const listItems = document.querySelectorAll(".li-item");

      listItems.forEach((item) => {
        item.classList.remove("color-orange");

        item.querySelector("span:nth-child(2)").style.backgroundColor = "";
        item.querySelector("span:nth-child(2)").style.color = "";
      });
      target.classList.add("color-orange");

      target.querySelector("span:nth-child(2)").style.backgroundColor =
        "#ffa500";
      target.querySelector("span:nth-child(2)").style.color = "#000";
    }
  } catch (error) {
    console.error(error);
  }
}
getBikeData();