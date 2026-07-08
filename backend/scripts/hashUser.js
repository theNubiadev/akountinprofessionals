// const bcrypt = require("bcrypt");
// const { PrismaClient } = require("@prisma/client");
// const { withAccelerate } = require("@prisma/extension-accelerate");

// const prisma = new PrismaClient().$extends(withAccelerate());

// async function fix() {
//   const hash = await bcrypt.hash("Here@Akountinpro", 10);

//   await prisma.adminUser.update({
//     where: { email: "info@akountinprofessionals.co.uk" },
//     data:  { passwordHash: hash },
//   });

//   console.log("Password hashed and updated successfully.");
//   await prisma.$disconnect();
// }

// fix().catch(console.error);


// SMTP_USER="info@akountinprofessionals.co.uk"
// SMTP_PASS="$1*2{LGi@kykCEWi"


// SMTP_PASS="GodlinessIsAwesome"
// SMPT_USER="contact@akountinprofessional.co.uk"
// CLIENT_ORIGIN='http://localhost:8080'
// ANTHROPIC_API_KEY='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'
// # DATABASE_URL="postgresql://myuser:Irewamiri@localhost:5432/akountin_blog"
// DATABASE_URL="postgres://835128f4f5680c8a2df8897af9e20585ea391c9e106d11a000834ea2109f5fde:sk_rNUWX04CqdNZgbnNrg9Kt@pooled.db.prisma.io:5432/postgres?sslmode=require"

// BASE_PATH='http://localhost:8080'


// EDITOR: $2b$10$xMj/cja60s2n1SKncNC9a.XOyeI7UPDMiW.qBhcoKZ2SS/TKBQ.NG
// ADMIN: $2b$10$2Bn2m0GYVRR47hkNE1ygEOONS36jbcItkgJAuVbe3kMf9stf0h9Fa
// UPDATE admin_users SET password_hash = '$2b$10$xMj/cja60s2n1SKncNC9a.XOyeI7UPDMiW.qBhcoKZ2SS/TKBQ.NG' WHERE email = 'editor@akountinprofessionals.co.uk';
// UPDATE admin_users SET password_hash = '$2b$10$2Bn2m0GYVRR47hkNE1ygEOONS36jbcItkgJAuVbe3kMf9stf0h9Fa' WHERE email = 'admin@akountinprofessionals.co.uk';
// \q