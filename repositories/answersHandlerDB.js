const mysql = require('mysql2');


var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();


async function getAllAnswers() {
    const result = await pool.query('SELECT * FROM answers');
    return prepareResult(false, 0, 0, result);
}

async function getAnswerById(userId) {
    try {
        const result = await pool.query('SELECT * FROM answers WHERE userId = ?', [userId]);
        if (result.length === 0) {
            throw new Error(`Answer with ID ${userId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);

    } catch (error) {
        throw error;
    }
}

async function addAnswer(newAnswer) {
    try {
        if (newAnswer.completed) {
            newAnswer.completed = 1;
        }
        else
            newAnswer.completed = 0;
        const result = await pool.query(`INSERT INTO answers (userID, title,completed) VALUES ('${newAnswer.userId}', '${newAnswer.title}','${newAnswer.completed}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateAnswer(answerId, updatedAnswerData) {
    try {
        const result = await pool.query('UPDATE answers SET ? WHERE id = ?', [updatedAnswerData, answerId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)
        }
        else {
            return prepareResult(true, 0, 0);
        }

    } catch (error) {
        throw error;
    }
}

async function deleteAnswer(answerId) {
    try {
        const result = await pool.query('DELETE FROM answers WHERE id = ?', answerId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}
function prepareResult(hasErrorT = true, affectedRowsT = 0, insertIdT = -1, dataT = null) {
    const resultdata = {
        hasError: hasErrorT,
        affectedRows: affectedRowsT,
        insertId: insertIdT,
        data: dataT
    }
    return resultdata;
}
module.exports = {
    getAllAnswers,
    getAnswerById,
    addAnswer,
    updateAnswer,
    deleteAnswer
};