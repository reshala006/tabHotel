# Database Schema (PostgreSQL)

## Таблицы

### 1. Таблица `users`
Хранит учетные записи всех пользователей системы. Аутентификация осуществляется по email и паролю.
- `id` SERIAL PRIMARY KEY
- `email` VARCHAR(255) UNIQUE NOT NULL
- `password_hash` VARCHAR(255) NOT NULL
- `role` VARCHAR(50) NOT NULL CHECK (role IN ('guest', 'admin', 'maid', 'manager'))
- `first_name` VARCHAR(100) NOT NULL
- `last_name` VARCHAR(100) NOT NULL
- `phone_number` VARCHAR(20) NULL
- `created_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `updated_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

**Индексы:**
- INDEX `idx_users_email` (`email`)
- INDEX `idx_users_role` (`role`)

### 2. Таблица `room_types`
Справочник категорий номеров. Цена и описание задаются здесь.
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(100) NOT NULL (e.g., "Стандартный двухместный")
- `description` TEXT NULL
- `price_per_night` DECIMAL(10, 2) NOT NULL
- `capacity` INTEGER NOT NULL CHECK (capacity > 0)
- `amenities` TEXT[] NULL -- Массив удобств: ['Wi-Fi', 'TV', 'Кондиционер']
- `image_url` VARCHAR(255) NULL -- Ссылка на основное изображение типа номера
- `created_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

**Индексы:**
- INDEX `idx_room_types_name` (`name`)

### 3. Таблица `rooms`
Каталог всех физических номеров в гостинице.
- `id` SERIAL PRIMARY KEY
- `number` VARCHAR(10) UNIQUE NOT NULL (e.g., "101", "202A")
- `floor` INTEGER NOT NULL
- `room_type_id` INTEGER NOT NULL REFERENCES `room_types`(`id`) ON DELETE RESTRICT
- `status` VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'cleaning', 'maintenance'))
- `created_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

**Индексы:**
- INDEX `idx_rooms_number` (`number`)
- INDEX `idx_rooms_room_type_id` (`room_type_id`)
- INDEX `idx_rooms_status` (`status`)

### 4. Таблица `bookings`
Ядро системы. Хранит информацию о всех бронированиях.
- `id` SERIAL PRIMARY KEY
- `guest_id` INTEGER NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE
- `room_id` INTEGER NOT NULL REFERENCES `rooms`(`id`) ON DELETE RESTRICT
- `check_in_date` DATE NOT NULL
- `check_out_date` DATE NOT NULL
- `status` VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'))
- `total_price` DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0)
- `guest_data` JSONB NOT NULL DEFAULT '{}'::JSONB -- Снимок данных гостя на момент бронирования
- `notes` TEXT NULL -- Особые пожелания или заметки к брони
- `created_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `updated_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

**Индексы:**
- INDEX `idx_bookings_guest_id` (`guest_id`)
- INDEX `idx_bookings_room_id` (`room_id`)
- INDEX `idx_bookings_dates` (`check_in_date`, `check_out_date`)
- INDEX `idx_bookings_status` (`status`)
- INDEX `idx_bookings_guest_data` USING GIN (`guest_data`) -- Для быстрого поиска по JSON

### 5. Таблица `payments`
История всех платежей, привязанная к бронированиям.
- `id` SERIAL PRIMARY KEY
- `booking_id` INTEGER NOT NULL REFERENCES `bookings`(`id`) ON DELETE CASCADE
- `amount` DECIMAL(10, 2) NOT NULL CHECK (amount > 0)
- `status` VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
- `method` VARCHAR(50) NOT NULL CHECK (method IN ('card', 'cash'))
- `transaction_id` VARCHAR(255) NULL -- Идентификатор из внешней платежной системы
- `created_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

**Индексы:**
- INDEX `idx_payments_booking_id` (`booking_id`)
- INDEX `idx_payments_status` (`status`)
- INDEX `idx_payments_transaction_id` (`transaction_id`) WHERE transaction_id IS NOT NULL

### 6. Таблица `cleaning_logs`
Журнал уборки номеров. Новая запись может создаваться при смене статуса или ежедневно.
- `id` SERIAL PRIMARY KEY
- `room_id` INTEGER NOT NULL REFERENCES `rooms`(`id`) ON DELETE CASCADE
- `maid_id` INTEGER NULL REFERENCES `users`(`id`) ON DELETE SET NULL -- Горничная, отметившая статус
- `date` DATE NOT NULL DEFAULT CURRENT_DATE -- Дата, для которой актуален статус уборки
- `status` VARCHAR(50) NOT NULL CHECK (status IN ('clean', 'dirty', 'in_progress'))
- `notes` TEXT NULL -- Примечания (e.g., "Разбили стекло")
- `created_at` TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

**Индексы:**
- UNIQUE INDEX `uidx_cleaning_logs_room_date` (`room_id`, `date`) -- Одна запись на номер в день
- INDEX `idx_cleaning_logs_maid_id` (`maid_id`)
- INDEX `idx_cleaning_logs_status` (`status`)

## Основные связи (Relations)
1.  `users` (1) ──< `bookings` (*): Один пользователь может иметь много бронирований.
2.  `room_types` (1) ──< `rooms` (*): Один тип номера может быть присвоен многим номерам.
3.  `rooms` (1) ──< `bookings` (*): Один номер может быть в многих бронированиях (в разное время).
4.  `bookings` (1) ──< `payments` (*): Одно бронирование может иметь несколько платежей (предоплата, доплата).
5.  `rooms` (1) ──< `cleaning_logs` (*): Для одного номера много записей в журнале уборки.
6.  `users` (1) ──< `cleaning_logs` (*): Одна горничная может сделать много отметок об уборке.