import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortId from 'shortid'
import { URLModel } from "../database/model/URL";

export class URLController{
    public async shorten(req: Request, res: Response): Promise<void>{
        // Ver se a URL já não existe
        const { originURL } = req.body
        const url = await URLModel.findOne({originURL})
        if(url){
            res.json(url)
            return
        }
        //  Criar o hash para essa URL        
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        // Salvar a URL no banco
        const newURL = await URLModel.create({ originURL,  hash, shortURL })
        // Retornar a URL que foi salva
        res.json(newURL)
    }

    public async redirect(req: Request, res: Response):Promise<void> {
        // Pegar o hash da URL
        const { hash } =req.params
        const url = await URLModel.findOne({hash})
        // Encontrar a URL original pelo hash
        if (url) {
            res.redirect(url.originURL)
            return
        }
        // Redirecionar para a URL original a partir do que encontramos no DB
        res.status(400).json({error: 'URL not found'})
    }
    
}