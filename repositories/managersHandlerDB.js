const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'localhost',
    // password: 'T50226',
    password: '1570',
        user: 'root',
    database:'surveysdatabase'
}).promise();

async function getAllManagers() {
    const result = await pool.query('SELECT * FROM Managers');
    return prepareResult(false, 0, 0, result);
}

async function getManagerById(ManagerId) {
    try {
        const result = await pool.query('SELECT * FROM Managers WHERE id = ?', [ManagerId]);
        if (result.length === 0) {
            throw new Error(`Manager with ID ${ManagerId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        throw error;
    }
}

async function addManager(newManager) {
    try {
        const result = await pool.query(`INSERT INTO Managers (name,username,email,password) VALUES ('${newManager.name}','${newManager.username}','${newManager.email}','${newManager.password}')`);
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

async function findManagerByUsername(username) {
    try {
        const rows = await pool.query('SELECT * FROM Managers WHERE username = ?', [username]);
        return rows;
    } catch (error) {
        console.error("error in handler DB", error);
        throw error;
    }
}

async function updateManager(ManagerId, updatedManagerData) {
    try {
        const result = await pool.query('UPDATE Managers SET ? WHERE id = ?', [updatedManagerData, ManagerId]);
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

async function deleteManager(managerId) {
    try {
        const result = await pool.query('DELETE FROM Managers WHERE id = ?', managerId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}
function prepareResult(hasErrorTemp = true, affectedRowsTemp = 0, insertIdTemp = -1, dataTemp = null) {
    const resultdata = {
        hasError: hasErrorTemp,
        affectedRows: affectedRowsTemp,
        insertId: insertIdTemp,
        data: dataTemp
    }
    return resultdata;
}

module.exports = {
    getAllManagers,
    getManagerById,
    addManager,
    findManagerByUsername,
    updateManager,
    deleteManager
}