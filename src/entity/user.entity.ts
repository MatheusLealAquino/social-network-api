import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    firstName: string

  @Column()
    lastName: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column({ type: 'blob', nullable: true })
    profileImage?: string

  @Column({
    type: 'enum',
    enum: ['male', 'female']
  })
    gender: 'male' | 'female'

  @Column({
    type: 'enum',
    enum: ['single', 'in_a_relationship', 'married', 'widower', 'widow']
  })
    relationshipStatus: 'single' | 'in_a_relationship' | 'married' | 'widower' | 'widow'

  @Column()
    birthday: Date

  @Column()
    createdAt: Date

  @Column()
    updatedAt: Date
}
