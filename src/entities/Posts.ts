
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// first database table
// we are using type graphql which works great with class decorators

@Entity()
export class Post {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text'})
  title!: string;

}