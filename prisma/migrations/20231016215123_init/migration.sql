-- CreateTable
CREATE TABLE "MovieID" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "MovieID_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieID_id_key" ON "MovieID"("id");
