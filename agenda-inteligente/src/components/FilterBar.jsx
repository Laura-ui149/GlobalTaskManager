import './FilterBar.css';

export function FilterBar({ filters, onFilterChange, taskStats }) {
  return (
    <div className="filter-bar">
      <div className="stats">
        <div className="stat-item">
          <span className="stat-number">{taskStats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-pending">{taskStats.pending}</span>
          <span className="stat-label">Pendentes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-completed">{taskStats.completed}</span>
          <span className="stat-label">Concluídas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-overdue">{taskStats.overdue}</span>
          <span className="stat-label">Atrasadas</span>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
            <option value="overdue">Atrasadas</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Prioridade:</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Categoria:</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          >
            <option value="all">Todas</option>
            <option value="trabalho">Trabalho</option>
            <option value="pessoal">Pessoal</option>
            <option value="estudo">Estudo</option>
            <option value="projeto">Projeto</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ordenar:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          >
            <option value="dueDate">Data de Entrega</option>
            <option value="priority">Prioridade</option>
            <option value="progress">Progresso</option>
            <option value="createdAt">Data de Criação</option>
          </select>
        </div>
      </div>
    </div>
  );
}
