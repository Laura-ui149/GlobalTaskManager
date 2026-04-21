import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { isOverdue } from './utils/helpers';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('agenda-tasks', []);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    sortBy: 'dueDate'
  });

  // Adicionar tarefa
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Atualizar tarefa
  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  // Excluir tarefa
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  // Alternar conclusão
  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? { ...t, completed: !t.completed, progress: !t.completed ? 100 : t.progress }
          : t
      )
    );
  };

  // Atualizar progresso
  const handleUpdateProgress = (taskId, progress) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? { ...t, progress, completed: progress === 100 }
          : t
      )
    );
  };

  // Estatísticas
  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      overdue: tasks.filter((t) => !t.completed && isOverdue(t.dueDate)).length
    };
  }, [tasks]);

  // Filtragem e ordenação
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filtrar por status
    if (filters.status === 'pending') {
      result = result.filter((t) => !t.completed);
    } else if (filters.status === 'completed') {
      result = result.filter((t) => t.completed);
    } else if (filters.status === 'overdue') {
      result = result.filter((t) => !t.completed && isOverdue(t.dueDate));
    }

    // Filtrar por prioridade
    if (filters.priority !== 'all') {
      result = result.filter((t) => t.priority === filters.priority);
    }

    // Filtrar por categoria
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }

    // Ordenar
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'progress':
          return b.progress - a.progress;
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, filters]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 Agenda Inteligente</h1>
        <p>Organize suas tarefas e acompanhe seu progresso</p>
      </header>

      <main className="app-main">
        <div className="app-sidebar">
          <TaskForm
            onAddTask={handleAddTask}
            editingTask={editingTask}
            onUpdateTask={handleUpdateTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        <div className="app-content">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            taskStats={taskStats}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
            onUpdateProgress={handleUpdateProgress}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
