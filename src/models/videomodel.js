import mongoose, { Schema } from "mongoose";
import mongooseAggregratePagination from "npm install mongoose-paginate-v2"

  
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,// cloudinary url
            required: true,
        },
        thumbnail: {
            type: String,// cloudinary url
            required: true,
        },
        title: {
            type: String,// cloudinary url
            required: true,
        },

        duration: {
            type: String,// cloudinary url
            required: true,
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }


    },
    {
        timestamps: true
    }
)


videoSchema.plugin(mongooseAggregratePagination)
export const Video = mongoose.model("Video", videoSchema)