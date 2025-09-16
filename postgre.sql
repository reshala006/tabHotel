CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "role" varchar(50) NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "phone_number" varchar(20),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "room_types" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "description" text,
  "price_per_night" decimal(10,2) NOT NULL,
  "capacity" integer NOT NULL,
  "amenities" text[],
  "image_url" varchar(255),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "rooms" (
  "id" SERIAL PRIMARY KEY,
  "number" varchar(10) UNIQUE NOT NULL,
  "floor" integer NOT NULL,
  "room_type_id" integer NOT NULL,
  "status" varchar(50) DEFAULT 'available',
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "bookings" (
  "id" SERIAL PRIMARY KEY,
  "guest_id" integer NOT NULL,
  "room_id" integer NOT NULL,
  "check_in_date" date NOT NULL,
  "check_out_date" date NOT NULL,
  "status" varchar(50) DEFAULT 'pending',
  "total_price" decimal(10,2) NOT NULL,
  "guest_data" jsonb NOT NULL DEFAULT '{}',
  "notes" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "booking_id" integer NOT NULL,
  "amount" decimal(10,2) NOT NULL,
  "status" varchar(50) DEFAULT 'pending',
  "method" varchar(50) NOT NULL,
  "transaction_id" varchar(255),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "cleaning_logs" (
  "id" SERIAL PRIMARY KEY,
  "room_id" integer NOT NULL,
  "maid_id" integer,
  "date" date NOT NULL DEFAULT (CURRENT_DATE),
  "status" varchar(50) NOT NULL,
  "notes" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX "idx_users_email" ON "users" ("email");

CREATE INDEX "idx_users_role" ON "users" ("role");

CREATE INDEX "idx_room_types_name" ON "room_types" ("name");

CREATE INDEX "idx_rooms_number" ON "rooms" ("number");

CREATE INDEX "idx_rooms_room_type_id" ON "rooms" ("room_type_id");

CREATE INDEX "idx_rooms_status" ON "rooms" ("status");

CREATE INDEX "idx_bookings_guest_id" ON "bookings" ("guest_id");

CREATE INDEX "idx_bookings_room_id" ON "bookings" ("room_id");

CREATE INDEX "idx_bookings_dates" ON "bookings" ("check_in_date", "check_out_date");

CREATE INDEX "idx_bookings_status" ON "bookings" ("status");

CREATE INDEX "idx_bookings_guest_data" ON "bookings" USING GIN ("guest_data");

CREATE INDEX "idx_payments_booking_id" ON "payments" ("booking_id");

CREATE INDEX "idx_payments_status" ON "payments" ("status");

CREATE INDEX "idx_payments_transaction_id" ON "payments" ("transaction_id");

CREATE UNIQUE INDEX "uidx_cleaning_logs_room_date" ON "cleaning_logs" ("room_id", "date");

CREATE INDEX "idx_cleaning_logs_maid_id" ON "cleaning_logs" ("maid_id");

CREATE INDEX "idx_cleaning_logs_status" ON "cleaning_logs" ("status");

COMMENT ON COLUMN "users"."role" IS 'guest, admin, maid, manager';

COMMENT ON COLUMN "room_types"."amenities" IS 'Array of amenities: Wi-Fi, TV, etc.';

COMMENT ON COLUMN "rooms"."status" IS 'available, occupied, cleaning, maintenance';

COMMENT ON COLUMN "bookings"."status" IS 'pending, confirmed, checked_in, checked_out, cancelled';

COMMENT ON COLUMN "bookings"."guest_data" IS 'Snapshot of guest details at booking time';

COMMENT ON COLUMN "payments"."status" IS 'pending, completed, failed, refunded';

COMMENT ON COLUMN "payments"."method" IS 'card, cash';

COMMENT ON COLUMN "cleaning_logs"."status" IS 'clean, dirty, in_progress';

ALTER TABLE "rooms" ADD FOREIGN KEY ("room_type_id") REFERENCES "room_types" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("guest_id") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id");

ALTER TABLE "cleaning_logs" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");

ALTER TABLE "cleaning_logs" ADD FOREIGN KEY ("maid_id") REFERENCES "users" ("id");
