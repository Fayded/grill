import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  register: defineAction({
    input: z.object({
      email: z.string().email('Valid email required'),
    }),
    handler: async (input) => {
      return `Hello, ${input.email}!`
    }
  })
}
