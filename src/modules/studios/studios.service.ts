import { ObjectId, Filter } from "mongodb";
import { getDB } from "../../config/db";

export interface StudioDocument {
  _id?: ObjectId;
  name: string;
  tagline: string;
  description: string;
  category: string;
  hourlyRate: number;
  capacity: number;
  squareFeet: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  equipment: string[];
  rules: string[];
  images: string[];
  featuredImage: string;
  ownerEmail: string;
  ownerName: string;
  ownerAvatar?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudioFilterQuery {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  ownerEmail?: string;
  sortBy?: "price_asc" | "price_desc" | "rating_desc" | "newest";
  page?: number;
  limit?: number;
}

export class StudiosService {
  private static collection() {
    return getDB().collection<StudioDocument>("studios");
  }

  static async findStudios(query: StudioFilterQuery) {
    const col = this.collection();
    const filter: Filter<StudioDocument> = {};

    if (query.search) {
      const regex = new RegExp(query.search.trim(), "i");
      filter.$or = [
        { name: regex },
        { description: regex },
        { tagline: regex },
        { "location.city": regex },
        { "location.address": regex },
      ];
    }

    if (query.category && query.category !== "All") {
      filter.category = query.category;
    }

    if (query.ownerEmail) {
      filter.ownerEmail = query.ownerEmail;
    }

    if (query.capacity) {
      filter.capacity = { $gte: Number(query.capacity) };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.hourlyRate = {};
      if (query.minPrice !== undefined) filter.hourlyRate.$gte = Number(query.minPrice);
      if (query.maxPrice !== undefined) filter.hourlyRate.$lte = Number(query.maxPrice);
    }

    const sortOptions: Record<string, 1 | -1> = {};
    switch (query.sortBy) {
      case "price_asc":
        sortOptions.hourlyRate = 1;
        break;
      case "price_desc":
        sortOptions.hourlyRate = -1;
        break;
      case "rating_desc":
        sortOptions.rating = -1;
        break;
      case "newest":
      default:
        sortOptions.createdAt = -1;
        break;
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Number(query.limit) || 12);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      col.find(filter).sort(sortOptions).skip(skip).limit(limit).toArray(),
      col.countDocuments(filter),
    ]);

    return {
      studios: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  static async getFeaturedStudios(limit = 6) {
    const col = this.collection();
    return col
      .find({
        $or: [{ isFeatured: true }, { rating: { $gte: 4.8 } }],
      })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(limit)
      .toArray();
  }

  static async getStudioById(id: string) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const col = this.collection();
    return col.findOne({ _id: new ObjectId(id) });
  }

  static async createStudio(data: Omit<StudioDocument, "_id" | "createdAt" | "updatedAt">) {
    const col = this.collection();
    const now = new Date();
    const doc: StudioDocument = {
      ...data,
      rating: data.rating || 5.0,
      reviewCount: data.reviewCount || 0,
      createdAt: now,
      updatedAt: now,
    };
    const result = await col.insertOne(doc);
    return { ...doc, _id: result.insertedId };
  }

  static async updateStudio(
    id: string,
    data: Partial<StudioDocument>,
    ownerEmail: string
  ) {
    if (!ObjectId.isValid(id)) {
      return { success: false, status: 400, error: "Invalid studio ID format" };
    }

    const col = this.collection();
    const studio = await col.findOne({ _id: new ObjectId(id) });
    if (!studio) {
      return { success: false, status: 404, error: "Studio not found" };
    }

    // Ownership Guard
    if (studio.ownerEmail !== ownerEmail) {
      return {
        success: false,
        status: 403,
        error: "Forbidden: You are not authorized to update this studio",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, ...updateFields } = data;
    const updated = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateFields,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return { success: true, studio: updated };
  }

  static async deleteStudio(id: string, ownerEmail: string) {
    if (!ObjectId.isValid(id)) {
      return { success: false, status: 400, error: "Invalid studio ID format" };
    }

    const col = this.collection();
    const studio = await col.findOne({ _id: new ObjectId(id) });
    if (!studio) {
      return { success: false, status: 404, error: "Studio not found" };
    }

    // Ownership Guard
    if (studio.ownerEmail !== ownerEmail) {
      return {
        success: false,
        status: 403,
        error: "Forbidden: You are not authorized to delete this studio",
      };
    }

    await col.deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  }

  static async updateRating(studioId: string, newRating: number) {
    if (!ObjectId.isValid(studioId)) return;
    const col = this.collection();
    const studio = await col.findOne({ _id: new ObjectId(studioId) });
    if (!studio) return;

    const currentCount = studio.reviewCount || 0;
    const currentRating = studio.rating || 5.0;
    const newCount = currentCount + 1;
    const calculated = (currentRating * currentCount + newRating) / newCount;
    const roundedRating = Math.round(calculated * 10) / 10;

    await col.updateOne(
      { _id: new ObjectId(studioId) },
      {
        $set: {
          rating: roundedRating,
          reviewCount: newCount,
          updatedAt: new Date(),
        },
      }
    );
  }
}
