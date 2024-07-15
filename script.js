// exercise 1

let array = [1, 5, 10, 11, 20, 34];

function transformArray(arr) {
  const transformedArray = [];
  const multiplier = arr.length < 10 ? 2 : 4;

  for (let i = 0; i < arr.length; i++) {
    transformedArray.push(arr[i] * multiplier);
  }

  return transformedArray;
}

let result = transformArray(array);

console.log(result);

// exercise 2
function removeDuplicates(arr) {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}

var originalArray = [1, 2, 3, 4, 2, 5, 6, 1];
var newArray = removeDuplicates(originalArray);

console.log("Original Array:", originalArray);
console.log("Array with Duplicates Removed:", newArray);

// exericse 3
let nrRows = prompt("Enter the number of rows:");
let nrColumns = prompt("Enter the number of columns:");

nrRows = parseInt(nrRows);
nrColumns = parseInt(nrColumns);

if (isNaN(nrRows) || isNaN(nrColumns) || nrRows <= 0 || nrColumns <= 0) {
  alert("Please enter valid numbers");
} else {
  generateTable(nrRows, nrColumns);
}

function generateTable(nrRows, nrColumns) {
  let table = "<table>";

  for (let i = 0; i < nrRows; i++) {
    table += "<tr>";
    for (let j = 0; j < nrColumns; j++) {
      table += "<td>";
      table += i === 0 ? j + 1 : i + (j + 1);
      table += "</td>";
    }
    table += "</tr>";
  }

  table += "</table>";

  document.body.innerHTML = table;
}
