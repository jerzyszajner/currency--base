export const convertPLNToUSD = (PLN) => {

  // Check if the input is a string and return NaN in such case
  if (typeof PLN === 'string') {
    return NaN;
  }

  // Check if the input argument is not provided (undefined) and return NaN
  if (PLN === undefined) {
    return NaN;
  }

  // Check if the input is different than number and string and return 'Error'
  if (typeof PLN !== 'number') {
    return 'Error';
  }

  // Check if the input is lower than zero and return '$0.00'
  if (PLN < 0) {
    return '$0.00';
  }

  const PLNtoUSD = PLN / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}