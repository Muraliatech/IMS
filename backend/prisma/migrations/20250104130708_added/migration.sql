-- CreateTable
CREATE TABLE "QualityControl" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "sampleDetails" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "QualityControl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QualityControl" ADD CONSTRAINT "QualityControl_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
