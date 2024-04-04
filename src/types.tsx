export type Link = {
  name: string;
  href: string;
};

export type MiniTaskCardProps = {
  id?: number;
  author: string;
  created_at: string;
  deadline: string;
  title: string;
  description: string;
  assigned_to: AssigneesUsers[];
  tasksState: {
    tasks: Array<Task>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  };
};

export type Task = {
  id?: number;
  author: string;
  author_id?: number;
  created_at?: string;
  deadline: string;
  title: string;
  description: string;
  assigned_to: AssigneesUsers[];
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  age: number;
  username: string;
};

export type AssigneesUsers = { id: number; username: string };

export type SelectedTaskContextT = null | {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export type UserContextT = null | {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type FilterSearchContextT = null | {
  filterSearch: string;
  setFilterSearch: React.Dispatch<React.SetStateAction<string>>;
};
