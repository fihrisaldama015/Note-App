import Note from "../../../utils/noteModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allNote = await Note.find().sort({ updated_at: -1 });
      console.log("Data fetched...");
      res.status(200).json(allNote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "BAD REQUEST" });
    }
  } else if (req.method === "POST") {
    const note = new Note(req.body);
    try {
      const addedNote = await note.save();
      console.log("Added : " + (await addedNote));
      res.status(201).json(addedNote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "BAD REQUEST" });
    }
  }
}
