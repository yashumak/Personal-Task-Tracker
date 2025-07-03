import React from 'react';

const TaskItem = ({
    task,
    onToggle,
    onEdit,
    onDelete,
}) => {
    return (
        <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
            <div className="task-main">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <div className="task-info">
                    <div className="task-title">{task.title}</div>
                    {task.description && <div className="task-desc">{task.description}</div>}
                    <div className="task-date">
                        {new Date(task.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
            <div className="task-actions">
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => {
                    if (window.confirm('Delete this task?')) onDelete(task.id);
                }}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;