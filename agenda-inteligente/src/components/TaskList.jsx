import { TaskItem } from './TaskItem';
import './TaskList.css';

export function TaskList({ tasks, onToggleComplete, onDelete, onEdit, onUpdateProgress }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📋</span>
        <h3>Nenhuma tarefa encontrada</h3>
        <p>Adicione uma nova tarefa ou ajuste os filtros</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdateProgress={onUpdateProgress}
        />
      ))}
    </div>
  );
}
