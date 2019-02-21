const calculator = (num1, num2, caltype) => {
  if (caltype === "add") {
    return num1 + num2;
  } else if (caltype === "sub") {
    return num1 - num2;
  } else {
    return "invalid cal type";
  }
};

//calculator(2, 2, "add");

console.log(calculator(7, 2, "sub"));
