import { IsAlphanumeric } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Note } from './Note'
import { User } from './User'

@Entity()
export class Notebook extends Base {
  @Column('text')
  @IsAlphanumeric()
  public title: string

  @ManyToOne(type => User, user => user.notebooks)
  public user: User

  @OneToMany(type => Note, note => note.notebook)
  public notes: Note[]
}
