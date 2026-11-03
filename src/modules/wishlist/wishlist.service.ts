import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";
import { StudiosService } from "../studios/studios.service";

export interface WishlistItem {
  _id?: ObjectId;
  userEmail: string;
  studioId: string;
  createdAt: Date;
}

export class WishlistService {
  private static collection() {
    return getDB().collection<WishlistItem>("wishlist");
  }

  static async toggleWishlist(userEmail: string, studioId: string) {
    if (!ObjectId.isValid(studioId)) {
      return { success: false, status: 400, error: "Invalid studio ID" };
    }

    const col = this.collection();
    const existing = await col.findOne({ userEmail, studioId });

    if (existing) {
      await col.deleteOne({ _id: existing._id });
      return { success: true, isWishlisted: false, message: "Removed from wishlist" };
    } else {
      await col.insertOne({
        userEmail,
        studioId,
        createdAt: new Date(),
      });
      return { success: true, isWishlisted: true, message: "Added to wishlist" };
    }
  }

  static async getUserWishlist(userEmail: string) {
    const col = this.collection();
    const items = await col.find({ userEmail }).toArray();
    const studioIds = items.map((i) => i.studioId);

    if (studioIds.length === 0) return [];

    const studiosCol = getDB().collection("studios");
    const validObjectIds = studioIds.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));

    return studiosCol.find({ _id: { $in: validObjectIds } }).toArray();
  }

  static async isStudioWishlisted(userEmail: string, studioId: string) {
    const col = this.collection();
    const existing = await col.findOne({ userEmail, studioId });
    return Boolean(existing);
  }
}
