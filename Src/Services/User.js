const db = require("../Config/Database.js");
const _logServices = require('./Logs.js');

exports.signIn = async (user) =>{
    const { rows } = await db.query(`
    SELECT
        CASE WHEN EXISTS 
        (
            select * from esp_users eu where user_email = $1 and user_password = $2
        )
        THEN 'TRUE'
        ELSE 'FALSE'
    END
    `, [String(user.email), String(user.password)]);
    console.log("Query Result: ", rows[0].case);
    const result = {
        message: (rows[0].case == "TRUE") ? "Usuário Autenticado !" : "Erro de Autenticação !",
        body: {
            isUserAuthenticated: rows[0]
        }
    }
    return result;
};