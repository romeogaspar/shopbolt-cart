import { defineType, defineField } from 'sanity'

/**
 * Review schema — customer product reviews.
 *
 * Submitted via the storefront's /api/reviews route (server-side, using a
 * write-capable Sanity token) with approved defaulting to false. A reviewer
 * only appears on the storefront once someone flips `approved` to true here
 * in the Studio — this is the moderation queue.
 */
export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Reviewer name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Reviewer email',
      type: 'string',
      description: 'Not shown publicly. For moderation contact only.',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved reviews are shown on the storefront.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted at',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'name', rating: 'rating', approved: 'approved', productName: 'product.name' },
    prepare({ title, rating, approved, productName }) {
      return {
        title: `${title} — ${'★'.repeat(rating || 0)}`,
        subtitle: `${productName || 'Unknown product'} · ${approved ? 'Approved' : 'Pending'}`,
      }
    },
  },
})
