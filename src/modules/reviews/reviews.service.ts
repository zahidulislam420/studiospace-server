import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";
import { StudiosService } from "../studios/studios.service";

export interface ReviewDocument {
  _id?: ObjectId;
  studioId: string;
  userEmail: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: Date;
}

export class ReviewsService {
  private static collection() {
    return getDB().collection<ReviewDocument>("reviews");
  }

  static async getReviewsByStudio(studioId: string) {
    const col = this.collection();
    return col.find({ studioId }).sort({ createdAt: -1 }).toArray();
  }

  static async addReview(data: {
    studioId: string;
    userEmail: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
  }) {
    if (!ObjectId.isValid(data.studioId)) {
      return { success: false, status: 400, error: "Invalid studio ID" };
    }

    const studio = await StudiosService.getStudioById(data.studioId);
    if (!studio) {
      return { success: false, status: 404, error: "Studio not found" };
    }

    const col = this.collection();
    const doc: ReviewDocument = {
      ...data,
      rating: Math.min(5, Math.max(1, Number(data.rating))),
      createdAt: new Date(),
    };

    const result = await col.insertOne(doc);

    // Recalculate studio rating
    await StudiosService.updateRating(data.studioId, doc.rating);

    return { success: true, review: { ...doc, _id: result.insertedId } };
  }
}
