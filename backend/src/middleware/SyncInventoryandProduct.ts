import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

// Define the Prisma middleware globally
prisma.$use(async (params, next) => {
  // Check if the model is `Inventory` and the operation is `update`
  if (params.model === 'Inventory' && params.action === 'update') {
    const inventoryId = params.args.where.id;

    // Fetch the updated inventory data
    const updatedInventory = await prisma.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (updatedInventory) {
      // Update the related product stock
      await prisma.product.update({
        where: { id: updatedInventory.productId },
        data: { stock: updatedInventory.quantity },
      });
    }
  }
  // Proceed to the next middleware or operation
  return next(params);
});

// Middleware to sync inventory and product stock
const SyncInventoryandProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Move to the next middleware or route handler
  next();
};

export default SyncInventoryandProduct;
