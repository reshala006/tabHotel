import { prisma } from "../utils/prisma"
import { hashPassword } from "../utils/auth"

async function seed() {
    try {
        console.log("Seeding database...")

        // Очищаем существующие данные
        await prisma.user.deleteMany()

        // Создаем тестовых пользователей
        const users = await Promise.all([
            // Администратор
            prisma.user.create({
                data: {
                    email: "admin@hotel.com",
                    password_hash: await hashPassword("admin123"),
                    first_name: "Иван",
                    last_name: "Петров",
                    role: "admin",
                    phone_number: "+79161234567",
                },
            }),
            // Горничная
            prisma.user.create({
                data: {
                    email: "maid@hotel.com",
                    password_hash: await hashPassword("maid123"),
                    first_name: "Мария",
                    last_name: "Сидорова",
                    role: "maid",
                    phone_number: "+79161234568",
                },
            }),
            // Гость
            prisma.user.create({
                data: {
                    email: "guest@mail.ru",
                    password_hash: await hashPassword("guest123"),
                    first_name: "Алексей",
                    last_name: "Иванов",
                    role: "guest",
                    phone_number: "+79161234569",
                },
            }),
        ])

        console.log("Seed completed successfully!")
        console.log("Created users:")
        users.forEach((user) => {
            console.log(`- ${user.email} (${user.role})`)
        })
    } catch (error) {
        console.error("Seed failed:", error)
    } finally {
        await prisma.$disconnect()
    }
}

seed()
