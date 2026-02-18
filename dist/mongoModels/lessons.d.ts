import mongoose from "mongoose";
import { type lessonsDocument } from "../types/mongo.ts";
export declare const Lesson: mongoose.Model<lessonsDocument, {}, {}, {}, mongoose.Document<unknown, {}, lessonsDocument, {}, mongoose.DefaultSchemaOptions> & lessonsDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, lessonsDocument>;
//# sourceMappingURL=lessons.d.ts.map