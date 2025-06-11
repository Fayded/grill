<<<<<<< Updated upstream
import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';

export const server = {
  send: defineAction({
    accept: 'form',
    handler: async () => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['kevin.d.fay@gmail.com'],
        subject: 'Hello world',
        html: '<strong>It works!</strong>',
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }
      return data;
    },
  }),
};
=======
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  getGreeting: defineAction({
    input: z.object({
      name: z.string().min(1, 'Name is required'),
      street: z.string().min(1, 'Street Address is required'),
      email: z.string().email('Valid email required'),
      city: z.string().min(1, 'City is required'),
      zip: z.string().min(1, 'Zip is required'),
      date: z.string().optional(),
      time: z.string().optional(),
      phone: z.string().min(6, 'Phone number is required'),
      people: z.coerce.number().min(1, 'Number of people is required'),
      service: z.enum(['pickup', 'delivered', 'catered']),
      order: z.string().min(1, 'Order details are required'),
      requests: z.string().optional(),
    }),
    handler: async (input) => {
      return `Hello, ${input.name}!`
    }
  })
}
>>>>>>> Stashed changes
