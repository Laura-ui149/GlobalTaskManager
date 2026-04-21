import { useState } from 'react';
import { generateId } from '../utils/helpers';
import './TaskForm.css';

export function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || '');
  const [priority, setPriority] = useState(editingTask?.priority || 'medium');
  const [category, setCategory] = useState(editingTask?.category || 'trabalho');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('O título é obrigatório!');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      category,
      progress: editingTask?.progress || 0,
      completed: editingTask?.completed || false,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTask) {
      onUpdateTask({ ...taskData, id: editingTask.id });
    } else {
      onAddTask({ ...taskData, id: generateId() });
    }

    // Limpa o formulário
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('trabalho');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('trabalho');
    onCancelEdit?.();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Finalizar landing page"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes sobre a tarefa..."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate">Data de Entrega</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Prioridade</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Baixa</option>
            <option value="medium">🟡 Média</option>
            <option value="high">🔴 Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="trabalho">💼 Trabalho</option>
            <option value="pessoal">👤 Pessoal</option>
            <option value="estudo">📚 Estudo</option>
            <option value="projeto">🚀 Projeto</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingTask ? 'Salvar Alterações' : 'Adicionar Tarefa'}
        </button>
        {editingTask && (
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
