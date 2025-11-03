/*
  Warnings:

  - A unique constraint covering the columns `[room_id,date]` on the table `cleaning_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."cleaning_logs" DROP CONSTRAINT "cleaning_logs_room_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "cleaning_logs_room_id_date_key" ON "public"."cleaning_logs"("room_id", "date");

-- AddForeignKey
ALTER TABLE "public"."cleaning_logs" ADD CONSTRAINT "cleaning_logs_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
