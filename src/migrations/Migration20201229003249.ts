import { Migration } from '@mikro-orm/migrations';

export class Migration20201229003249 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_password_unique";');
  }

}
