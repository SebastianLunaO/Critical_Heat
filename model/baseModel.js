import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z from 'zod'

const game = z.object({
    title: z.string(),
    genre: z.string(),
    developer: z.string(),
    publisher: z.string(),
    release_date: z.string().date(),
    descp: z.string(),
    cover_ref: z.string(),
    Base_price: z.number(),
    
});


export class Games {
    static async create(game_info){ 
        const info = game.parse(game_info)
        const id = crypto.randomUUID();
        const result = await db.query(`INSERT INTO 
        Games VALUES 
        (?,?,?,?,?,?,?,?,?)`,[id,info.title,info.genre,info.developer,
            info.publisher,info.release_date,info.descp,info.cover_ref,info.Base_price]);

        return result[0]
    }
}