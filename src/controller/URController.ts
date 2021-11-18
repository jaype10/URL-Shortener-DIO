import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortId from 'shortid'

export class URLController{
    public async shorten(req: Request, res: Response): Promise<void>{
        // Ver se a URL já não existe
        //  Criar o hash para essa URL
        
        const { originURL } = req.body
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        // Salvar a URL no banco
        // Retornar a URL que foi salva
        res.json({ originURL, hash, shortURL })
    }

    public async redirect(req: Request, res: Response):Promise<void> {
        // Pegar o hash da URL
        const { hash } =req.params
        // Encontrar a URL original pelo hash
        const url = {
            originURL: 'https://cloud.mongodb.com/v2/6194479a1622673f60c51866#clusters',
            hash: 'CLa6FLEwf',
            shortURL: 'http://localhost:5000/CLa6FLEwf',
        }
        // Redirecionar para a URL original a partir do que encontramos no DB
        res.redirect(url.originURL)
    }
}