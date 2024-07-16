function alphanumeric(string) {
    const inputToTest = string.toLowerCase().split('')
    const legalCharacters = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ]
    
    let legality = true

    if (inputToTest.length === 0) { legality = false }

    for (let i = 0; i < inputToTest.length; i++) {
        if (!legalCharacters.includes(inputToTest[i])){
            legality = false
            break
        }
    }

    return legality
}