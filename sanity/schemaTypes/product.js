import { defineType, defineField } from 'sanity'

/**
 * Product schema — the e-commerce content model.
 *
 * This is what you (or the client) edit in the Sanity Studio to add and
 * manage products. Every field here maps to something the storefront and
 * Snipcart need:
 *
 *   - name, slug      → display + the product's URL (/product/[slug])
 *   - price           → what Snipcart charges (and validates against)
 *   - compareAtPrice  → optional "was" price for sale display
 *   - category        → for the shop filter
 *   - images          → gallery
 *   - inStock         → toggle availability
 *
 * The slug is critical: it becomes the product's page URL, which is the
 * server-rendered page Snipcart crawls to validate the price. That's what
 * makes checkout work (and what an SPA couldn't provide).
 */
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Becomes the product URL: /product/your-slug',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      description: 'The amount Snipcart charges. Plain number, no currency symbol.',
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare-at Price (optional)',
      type: 'number',
      description: 'Original price, shown struck-through for sales. Leave empty if not on sale.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Fashion', 'Electronics', 'Home & Living', 'Beauty', 'Sports', 'Toys & Kids'],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error('Add at least one image'),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Home',
      type: 'boolean',
      initialValue: false,
      description: 'Show this product in the Featured section on the home page.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'images.0' },
  },
})
