"use strict";

const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const dateEl = document.getElementById("date");
const selectEl = document.getElementById("category");
const submitExpensesBtn = document.getElementById("submitExpense");
const itemsEl = document.getElementById("expensesList");
const filterCategory = document.getElementById("filterCategory");
const category = document.getElementById("getCategory");
const addCategoryBtn = document.getElementById("addCategory");
const formEl = document.querySelector("form");

// global variables
let expensesArr = JSON.parse(localStorage.getItem("expenses")) || [];
let editingExpenseId;
let row;

// Class for creating options
class OptionCreator {
  constructor(formElement, categorySelect, selectElement, filterCategory) {
    this.formElement = formElement;
    this.categorySelect = categorySelect;
    this.selectElement = selectElement;
    this.filterCategory = filterCategory;
    this.categories = [];
    this.addSubmitEventListener();
    this.loadCategoryFromLocalStorage();
  }

  addSubmitEventListener() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addOption();
      this.saveCategoryToLocalStorage();
      this.formElement.reset();
    });
  }

  // function for adding options to the filterCategory
  addOption() {
    const categoryVal = this.categorySelect.value.trim();

    if (!this.categories.includes(categoryVal)) {
      const option = document.createElement("option");
      option.text = categoryVal;
      option.value = categoryVal;
      this.selectElement.add(option);

      const clonedOption = option.cloneNode(true);
      this.filterCategory.add(clonedOption);
      this.categories.push(categoryVal);
    }
  }

  saveCategoryToLocalStorage() {
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  loadCategoryFromLocalStorage() {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      this.categories = storedCategories;
      this.categories.forEach((category) => {
        const option = document.createElement("option");
        option.text = category;
        option.value = category;
        this.selectElement.add(option);

        const clonedOption = option.cloneNode(true);
        this.filterCategory.add(clonedOption);
      });
    }
  }
}

// class option creator instance
const optionCreator = new OptionCreator(
  formEl,
  category,
  selectEl,
  filterCategory
);

// class for creating expenses
class Expense {
  constructor(description, amount, date, option) {
    this.id = new Date().valueOf().toString();
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.option = option;
  }

  removeItem(expense) {
    const confirmRemove = confirm(
      "Are you sure you want to remove this expense?"
    );
    if (confirmRemove) {
      expensesArr = expensesArr.filter((item) => item.id !== expense.id);
      addOrUpdateExpense();
      saveExpensesToLocalStorage();
    }
  }
}

// function for submiting the enter values for the expenses
submitExpensesBtn.addEventListener("click", () => {
  if (
    !descriptionEl.value.trim() ||
    !amountEl.value.trim() ||
    !dateEl.value.trim() ||
    !selectEl.value.trim()
  ) {
    alert("Please fill in all fields.");
    return;
  }

  if (editingExpenseId) {
    const index = expensesArr.findIndex(
      (element) => element.id === editingExpenseId
    );
    expensesArr[index].description = descriptionEl.value;
    expensesArr[index].amount = amountEl.value;
    expensesArr[index].date = dateEl.value;
    expensesArr[index].option = selectEl.value;
    saveExpensesToLocalStorage();
    editingExpenseId = undefined;
  } else {
    const descriptionVal = descriptionEl.value;
    const amountVal = amountEl.value;
    const dateVal = dateEl.value;
    const selectVal = selectEl.value;

    if (descriptionVal && amountVal && dateVal && selectVal) {
      const tracker = new Expense(
        descriptionVal,
        amountVal,
        dateVal,
        selectVal
      );
      expensesArr.push(tracker);
      saveExpensesToLocalStorage();
    }
  }
  addOrUpdateExpense();
  descriptionEl.value = "";
  amountEl.value = "";
  dateEl.value = "";
  selectEl.selectedIndex = 0;
});

function addOrUpdateExpense(filteredExpenses = expensesArr) {
  itemsEl.innerHTML = "";
  filteredExpenses.forEach((expense) => {
    let row = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = expense.description;
    const amountCell = document.createElement("td");
    amountCell.textContent = `$${expense.amount}`;

    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date;

    const optionCell = document.createElement("td");
    optionCell.textContent = expense.option;

    const editBtn = createButton("Edit", "#17A2B8", "#fff");
    const deleteBtn = createButton("Delete", "red", "#fff");

    // deleting expenses
    deleteBtn.addEventListener("click", () => {
      expense.removeItem(expense);
      editingExpenseId = undefined;
    });

    // editing expenses
    editBtn.addEventListener("click", () => {
      descriptionEl.value = expense.description;
      amountEl.value = expense.amount;
      dateEl.value = expense.date;
      selectEl.value = expense.option;
      editingExpenseId = expense.id;
    });

    row.append(
      descriptionCell,
      amountCell,
      dateCell,
      optionCell,
      editBtn,
      deleteBtn
    );

    itemsEl.appendChild(row);
  });
}

// function for creating buttons
function createButton(text, backgroundColor, textColor) {
  const button = document.createElement("button");
  button.classList.add("m-1");
  button.textContent = text;
  button.style.backgroundColor = backgroundColor;
  button.style.border = "none";
  button.style.color = textColor;
  return button;
}

// function for sorting
function sortArrayBy(order, key) {
  return function (a, b) {
    if (order === "asc") {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    } else if (order === "desc") {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    }
  };
}

function sortArrayAndRefresh(order, key) {
  expensesArr.sort(sortArrayBy(order, key));
  addOrUpdateExpense();
}

const dateAscending = document.querySelector(".date-asc");
const dateDescending = document.querySelector(".date-desc");

dateAscending.addEventListener("click", () =>
  sortArrayAndRefresh("asc", "date")
);
dateDescending.addEventListener("click", () =>
  sortArrayAndRefresh("desc", "date")
);

const amountAscending = document.querySelector(".amount-asc");
const amountDescending = document.querySelector(".amount-desc");

amountAscending.addEventListener("click", () =>
  sortArrayAndRefresh("asc", "amount")
);
amountDescending.addEventListener("click", () =>
  sortArrayAndRefresh("desc", "amount")
);

// function for filtering
filterCategory.addEventListener("change", () => {
  const selectedCategory = filterCategory.value;
  if (selectedCategory !== "All") {
    const filteredExpenses = expensesArr.filter(
      (expense) => expense.option === selectedCategory
    );
    addOrUpdateExpense(filteredExpenses);
  } else {
    addOrUpdateExpense(expensesArr);
  }
});

function saveExpensesToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expensesArr));
}

document.addEventListener("DOMContentLoaded", () => {
  loadExpensesFromLocalStorage();
  addOrUpdateExpense();
});

function loadExpensesFromLocalStorage() {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
  if (storedExpenses) {
    expensesArr = storedExpenses.map(
      (expenseData) =>
        new Expense(
          expenseData.description,
          expenseData.amount,
          expenseData.date,
          expenseData.option
        )
    );
  }
}
