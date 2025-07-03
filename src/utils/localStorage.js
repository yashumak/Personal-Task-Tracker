
export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveUsername = (username) => {
    localStorage.setItem('username', username);
};

export const loadUsername = () => {
    return localStorage.getItem('username') || '';
};