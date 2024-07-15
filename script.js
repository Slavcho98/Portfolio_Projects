// Exercise number 1
class Profile {
  constructor(name, company, position, salary) {
    this.name = name;
    this.company = company;
    this.position = position;
    this.salary = salary;
  }
}

const branko = new Profile("Branko", "Brainster", "Manager", `${500} eu`);
const stanko = new Profile("Stanko", "EVN", "Owner", `${570} eu`);
const darko = new Profile(
  "Darko",
  "Freelancer",
  "Front-end Developer",
  `${1000} eu`
);

const list = document.querySelector(".list");
const ul = document.createElement("ul");

function createListItem(profile) {
  const li = document.createElement("li");
  li.classList.add("text-white");
  li.textContent = `${profile.name}, ${profile.company}, ${profile.position}, ${profile.salary}`;
  return li;
}

const profiles = [branko, stanko, darko];
profiles.forEach((profile) => {
  ul.appendChild(createListItem(profile));
});

list.appendChild(ul);

// Exercise number 2
function Cube(sideLength) {
  this.sideLength = sideLength;
}

Cube.prototype.calculateSurfaceArea = function () {
  return 6 * Math.pow(this.sideLength, 2);
};

Cube.prototype.calculatePerimeter = function () {
  return 12 * this.sideLength;
};

let sideLength;

while (true) {
  let input = prompt("Enter the size of the sides of the cube:");
  if (input.trim() !== "" && !isNaN(input)) {
    sideLength = +input;
    const cube = new Cube(sideLength);
    console.log("Surface Area:", cube.calculateSurfaceArea());
    console.log("Perimeter:", cube.calculatePerimeter());
    break;
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
}

// Exercise number 3
const form = document.querySelector("form");
const fromInput = form.querySelector("#fromInput");
const toInput = form.querySelector("#toInput");
const subjectInput = form.querySelector("#subjectInput");
const textArea = form.querySelector("textarea");

let sender, recipient, emailSubject, emailMessage;

while (true) {
  sender = prompt("From:");
  recipient = prompt("To:");
  emailSubject = prompt("Subject:");
  emailMessage = prompt("Message:");

  if (
    sender.trim() !== "" &&
    recipient.trim() !== "" &&
    emailSubject.trim() !== "" &&
    emailMessage.trim() !== ""
  ) {
    break;
  } else {
    alert(
      "Invalid input. Please make sure all fields are filled with valid input."
    );
  }
}

class Email {
  constructor(firstName, secondName, subject, message) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.subject = subject;
    this.message = message;
  }

  mail() {
    fromInput.value = this.firstName;
    toInput.value = this.secondName;
    subjectInput.value = this.subject;
    textArea.value = this.message;
  }

  displayMessage() {
    return `This message is from: ${this.firstName}, To: ${this.secondName}, The subject is: ${this.subject}, The message is: ${this.message}`;
  }
}

const newEmail = new Email(sender, recipient, emailSubject, emailMessage);
newEmail.mail();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(newEmail.displayMessage());
  form.reset();
});
