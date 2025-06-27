import { PrismaClient } from '@prisma/client';
import { getExternalDbConnection } from '../src/config/database';
import { makeDjangoPasswordHash } from '../src/utils/django-auth';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  const userData = {
    username: 'admin_carrotaller',
    password: 'admin_carrotaller2025*',
    firstName: 'Admin',
    lastName: 'Carrotaller',
    email: 'admin@carrotaller.com',
    isActive: true,
    isStaff: true,
    isSuperuser: false
  };

  console.log('🚀 Iniciando creación del usuario admin_carrotaller...');

  try {
    // 1. Verificar que el usuario no exista en ninguna de las dos bases
    console.log('📋 Verificando si el usuario ya existe...');
    
    const existingInSSO = await prisma.user.findFirst({
      where: { 
        OR: [
          { username: userData.username },
          { email: userData.email }
        ]
      }
    });

    if (existingInSSO) {
      console.log(`❌ Usuario ${userData.username} ya existe en base de datos SSO`);
      return;
    }

    const pool = await getExternalDbConnection();
    const [existingExternal] = await pool.execute(
      'SELECT id, username FROM auth_user WHERE username = ? OR email = ?',
      [userData.username, userData.email]
    );

    if (Array.isArray(existingExternal) && existingExternal.length > 0) {
      console.log(`✅ Usuario ${userData.username} ya existe en base de datos externa`);
      console.log('📝 Procediendo a crear/verificar en base de datos SSO...');
      
      // Obtener el ID del usuario externo existente
      const existingExternalUser = existingExternal[0] as any;
      const externalUserId = existingExternalUser.id;
      
      // Crear usuario en base de datos SSO
      console.log('💾 Creando usuario en base de datos SSO...');
      const hashedPasswordSSO = await bcrypt.hash(userData.password, 12);

      const ssoUser = await prisma.user.create({
        data: {
          username: userData.username,
          password: hashedPasswordSSO,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          externalId: externalUserId,
          isActive: userData.isActive,
          isVerified: true,
          role: userData.isSuperuser ? 'SUPER_ADMIN' : (userData.isStaff ? 'ADMIN' : 'USER'),
        }
      });

      console.log(`✅ Usuario creado en base SSO con ID: ${ssoUser.id}`);

      // Asignar aplicaciones al usuario
      await assignDefaultApplications(ssoUser.id);

      console.log('\n🎉 ¡Usuario admin_carrotaller sincronizado exitosamente!');
      console.log('📋 Detalles del usuario:');
      console.log(`   Username: ${userData.username}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Rol: ${ssoUser.role}`);
      console.log(`   ID SSO: ${ssoUser.id}`);
      console.log(`   ID Externo: ${externalUserId}`);
      console.log('\n✅ El usuario puede ahora hacer login en el sistema');
      
      return;
    }

    console.log('✅ Usuario no existe en ninguna base, procediendo a crear...');

    // 2. Crear hash de Django para la contraseña
    console.log('🔐 Generando hash de Django para la contraseña...');
    const djangoHash = makeDjangoPasswordHash(userData.password);
    console.log(`📝 Hash Django generado: ${djangoHash.substring(0, 50)}...`);

    // 3. Crear usuario en base de datos externa (auth_user)
    console.log('💾 Creando usuario en base de datos externa...');
    const [result] = await pool.execute(
      `INSERT INTO auth_user (
        username, password, first_name, last_name, email, 
        is_active, is_staff, is_superuser, date_joined
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        userData.username, 
        djangoHash, 
        userData.firstName, 
        userData.lastName, 
        userData.email, 
        userData.isActive ? 1 : 0, 
        userData.isStaff ? 1 : 0, 
        userData.isSuperuser ? 1 : 0
      ]
    );

    const externalUserId = (result as any).insertId;
    console.log(`✅ Usuario creado en base externa con ID: ${externalUserId}`);

    // 4. Crear usuario en base de datos SSO
    console.log('💾 Creando usuario en base de datos SSO...');
    const hashedPasswordSSO = await bcrypt.hash(userData.password, 12);

    const ssoUser = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPasswordSSO,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        externalId: externalUserId,
        isActive: userData.isActive,
        isVerified: true,
        role: userData.isSuperuser ? 'SUPER_ADMIN' : (userData.isStaff ? 'ADMIN' : 'USER'),
      }
    });

    console.log(`✅ Usuario creado en base SSO con ID: ${ssoUser.id}`);

    // 5. Crear aplicaciones por defecto si no existen
    console.log('📱 Verificando aplicaciones por defecto...');
    const applications = [
      {
        name: 'Inspecciones',
        description: 'Sistema de gestión de inspecciones',
        url: '/inspecciones',
        category: 'Operaciones',
        order: 1
      },
      {
        name: 'Carrotaller',
        description: 'Sistema de gestión de taller vehicular',
        url: '/carrotaller',
        category: 'Mantenimiento',
        order: 2
      },
      {
        name: 'Control de Activos',
        description: 'Sistema de control y gestión de activos',
        url: '/activos',
        category: 'Inventario',
        order: 3
      }
    ];

    for (const app of applications) {
      const existing = await prisma.application.findFirst({
        where: { name: app.name }
      });

      if (!existing) {
        await prisma.application.create({
          data: app
        });
        console.log(`✅ Aplicación "${app.name}" creada`);
      } else {
        console.log(`📱 Aplicación "${app.name}" ya existe`);
      }
    }

    // 6. Asignar aplicaciones al usuario
    console.log('🔗 Asignando aplicaciones al usuario...');
    const allApps = await prisma.application.findMany({
      where: {
        name: {
          in: ['Inspecciones', 'Carrotaller', 'Control de Activos']
        }
      }
    });

    for (const app of allApps) {
      const existing = await prisma.userApplication.findFirst({
        where: {
          userId: ssoUser.id,
          applicationId: app.id
        }
      });

      if (!existing) {
        await prisma.userApplication.create({
          data: {
            userId: ssoUser.id,
            applicationId: app.id,
            isFavorite: app.name === 'Carrotaller' // Marcar Carrotaller como favorito
          }
        });
        console.log(`✅ Aplicación "${app.name}" asignada al usuario`);
      }
    }

    console.log('\n🎉 ¡Usuario admin_carrotaller creado exitosamente!');
    console.log('📋 Detalles del usuario:');
    console.log(`   Username: ${userData.username}`);
    console.log(`   Password: ${userData.password}`);
    console.log(`   Email: ${userData.email}`);
    console.log(`   Rol: ${ssoUser.role}`);
    console.log(`   ID SSO: ${ssoUser.id}`);
    console.log(`   ID Externo: ${externalUserId}`);
    console.log('\n✅ El usuario puede ahora hacer login en el sistema');

  } catch (error) {
    console.error('❌ Error creando usuario:', error);
    
    // Mostrar información de diagnóstico
    console.log('\n🔍 Información de diagnóstico:');
    console.log('- Verifica que ambas bases de datos estén accesibles');
    console.log('- Revisa las credenciales de conexión');
    console.log('- Asegúrate de que las tablas existan');
    
  } finally {
    await prisma.$disconnect();
  }
}

// Función para asignar aplicaciones por defecto
async function assignDefaultApplications(userId: string) {
  console.log('📱 Verificando aplicaciones por defecto...');
  const applications = [
    {
      name: 'Inspecciones',
      description: 'Sistema de gestión de inspecciones',
      url: '/inspecciones',
      category: 'Operaciones',
      order: 1
    },
    {
      name: 'Carrotaller',
      description: 'Sistema de gestión de taller vehicular',
      url: '/carrotaller',
      category: 'Mantenimiento',
      order: 2
    },
    {
      name: 'Control de Activos',
      description: 'Sistema de control y gestión de activos',
      url: '/activos',
      category: 'Inventario',
      order: 3
    }
  ];

  for (const app of applications) {
    const existing = await prisma.application.findFirst({
      where: { name: app.name }
    });

    if (!existing) {
      await prisma.application.create({
        data: app
      });
      console.log(`✅ Aplicación "${app.name}" creada`);
    } else {
      console.log(`📱 Aplicación "${app.name}" ya existe`);
    }
  }

  console.log('🔗 Asignando aplicaciones al usuario...');
  const allApps = await prisma.application.findMany({
    where: {
      name: {
        in: ['Inspecciones', 'Carrotaller', 'Control de Activos']
      }
    }
  });

  for (const app of allApps) {
    const existing = await prisma.userApplication.findFirst({
      where: {
        userId: userId,
        applicationId: app.id
      }
    });

    if (!existing) {
      await prisma.userApplication.create({
        data: {
          userId: userId,
          applicationId: app.id,
          isFavorite: app.name === 'Carrotaller' // Marcar Carrotaller como favorito
        }
      });
      console.log(`✅ Aplicación "${app.name}" asignada al usuario`);
    }
  }
}

// Ejecutar el script
createAdminUser(); 