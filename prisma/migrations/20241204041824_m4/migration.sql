/*
  Warnings:

  - You are about to drop the column `task_status_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `task_status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_task_status_id_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "task_status_id",
ADD COLUMN     "task_status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Status";
