import jwt from "jsonwebtoken"
import "dotenv/config"

let verificarToken = (req, res, next) => {
    let token = req.get('auth');
    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if(error){
            res.status(401).json("necesitas estar autenticado!")
        }
        req.usuario = decoded.usuario;
        next()
    })
}

export default verificarToken;