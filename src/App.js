import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { saveTasks, loadTasks, loadUsername } from './utils/localStorage';
import './styles/App.css';

function App() {
    const [username, setUsername] = useState(loadUsername());
    const [tasks, setTasks] = useState(loadTasks());
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [search, setSearch] = useState('');
    const [dark, setDark] = useState(false);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const handleLogin = (name) => setUsername(name);

    const handleSaveTask = (task) => {
        if (task.id) {
            setTasks(tasks.map(t => t.id === task.id ? { ...t, ...task } : t));
            setEditingTask(null);
        } else {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    title: task.title,
                    description: task.description,
                    completed: false,
                    createdAt: new Date().toISOString(),
                },
            ]);
        }
    };

    const handleToggle = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleEdit = (task) => setEditingTask(task);

    const handleDelete = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        if (editingTask && editingTask.id === id) setEditingTask(null);
    };

    const handleCancelEdit = () => setEditingTask(null);

    const filteredTasks = tasks.filter(t => {
        const matchesFilter =
            filter === 'all' ? true :
                filter === 'completed' ? t.completed :
                    !t.completed;
        const matchesSearch =
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    const counts = {
        all: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
    };

    if (!username) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className={`app-container${dark ? ' dark' : ''}`}>
            <header>
                <h1>Task Tracker</h1>
                <div className="welcome">Welcome, {username}!</div>
                <button onClick={() => setDark(d => !d)}>
                    {dark ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            <TaskForm
                onSave={handleSaveTask}
                editingTask={editingTask}
                onCancel={handleCancelEdit}
            />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
            <TaskList
                tasks={filteredTasks}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;