import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  public id: number

  @Column('text')
  public description: string

  @Column('boolean')
  public isDone: boolean

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
