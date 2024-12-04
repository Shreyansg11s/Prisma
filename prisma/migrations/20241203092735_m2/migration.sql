/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status_Id` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `task_status` on the `Status` table. All the data in the column will be lost.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Status_task_status_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "categoryName",
DROP COLUMN "createdDate",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "status_Id",
DROP COLUMN "task_status",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "task_status_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_status_id_fkey" FOREIGN KEY ("task_status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
