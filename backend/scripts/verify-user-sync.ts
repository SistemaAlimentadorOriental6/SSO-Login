import { PrismaClient } from '@prisma/client';
import { getExternalDbConnection } from '../src/config/database';

const prisma = new PrismaClient();

async function verifyUserSync(username: string) {
  console.log(`🔍 Verificando sincronización del usuario: ${username}`);

  try {
    // 1. Buscar en base de datos SSO
    console.log('📋 Consultando base de datos SSO...');
    const ssoUser = await prisma.user.findFirst({
      where: { 
        OR: [
          { username: username },
          { email: username }
        ]
      },
      include: {
        applications: {
          include: {
            application: true
          }
        }
      }
    });

    // 2. Buscar en base de datos externa
    console.log('📋 Consultando base de datos externa...');
    const pool = await getExternalDbConnection();
    const [externalRows] = await pool.execute(
      'SELECT id, username, first_name, last_name, email, is_active, is_staff, is_superuser, password FROM auth_user WHERE username = ? OR email = ?',
      [username, username]
    );

    const externalUser = Array.isArray(externalRows) && externalRows.length > 0 ? externalRows[0] as any : null;

    // 3. Mostrar resultados
    console.log('\n📊 RESULTADOS DE VERIFICACIÓN');
    console.log('=' .repeat(50));

    if (!ssoUser && !externalUser) {
      console.log('❌ Usuario NO EXISTE en ninguna base de datos');
      return;
    }

    if (!ssoUser) {
      console.log('❌ Usuario NO EXISTE en base de datos SSO');
      console.log('📝 Datos en base externa:');
      console.log(`   ID: ${externalUser.id}`);
      console.log(`   Username: ${externalUser.username}`);
      console.log(`   Email: ${externalUser.email}`);
      console.log(`   Activo: ${externalUser.is_active ? 'Sí' : 'No'}`);
      console.log('\n⚠️  ACCIÓN REQUERIDA: Crear usuario en base SSO');
      return;
    }

    if (!externalUser) {
      console.log('❌ Usuario NO EXISTE en base de datos externa');
      console.log('📝 Datos en base SSO:');
      console.log(`   ID: ${ssoUser.id}`);
      console.log(`   Username: ${ssoUser.username}`);
      console.log(`   Email: ${ssoUser.email}`);
      console.log(`   Activo: ${ssoUser.isActive ? 'Sí' : 'No'}`);
      console.log('\n⚠️  ACCIÓN REQUERIDA: Crear usuario en base externa');
      return;
    }

    // 4. Verificar sincronización
    console.log('✅ Usuario EXISTE en ambas bases de datos');
    console.log('\n📝 COMPARACIÓN DE DATOS:');
    console.log('-'.repeat(30));

    // Verificar datos básicos
    const dataSync = {
      username: ssoUser.username === externalUser.username,
      firstName: ssoUser.firstName === externalUser.first_name,
      lastName: ssoUser.lastName === externalUser.last_name,
      email: ssoUser.email === externalUser.email,
      externalId: ssoUser.externalId === externalUser.id,
      active: ssoUser.isActive === (externalUser.is_active === 1)
    };

    console.log(`Username: ${ssoUser.username} | ${externalUser.username} | ${dataSync.username ? '✅' : '❌'}`);
    console.log(`Nombre: ${ssoUser.firstName} | ${externalUser.first_name} | ${dataSync.firstName ? '✅' : '❌'}`);
    console.log(`Apellido: ${ssoUser.lastName} | ${externalUser.last_name} | ${dataSync.lastName ? '✅' : '❌'}`);
    console.log(`Email: ${ssoUser.email} | ${externalUser.email} | ${dataSync.email ? '✅' : '❌'}`);
    console.log(`ID Externo: ${ssoUser.externalId} | ${externalUser.id} | ${dataSync.externalId ? '✅' : '❌'}`);
    console.log(`Activo: ${ssoUser.isActive} | ${externalUser.is_active === 1} | ${dataSync.active ? '✅' : '❌'}`);

    const allSynced = Object.values(dataSync).every(Boolean);

    if (allSynced) {
      console.log('\n🎉 DATOS SINCRONIZADOS CORRECTAMENTE');
    } else {
      console.log('\n⚠️  DATOS NO SINCRONIZADOS - Revisar diferencias');
    }

    // 5. Verificar aplicaciones asignadas
    console.log('\n📱 APLICACIONES ASIGNADAS:');
    console.log('-'.repeat(30));
    if (ssoUser.applications.length > 0) {
      ssoUser.applications.forEach(userApp => {
        const fav = userApp.isFavorite ? '⭐' : '  ';
        console.log(`${fav} ${userApp.application.name} (${userApp.application.category})`);
      });
    } else {
      console.log('❌ Sin aplicaciones asignadas');
    }

    // 6. Verificar contraseña (solo si se proporciona)
    console.log('\n🔐 VERIFICACIÓN DE CONTRASEÑA:');
    console.log('-'.repeat(30));
    console.log('📝 Para verificar la contraseña, proporciona la contraseña en texto plano');
    console.log(`📝 Hash en base externa: ${externalUser.password.substring(0, 50)}...`);

    console.log('\n📋 RESUMEN:');
    console.log(`✅ Usuario existe en ambas bases: SÍ`);
    console.log(`${allSynced ? '✅' : '❌'} Datos sincronizados: ${allSynced ? 'SÍ' : 'NO'}`);
    console.log(`✅ Aplicaciones asignadas: ${ssoUser.applications.length}`);

  } catch (error) {
    console.error('❌ Error verificando sincronización:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Obtener username desde argumentos de línea de comandos
const username = process.argv[2];

if (!username) {
  console.log('❌ Por favor proporciona un username:');
  console.log('   npm run verify-user admin_carrotaller');
  console.log('   o');
  console.log('   npx ts-node scripts/verify-user-sync.ts admin_carrotaller');
} else {
  verifyUserSync(username);
} 