import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  public id: number

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
