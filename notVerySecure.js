// Regex: The string must start '^' and end '$' with an alphanumeric character '[a-z\d]'
// It must contain more than one alphanumeric characters '+' and the match is case-insensitive 'i'
const alphanumeric = (string) => /^[a-z\d]+$/i.test(string);
