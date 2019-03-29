let fs = require('fs')

fs.readFileAsync = (file, enc)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, enc, (err, data)=>{
            if (err) 
                reject(err)
            else
                resolve(data)
        })
    })
}


class Monos{

    constructor(){
        this.enData
        this.frData
        this.language = 'en'

        fs.readFileAsync('./config/Monos-en.json', 'utf8')
        .then((data)=> this.enData = JSON.parse(data) )
        .catch((err)=> console.log(err) )

        fs.readFileAsync('./config/Monos-fr.json', 'utf8')
        .then((data)=> this.frData = JSON.parse(data) )
        .catch((err)=> console.log(err) )
    }

    getLanguage(){
        return this.language
    }

    setLanguage(lang){
        this.language = lang
    }

    getKeys(){
        if(this.language === 'en')
            return Object.keys(this.enData)
        if(this.language === 'fr')
            return Object.keys(this.frData)
    }

    getValues(){
        if(this.language === 'en')
            return Object.values(this.enData)
        if(this.language === 'fr')
            return Object.values(this.frData)
    }

    searchValues(key){
        let found = this.getKeys().indexOf(key)
        if(found != -1)
            return this.getValues()[found]
        else
            return 'Error Not found'
    }
}