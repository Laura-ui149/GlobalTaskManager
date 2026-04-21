import { ProgressBar } from './ProgressBar';
import { formatDate, isOverdue, daysRemaining } from '../utils/helpers';
import './TaskItem.css';

export function TaskItem({ task, onToggleComplete, onDelete, onEdit, onUpdateProgress }) {
  const days = daysRemaining(task.dueDate);
  const overdue = isOverdue(task.dueDate) && !task.completed;

  const getPriorityLabel = (priority) => {
    const labels = {
      low: '🟢 Baixa',
      medium: '🟡 Média',
      high: '🔴 Alta'
    };
    return labels[priority] || priority;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      trabalho: '💼 Trabalho',
      pessoal: '👤 Pessoal',
      estudo: '📚 Estudo',
      projeto: '🚀 Projeto'
    };
    return labels[category] || category;
  };

  const getDaysLabel = () => {
    if (days === null) return null;
    if (days < 0) return `⚠️ ${Math.abs(days)} dias atrasado`;
    if (days === 0) return '📅 Hoje!';
    if (days === 1) return '📅 Amanhã';
    return `📅 ${days} dias restantes`;
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <span className="checkmark"></span>
        </label>
        
        <div className="task-title-section">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className={`priority priority-${task.priority}`}>
              {getPriorityLabel(task.priority)}
            </span>
            <span className="category">{getCategoryLabel(task.category)}</span>
          </div>
        </div>

        <div className="task-actions">
          <button className="btn-icon" onClick={() => onEdit(task)} title="Editar">
            ✏️
          </button>
          <button className="btn-icon btn-delete" onClick={() => onDelete(task.id)} title="Excluir">
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="task-dates">
          {task.dueDate && (
            <span className={`due-date ${overdue ? 'overdue-text' : ''}`}>
              Entrega: {formatDate(task.dueDate)}
            </span>
          )}
          {days !== null && (
            <span className={`days-remaining ${overdue ? 'overdue-text' : ''}`}>
              {getDaysLabel()}
            </span>
          )}
        </div>

        <div className="task-progress">
          <span className="progress-label">Progresso:</span>
          <ProgressBar
            progress={task.progress}
            onChange={(value) => onUpdateProgress(task.id, value)}
          />
        </div>
      </div>
    </div>
  );
}
