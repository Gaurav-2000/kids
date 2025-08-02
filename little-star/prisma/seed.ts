import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Co-Ord Sets',
        slug: 'co-ord-sets',
        description: 'Comfortable and stylish co-ordinated sets for kids',
        image: '/images/categories/co-ord-sets.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Shorts Sets',
        slug: 'shorts-sets',
        description: 'Perfect summer shorts sets for active kids',
        image: '/images/categories/shorts-sets.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'T-Shirts',
        slug: 't-shirts',
        description: 'Fun and comfortable t-shirts with favorite characters',
        image: '/images/categories/t-shirts.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Pajama Sets',
        slug: 'pajama-sets',
        description: 'Cozy pajama sets for comfortable sleep',
        image: '/images/categories/pajama-sets.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Dresses',
        slug: 'dresses',
        description: 'Beautiful dresses for special occasions',
        image: '/images/categories/dresses.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Joggers',
        slug: 'joggers',
        description: 'Comfortable joggers for active play',
        image: '/images/categories/joggers.jpg'
      }
    })
  ]);

  // Create products
  const products = [
    {
      name: 'Tom and Jerry High Five Co-Ord Set',
      slug: 'tom-and-jerry-high-five-co-ord-set',
      description: 'Comfortable co-ord set featuring Tom and Jerry characters in a fun high-five design',
      price: 990,
      images: JSON.stringify(['/images/products/tom-jerry-1.jpg', '/images/products/tom-jerry-1-alt.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
      colors: JSON.stringify(['Blue', 'Red']),
      stock: 25,
      featured: true,
      categoryId: categories[0].id
    },
    {
      name: 'Lion King Girls Shorts Set',
      slug: 'lion-king-girls-shorts-set',
      description: 'Beautiful Lion King themed shorts set perfect for summer adventures',
      price: 990,
      images: JSON.stringify(['/images/products/lion-king-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
      colors: JSON.stringify(['Pink', 'Yellow']),
      stock: 18,
      featured: true,
      categoryId: categories[1].id
    },
    {
      name: 'Quidditch 07 Harry Potter T-Shirt',
      slug: 'quidditch-07-harry-potter-t-shirt',
      description: 'Official Harry Potter Quidditch themed t-shirt for young wizards',
      price: 650,
      images: JSON.stringify(['/images/products/harry-potter-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
      colors: JSON.stringify(['Maroon', 'Black']),
      stock: 30,
      featured: true,
      categoryId: categories[2].id
    },
    {
      name: 'Pikachu I Choose You Pajama Set',
      slug: 'pikachu-i-choose-you-pajama-set',
      description: 'Comfortable Pokemon Pikachu pajama set for cozy nights',
      price: 1049,
      salePrice: 990,
      images: JSON.stringify(['/images/products/pikachu-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
      colors: JSON.stringify(['Yellow', 'Blue']),
      stock: 22,
      featured: true,
      categoryId: categories[3].id
    },
    {
      name: 'Smiley World Colourblock Heart Girls Co-Ord Set',
      slug: 'smiley-world-colourblock-heart-girls-co-ord-set',
      description: 'Cheerful Smiley World co-ord set with colorblock heart design',
      price: 1290,
      images: JSON.stringify(['/images/products/smiley-world-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
      colors: JSON.stringify(['Pink', 'Purple', 'Blue']),
      stock: 15,
      featured: true,
      categoryId: categories[0].id
    },
    {
      name: 'Chase Raglan Jogger Set',
      slug: 'chase-raglan-jogger-set',
      description: 'Paw Patrol Chase themed jogger set for active adventures',
      price: 1049,
      images: JSON.stringify(['/images/products/paw-patrol-chase-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
      colors: JSON.stringify(['Blue', 'Navy']),
      stock: 20,
      featured: true,
      categoryId: categories[5].id
    },
    {
      name: 'Batman Iconic Co-Ord Set',
      slug: 'batman-iconic-co-ord-set',
      description: 'Classic Batman themed co-ord set for little superheroes',
      price: 1290,
      images: JSON.stringify(['/images/products/batman-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
      colors: JSON.stringify(['Black', 'Grey']),
      stock: 12,
      featured: false,
      categoryId: categories[0].id
    },
    {
      name: 'Hello Kitty Classic Shorts Set',
      slug: 'hello-kitty-classic-shorts-set',
      description: 'Adorable Hello Kitty shorts set for sweet little ones',
      price: 850,
      images: JSON.stringify(['/images/products/hello-kitty-1.jpg']),
      sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
      colors: JSON.stringify(['Pink', 'White']),
      stock: 28,
      featured: false,
      categoryId: categories[1].id
    }
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: productData
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
