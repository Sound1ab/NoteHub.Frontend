import { IsAlpha, IsEmail } from 'class-validator'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Notebook } from './Notebook'

@Entity()
export class User extends Base {
  @Column('text')
  @IsAlpha()
  public firstName: string

  @Column('text')
  @IsAlpha()
  public lastName: string

  @Column('text')
  @IsEmail()
  public email: string

  @OneToMany(type => Notebook, notebook => notebook.user)
  public notebooks: Notebook[]
}
