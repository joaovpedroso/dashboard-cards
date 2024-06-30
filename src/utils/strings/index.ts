const removeAcentuation = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toString();

const isValidName = (value: string) => {
    const strLength = value.replace(" ", "").length;
    const checkFirstCharacterAndSpaces = new RegExp(/^[a-zA-Z]*\s+[a-zA-Z]+\w*/gism);
    const clearedString = removeAcentuation(value);

    if( strLength < 2 )
        return false;

    if( !checkFirstCharacterAndSpaces.test(clearedString) )
        return false;
    
    return true;
};

export { isValidName, removeAcentuation };