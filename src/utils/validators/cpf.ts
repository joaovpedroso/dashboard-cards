const validateDigit = (arr: number[], position: number): boolean => {
    let factor: number;
    let arrayDigit: number;
    let sum = 0;
  
    if (position === 1) {
      factor = 10;
      arrayDigit = 9;
    } else {
      factor = 11;
      arrayDigit = 10;
    }
  
    for (let i = 0; i < arrayDigit; i += 1) {
      sum += arr[i] * factor;
      factor -= 1;
    }
  
    const division = Math.floor(sum % 11);
    let verifyingDigit = 0;
  
    if (division > 1)
      verifyingDigit = 11 - division;
    
    if (arr[arrayDigit] !== verifyingDigit)
      return false;
  
    return true;
};
  
const isValidCPF = (cpf: string): boolean => {
  const filteredCPF = cpf.toString().replace(/\.|-/g, "");

  if (filteredCPF.length !== 11)
      return false;
  
  const arrCPF: number[] = Array.from(filteredCPF, Number);

  const repeatedNumbers: boolean = arrCPF.every((num, _, arr) => num === arr[0]);

  if (repeatedNumbers)
      return false;
  
  const firstDigit = validateDigit(arrCPF, 1);
  const secondDigit = validateDigit(arrCPF, 2);

  if (!firstDigit || !secondDigit)
      return false;

  return true;
};

export { isValidCPF };