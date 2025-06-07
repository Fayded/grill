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