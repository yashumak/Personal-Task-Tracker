import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
    tasks,
    onToggle,
    onEdit,
    onDelete,
}) => {
    if (tasks.length === 0) return <div className="empty-list">No tasks.</div>;
    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;