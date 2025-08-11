//dependencies


const utilities = {}

utilities.parseJSON = (jsonString) => {
    let output;

    try{
        output = JSON.parse(jsonString);
    }catch{
        output = {}
    }

    return output;
}


utilities.createId = (length) =>{
    let idLength = typeof(length) === 'number' && length>0 ? length : false;

    if(idLength){
        const possibleChars = 'abcdefghijklmnopqrstuvwxyz';
        let output = '';

        for(let i=1; i<=idLength; i++){
            const randomCharacter = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            output+= randomCharacter;
        }

        return output;
    }else{
        return false;
    }
}

module.exports = utilities;