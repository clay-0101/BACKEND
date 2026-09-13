import crypto from 'crypto'

export function generateCode() {

    const mixString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let shortCode = ''

    for(let i = 1 ; i <= 6 ; i++){

        shortCode += mixString.charAt(Math.floor(Math.random() * 62))
    }
    
    return shortCode

}

