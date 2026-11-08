import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

import { turso } from '../turso';

const MIN_SUBMIT_MS = 2000;

export const server = {
  newsletter: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email().max(254),
      website: z.string().max(0).optional(),
      _t: z.string().optional(),
    }),
    handler: async ({ email, website, _t }) => {
      if (website) {
        return { success: true };
      }

      if (_t) {
        const elapsed = Date.now() - Number(_t);
        if (elapsed < MIN_SUBMIT_MS) {
          return { success: true };
        }
      }

      try {
        await turso.execute({
          sql: 'INSERT INTO emails (email) VALUES (?)',
          args: [email],
        });
        return {
          success: true
        };
      } catch (error) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to subscribe email.' });
      }
    },
  }),
};