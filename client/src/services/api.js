const baseUrl = 'http://localhost:3000';
const baseFetchOptions = {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000',
    },
}

const getAll = async () => {
    return new Promise((resolve, reject) => {
        const fetchOptions = {
            ...baseFetchOptions,
            method: 'GET',
        }

        const route = '';
        callApi(fetchOptions, resolve, reject, route);
    });
}

const createTodoItem = async (item) => {
    return new Promise((resolve, reject) => {
        const fetchOptions = {
            ...baseFetchOptions,
            method: 'POST',
            body: JSON.stringify(item),
        }

        const route = 'create';
        callApi(fetchOptions, resolve, reject, route);
    });
};

const updateTodoItem = async (item) => {
    return new Promise((resolve, reject) => {
        const fetchOptions = {
            ...baseFetchOptions,
            method: 'PATCH',
            body: JSON.stringify(item),
        }

        const route = 'update';
        callApi(fetchOptions, resolve, reject, route);
    });
};

const deleteTodoItem = async (_id) => {
    return new Promise((resolve, reject) => {
        const fetchOptions = {
            ...baseFetchOptions,
            method: 'DELETE',
        }

        const route = `delete/${_id}`;
        callApi(fetchOptions, resolve, reject, route);
    });
};

const callApi = (fetchOptions, resolve, reject, route) => {
    fetch(`${baseUrl}/todos/${route}`, fetchOptions)
        .then(result => result.json())
        .then(data => resolve(data))
        .catch(err => reject(data));
}

export {
    getAll,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem,
}
