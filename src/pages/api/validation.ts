export function validateName(input: string): boolean {
  if (!input) return false;
  // match non-alphabet characters
  const regex = /[^a-zA-Z]/gm;
  const name = input.trim();
  const invalidate = !!name.match(regex);

  if (invalidate) {
    return false;
  } else {
    return true;
  }
}

export function validateEmail(input: string): boolean {
  // email regex pattern
  // i.e steve@email.com
  if (!input) return false;
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm;
  const email = input.trim().toLowerCase();
  const validate = !!email.match(regex);
  if (validate) {
    return true;
  } else {
    return false;
  }
}

export function validatePhone(input: string): boolean {
  // checks for non-digit characters
  if (!input) return false;
  const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
  const phone = input.trim();
  const validate = !!phone.match(regex);

  if (validate) {
    return true;
  } else {
    return false;
  }
}
