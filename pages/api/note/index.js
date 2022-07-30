import Note from "../../../utils/noteModel";

const findUAid = (header) => {
  let idIndex = 7;
  for (let i = 0; i < header.length; i++) {
    if (header[i] === "User-Agent") {
      idIndex = i + 1;
      break;
    }
  }
  return idIndex;
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allNote = await Note.find().sort({ updated_at: -1 });
      console.log("Data fetched...");

      console.log("IP :", req.rawHeaders[1]);
      console.log("UA :", req.rawHeaders[findUAid(req.rawHeaders)]);
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
