export interface Task {
    id: string,
    description: string,
    important: boolean
}

export type Direction = "Up" | "Down"

export interface SelectedTask {
    index: number,
    id: string
      
}