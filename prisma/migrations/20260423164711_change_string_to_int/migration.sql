ALTER TABLE "public"."rooms" 
  ALTER COLUMN "number" TYPE INTEGER 
  USING (number::integer);

