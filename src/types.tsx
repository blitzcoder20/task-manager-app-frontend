export type Link={
    name:string,
    href:string,
}

export type MiniTaskCardProps = {
    author: string,
    created_at: string,
    deadline: string,
    title: string,
    description: string,
    assigned_to: string[]
};
  
export type Task = {
    id?:number,
    author: string,
    created_at?: string,
    deadline: string,
    title: string,
    description: string,
    assigned_to: string[]   
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