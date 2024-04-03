export type Link={
    name:string,
    href:string,
}

export type MiniTaskCardProps = {
    id?:number,
    author: string,
    created_at: string,
    deadline: string,
    title: string,
    description: string,
    assigned_to: AssigneesUsers[]
};
  
export type Task = {
    id?:number,
    author: string,
    author_id?:number,
    created_at?: string,
    deadline: string,
    title: string,
    description: string,
    assigned_to: AssigneesUsers[]   
  }

export type User  = {
    id:number,
    name:string,
    surname:string,
    email:string,
    age:number,
    username:string
}

export type AssigneesUsers = {"id":number,"username":string} 

export type SelectedTaskContextT = null | { "selectedTask": Task | null, "setSelectedTask": React.Dispatch<React.SetStateAction<Task | null>> }