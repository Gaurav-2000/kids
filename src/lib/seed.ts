import { db } from './db';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create categories
    const categories = await Promise.all([
      db.category.upsert({
        where: { slug: 'co-ord-sets' },
        update: {},
        create: {
          name: 'Co-Ord Sets',
          slug: 'co-ord-sets',
          description: 'Matching top and bottom sets for kids'
        }
      }),
      db.category.upsert({
        where: { slug: 'shorts-sets' },
        update: {},
        create: {
          name: 'Shorts Sets',
          slug: 'shorts-sets',
          description: 'Comfortable shorts sets for summer'
        }
      }),
      db.category.upsert({
        where: { slug: 't-shirts' },
        update: {},
        create: {
          name: 'T-Shirts',
          slug: 't-shirts',
          description: 'Stylish t-shirts for kids'
        }
      }),
      db.category.upsert({
        where: { slug: 'dresses' },
        update: {},
        create: {
          name: 'Dresses',
          slug: 'dresses',
          description: 'Beautiful dresses for girls'
        }
      }),
      db.category.upsert({
        where: { slug: 'pajama-sets' },
        update: {},
        create: {
          name: 'Pajama Sets',
          slug: 'pajama-sets',
          description: 'Comfortable sleepwear for kids'
        }
      }),
      db.category.upsert({
        where: { slug: 'joggers' },
        update: {},
        create: {
          name: 'Joggers',
          slug: 'joggers',
          description: 'Active wear joggers for kids'
        }
      }),
      db.category.upsert({
        where: { slug: 'infant' },
        update: {},
        create: {
          name: 'Infant',
          slug: 'infant',
          description: 'Clothing for infants and toddlers'
        }
      })
    ]);

    console.log('✅ Categories created');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await db.user.upsert({
      where: { email: 'admin@littlestar.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@littlestar.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Tom and Jerry Co-Ord Set',
        slug: 'tom-and-jerry-co-ord-set',
        description: 'Comfortable and stylish Tom and Jerry themed co-ord set for kids',
        price: 899,
        salePrice: 699,
        images: JSON.stringify(['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Blue', 'Red']),
        stock: 50,
        categoryId: categories[0].id,
        featured: true
      },
      {
        name: 'Lion King Girls Shorts Set',
        slug: 'lion-king-girls-shorts-set',
        description: 'Beautiful Lion King themed shorts set for girls',
        price: 799,
        salePrice: 599,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Pink', 'Yellow']),
        stock: 30,
        categoryId: categories[1].id,
        featured: true
      },
      {
        name: 'Harry Potter T-Shirt',
        slug: 'harry-potter-t-shirt',
        description: 'Magical Harry Potter themed t-shirt for young wizards',
        price: 499,
        salePrice: 399,
        images: JSON.stringify(['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
        colors: JSON.stringify(['Black', 'Navy', 'Maroon']),
        stock: 75,
        categoryId: categories[2].id,
        featured: false
      },
      {
        name: 'Princess Dress',
        slug: 'princess-dress',
        description: 'Beautiful princess dress for special occasions',
        price: 1299,
        salePrice: 999,
        images: JSON.stringify(['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Pink', 'Purple', 'Blue']),
        stock: 25,
        categoryId: categories[3].id,
        featured: true
      },
      {
        name: 'Superhero Pajama Set',
        slug: 'superhero-pajama-set',
        description: 'Comfortable superhero themed pajama set for bedtime adventures',
        price: 699,
        salePrice: 549,
        images: JSON.stringify(['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Blue', 'Red', 'Black']),
        stock: 40,
        categoryId: categories[4].id,
        featured: false
      },
      {
        name: 'Active Joggers',
        slug: 'active-joggers',
        description: 'Comfortable joggers perfect for active kids',
        price: 599,
        salePrice: 449,
        images: JSON.stringify(['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
        colors: JSON.stringify(['Grey', 'Navy', 'Black']),
        stock: 60,
        categoryId: categories[5].id,
        featured: false
      },
      {
        name: 'Baby Romper Set',
        slug: 'baby-romper-set',
        description: 'Soft and comfortable romper set for infants',
        price: 799,
        salePrice: 599,
        images: JSON.stringify(['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M']),
        colors: JSON.stringify(['White', 'Pink', 'Blue']),
        stock: 35,
        categoryId: categories[6].id,
        featured: true
      },
      {
        name: 'Unicorn Party Dress',
        slug: 'unicorn-party-dress',
        description: 'Magical unicorn themed dress perfect for parties and special occasions',
        price: 1199,
        salePrice: 899,
        images: JSON.stringify(['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
        colors: JSON.stringify(['Pink', 'Purple', 'White']),
        stock: 30,
        categoryId: categories[3].id,
        featured: true
      },
      {
        name: 'Floral Summer Dress',
        slug: 'floral-summer-dress',
        description: 'Light and breezy floral dress perfect for summer days',
        price: 899,
        salePrice: 699,
        images: JSON.stringify(['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Yellow', 'Pink', 'Blue']),
        stock: 45,
        categoryId: categories[3].id,
        featured: false
      },
      {
        name: 'Disney Princess Belle Dress',
        slug: 'disney-princess-belle-dress',
        description: 'Beautiful Belle inspired dress from Beauty and the Beast',
        price: 1499,
        salePrice: 1199,
        images: JSON.stringify(['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Yellow', 'Gold']),
        stock: 20,
        categoryId: categories[3].id,
        featured: true
      },
      {
        name: 'Polka Dot Twirl Dress',
        slug: 'polka-dot-twirl-dress',
        description: 'Fun polka dot dress that twirls beautifully when spinning',
        price: 799,
        salePrice: 599,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Red', 'Navy', 'Pink']),
        stock: 40,
        categoryId: categories[3].id,
        featured: false
      },
      {
        name: 'Rainbow Tutu Dress',
        slug: 'rainbow-tutu-dress',
        description: 'Colorful rainbow tutu dress perfect for dance and play',
        price: 999,
        salePrice: 799,
        images: JSON.stringify(['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Rainbow', 'Pink Rainbow', 'Blue Rainbow']),
        stock: 25,
        categoryId: categories[3].id,
        featured: true
      },
      {
        name: 'Frozen Elsa Inspired Dress',
        slug: 'frozen-elsa-inspired-dress',
        description: 'Ice queen inspired dress with sparkly details',
        price: 1399,
        salePrice: 1099,
        images: JSON.stringify(['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Blue', 'Light Blue', 'Silver']),
        stock: 35,
        categoryId: categories[3].id,
        featured: true
      },
      {
        name: 'Casual Denim Dress',
        slug: 'casual-denim-dress',
        description: 'Comfortable denim dress perfect for everyday wear',
        price: 699,
        salePrice: 549,
        images: JSON.stringify(['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y']),
        colors: JSON.stringify(['Light Blue', 'Dark Blue']),
        stock: 50,
        categoryId: categories[3].id,
        featured: false
      },
      {
        name: 'Butterfly Garden Dress',
        slug: 'butterfly-garden-dress',
        description: 'Whimsical dress with beautiful butterfly and flower prints',
        price: 899,
        salePrice: 699,
        images: JSON.stringify(['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['2-3Y', '3-4Y', '4-5Y', '5-6Y']),
        colors: JSON.stringify(['Green', 'Pink', 'Purple']),
        stock: 30,
        categoryId: categories[3].id,
        featured: false
      },
      // Additional Infant Products
      {
        name: 'Tom and Jerry Half Sleeve Pajama Set for Infant',
        slug: 'tom-jerry-infant-pajama-set',
        description: 'Adorable Tom and Jerry themed pajama set for infants',
        price: 990,
        salePrice: 590,
        images: JSON.stringify(['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M', '12-18M']),
        colors: JSON.stringify(['Blue', 'Yellow', 'White']),
        stock: 45,
        categoryId: categories[6].id,
        featured: true
      },
      {
        name: 'Hello Kitty Classic Shorts Set For Infant',
        slug: 'hello-kitty-infant-shorts-set',
        description: 'Cute Hello Kitty shorts set perfect for summer',
        price: 850,
        salePrice: 650,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M']),
        colors: JSON.stringify(['Pink', 'White', 'Red']),
        stock: 35,
        categoryId: categories[6].id,
        featured: true
      },
      {
        name: 'Batman and Tom and Jerry Pajama Sets Pack Of 2 For Infant',
        slug: 'batman-tom-jerry-infant-pack',
        description: 'Value pack of 2 pajama sets featuring Batman and Tom & Jerry',
        price: 1080,
        salePrice: 890,
        images: JSON.stringify(['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M']),
        colors: JSON.stringify(['Black', 'Blue', 'Yellow']),
        stock: 25,
        categoryId: categories[6].id,
        featured: true
      },
      {
        name: 'Little Start Originals Shorts Sets Pack Of 3 For Infant',
        slug: 'little-start-infant-shorts-pack',
        description: 'Premium pack of 3 shorts sets in different colors',
        price: 1670,
        salePrice: 1290,
        images: JSON.stringify(['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M']),
        colors: JSON.stringify(['Multi', 'Pastel', 'Bright']),
        stock: 20,
        categoryId: categories[6].id,
        featured: true
      },
      {
        name: 'Hello Kitty and Paris Jogger Set Pack Of 2 For Infant',
        slug: 'hello-kitty-paris-infant-jogger-pack',
        description: 'Stylish jogger set pack with Hello Kitty and Paris themes',
        price: 1880,
        salePrice: 1690,
        images: JSON.stringify(['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M']),
        colors: JSON.stringify(['Pink', 'Purple', 'White']),
        stock: 30,
        categoryId: categories[6].id,
        featured: true
      },
      {
        name: 'Soft Cotton Onesie Set for Newborn',
        slug: 'soft-cotton-onesie-newborn',
        description: 'Ultra-soft cotton onesies perfect for newborns',
        price: 699,
        salePrice: 499,
        images: JSON.stringify(['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M']),
        colors: JSON.stringify(['White', 'Cream', 'Light Pink', 'Light Blue']),
        stock: 50,
        categoryId: categories[6].id,
        featured: false
      },
      {
        name: 'Animal Print Romper Collection',
        slug: 'animal-print-romper-collection',
        description: 'Adorable animal print rompers for active infants',
        price: 799,
        salePrice: 599,
        images: JSON.stringify(['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['3-6M', '6-9M', '9-12M', '12-18M']),
        colors: JSON.stringify(['Safari', 'Ocean', 'Forest']),
        stock: 40,
        categoryId: categories[6].id,
        featured: false
      },
      {
        name: 'Disney Baby Character Bodysuit Set',
        slug: 'disney-baby-bodysuit-set',
        description: 'Official Disney character bodysuits for little ones',
        price: 1299,
        salePrice: 999,
        images: JSON.stringify(['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center']),
        sizes: JSON.stringify(['0-3M', '3-6M', '6-9M', '9-12M']),
        colors: JSON.stringify(['Mickey', 'Minnie', 'Winnie']),
        stock: 35,
        categoryId: categories[6].id,
        featured: true
      }
    ];

    for (const productData of sampleProducts) {
      await db.product.upsert({
        where: { slug: productData.slug },
        update: {},
        create: productData
      });
    }

    console.log('✅ Sample products created');

    // Create a test user
    const testUserPassword = await bcrypt.hash('password123', 12);
    await db.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'test@example.com',
        password: testUserPassword,
        role: 'USER'
      }
    });

    console.log('✅ Test user created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log('Admin: admin@littlestar.com / admin123');
    console.log('Test User: test@example.com / password123');
    console.log('');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
