import mongoose from "mongoose";
import ConnectDB from "./database";
ConnectDB();
const NoteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    bg: String,
    date: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Note = mongoose.models.Notes || mongoose.model("Notes", NoteSchema);

export default Note;
