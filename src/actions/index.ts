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
