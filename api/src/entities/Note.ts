import { IsAlphanumeric } from 'class-validator'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Notebook } from './Notebook'

@Entity()
export class Note extends Base {
  @Column('text')
  @IsAlphanumeric()
  public title: string

  @Column('text')
  @IsAlphanumeric()
  public markdown: string

  @Column('text')
  @IsAlphanumeric()
  public excerpt: string

  @ManyToOne(type => Notebook, notebook => notebook.notes)
  public notebook: Notebook
}
