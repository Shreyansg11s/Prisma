-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "status_Id" SERIAL NOT NULL,
    "task_status" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("status_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_task_status_key" ON "Status"("task_status");
