require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'novamarket',
});

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Categorías
    const categories = [
      { name: 'Accesorios' },
      { name: 'Periféricos' },
      { name: 'Gadgets' },
    ];
    for (const c of categories) {
      await client.query(
        'INSERT INTO categories (name) VALUES ($1) ON CONFLICT DO NOTHING',
        [c.name]
      );
    }

    // Usuario admin (con campos demográficos)
    const adminPassword = await bcrypt.hash('admin123', 10);
    await client.query(
      `INSERT INTO users (name, email, password, role, gender, birth_date, province) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       ON CONFLICT (email) DO NOTHING`,
      ['Administrador', 'admin@novamarket.com', adminPassword, 'admin', 'Masculino', '1985-01-15', 'Buenos Aires']
    );

    // Usuario cliente de prueba (con campos demográficos)
    const clientPassword = await bcrypt.hash('cliente123', 10);
    await client.query(
      `INSERT INTO users (name, email, password, role, gender, birth_date, province) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       ON CONFLICT (email) DO NOTHING`,
      ['Cliente Prueba', 'cliente@novamarket.com', clientPassword, 'customer', 'Femenino', '1990-05-20', 'Córdoba']
    );

    // Obtener IDs de categorías
    const catResult = await client.query('SELECT id, name FROM categories');
    const catMap = {};
    catResult.rows.forEach(c => { catMap[c.name.toLowerCase()] = c.id; });

    // Productos de ejemplo (con color y brand)
    const products = [
      { name: 'Mouse Inalámbrico Ergonómico', description: 'Mouse silencioso con conexión inalámbrica 2.4G', price: 15.99, stock: 50, category: 'periféricos', color: 'Negro', brand: 'Logitech', image: 'https://via.placeholder.com/300x300?text=Mouse' },
      { name: 'Teclado Mecánico RGB', description: 'Teclado mecánico con retroiluminación RGB y switches azules', price: 45.00, stock: 30, category: 'periféricos', color: 'Negro', brand: 'Razer', image: 'https://via.placeholder.com/300x300?text=Teclado' },
      { name: 'Auriculares con Micrófono', description: 'Auriculares over-ear con micrófono integrado para gaming', price: 29.99, stock: 40, category: 'accesorios', color: 'Negro', brand: 'HyperX', image: 'https://via.placeholder.com/300x300?text=Auriculares' },
      { name: 'Hub USB-C 7 en 1', description: 'Adaptador multi-puerto con HDMI, USB 3.0 y lectora de tarjetas', price: 35.50, stock: 25, category: 'accesorios', color: 'Gris', brand: 'Anker', image: 'https://via.placeholder.com/300x300?text=Hub+USB' },
      { name: 'Smartwatch Deportivo', description: 'Reloj inteligente con monitor de frecuencia cardíaca y GPS', price: 79.99, stock: 20, category: 'gadgets', color: 'Azul', brand: 'Xiaomi', image: 'https://via.placeholder.com/300x300?text=Smartwatch' },
      { name: 'Batería Portátil 20000mAh', description: 'Power bank de carga rápida con 2 puertos USB', price: 24.99, stock: 60, category: 'accesorios', color: 'Blanco', brand: 'Samsung', image: 'https://via.placeholder.com/300x300?text=Bateria' },
    ];

    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, description, price, stock, category_id, color, brand, image_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [p.name, p.description, p.price, p.stock, catMap[p.category], p.color, p.brand, p.image]
      );
    }

    await client.query('COMMIT');
    console.log('✅ Seed completado: categorías, usuarios con datos demográficos y productos con matriz de datos insertados');
    console.log('🔑 Admin: admin@novamarket.com / admin123');
    console.log('👤 Cliente: cliente@novamarket.com / cliente123');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

seed();