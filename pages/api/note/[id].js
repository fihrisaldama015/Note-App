import Note from "../../../utils/noteModel";

const GetNoteById = async (req, res) => {
  const id = req.query.id;
  console.log(req.method);
  if (req.method === "GET") {
    try {
      const selectedNote = await Note.findById(id);
      res.status(200).json(selectedNote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "SAD" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      console.log("deleted :" + deletedNote);
      res.status(200).json({ status: "DELETE SUCCESS", data: deletedNote });
    } catch (error) {
      console.log(error.message);
      console.log("SO SADD 2");
      res.status(400).json({ status: "BAD DELETE REQUEST" });
    }
  } else if (req.method === "PATCH") {
    try {
      const updatedNote = await Note.findByIdAndUpdate(id, req.body);
      console.log("updated : " + updatedNote);
      res.status(200).json({ status: "UPDATED", note_updated: updatedNote });
    } catch (error) {
      res.status(400).json({ status: "Failed", message: error.message });
    }
  }
};

export default GetNoteById;
