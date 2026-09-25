import Imagekit, { toFile } from "@imagekit/nodejs"
import { config } from "../config/config.js"

const client = new Imagekit({
    privateKey: config.imagekitPrivateKey
})

export async function uploadFile({ buffer, fileName }) {
    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName: fileName,
        folder : "snitch"
    })

    return response
}

export async function deleteFile(fileId){
    await client.files.delete(fileId)
}