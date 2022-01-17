const bcrypt = require("bcryptjs");

function replacer(i, val) {
    if (val === undefined){
        return ""
    }
    if ( val === false ){
        return "false";
    }
    if (val === true){
        return "true"
    }
    if (val === null){
        return ""
    }
    else {
        return val;
    }
}


function reversedReplacer(i, val){
    if ( val === "false" )
    {
        return false;
    }
    if (val === "true"){
        return true
    }
    if (val === ""){
        return null
    }
    else {
        return val;
    }
}

function skolenieParser(skolenia) {
    const id_zamestnanca = new Set()
    for (let i = 0; i < skolenia.length; i++) {
        id_zamestnanca.add(skolenia[i].id)
    }

    let final = []
    id_zamestnanca.forEach(id => {
        const z = skolenia.filter(function (entry){
            return entry.id===id
        })
        let j = {};
        j["id"] = z[0].id
        j["meno"] = z[0].meno
        j["priezvisko"] = z[0].priezvisko
        j["oblast"] = z[0].oblast
        for (let i = 0; i < z.length; i++) {
            j[z[i].kod_skolenia] = new Date(z[i].datum_absolvovania ) //+ 'Z'
        }
        final.push(j)
    })
    return final
}

const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }
    return null;
};

function oblastiToList(oblasti){
    const ans = [];
    for (let i = 0; i < oblasti.length; i++) {
        ans.push(oblasti[i].oblast)
    }
    return ans
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


module.exports = {replacer, reversedReplacer, skolenieParser, hashPassword,oblastiToList, generatePassword, CSVfix}
