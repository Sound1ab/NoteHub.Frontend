export interface INotepad {
  id: string,
  title: string,
  notes: INote[]
}

export interface INote {
  id: string,
  title: string,
  content: string,
  excerpt: string,
  createdAt: string,
}
