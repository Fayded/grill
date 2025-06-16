import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { turso } from '../turso'; 

export const server = {
  newsletter: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
    }),
    handler: async ({ email }) => {
      try {
        await turso.execute({
          sql: 'INSERT INTO emails (email) VALUES (?)',
          args: [email],
        });
        return {
          success: true
        };
      } catch (error) {
        throw new Error('Failed to subscribe email.');
      }
    },
  }),
};