export async function getUserDetails(username, password, setworngRequest) {
    try {
        console.log(password);
        const response = await fetch(`http://localhost:3000/managers/login`, {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        console.log("client");
        console.log("promise data " + promiseData);
        let data = promiseData.data;
        debugger;
        console.log("data " + data);
        if (data == null) {
            return { code: 304, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        return { code: 100, message: error, params: null };
    }
}

export async function loginByPostRequest(username, password) {
    try {
        const response = await fetch(`http://localhost:3000/managers/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-type': 'application/json'
            },
        });

        const status = response.status;
        const data = await response.json();

        if (status === 200) {
            return { status, data };
        } else {
            return { status, data: null };
        }
    } catch (error) {
        return { status: null, data: null };
    }
}

export async function RegisterByPostRequest(name, username, email, password, company) {
    console.log(JSON.stringify({ "name": name, username: username, email: email, password: password, company: company }));
    try {
        const response = await fetch(`http://localhost:3000/managers/register`, {
            method: "POST",
            body: JSON.stringify({ name: name, username: username, email: email, password: password, company: company }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const status = response.status;
        const data = await response.json();
        if (status === 200) {
            return { status, data };
        } else {
            return { status, data: null };
        }
    } catch (error) {
        return { status: null, data: null };
    }
}

export const fetchSurveys = async () => {
    try {
        const response = await fetch('http://localhost:3000/surveys');
        if (!response.ok) {
            throw new Error('Failed to fetch surveys');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching surveys:', error);
        throw error;
    }
};

export const addSurvey = async (survey) => {
    try {
        const response = await fetch('http://localhost:3000/surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey)
        });
        if (!response.ok) {
            throw new Error('Failed to add survey');
        }
        return response.json();
    } catch (error) {
        console.error('Error adding survey:', error);
        throw error;
    }
};
