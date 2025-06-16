import { column, defineDb, defineTable } from 'astro:db';

const Emails = defineTable({
  columns: {
    email: column.text({ unique: true }),
  },
});

export default defineDb({
  tables: {
    Emails: Emails,
  },
});
