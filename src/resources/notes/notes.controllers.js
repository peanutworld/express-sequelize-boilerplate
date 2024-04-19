import Note from "../../db/models/Note.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllNotes = tryCatchWrapper(async function (req, res, next) {
  const notes = await Note.findAll();
  if (!notes.length) return res.status(200).json({ message: "Empty list" });

  return res.status(200).json(notes);
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleNote = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await Note.findByPk(id);
  if (!note) return next(createCustomError("Note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createNote = tryCatchWrapper(async function (req, res, next, t) {
  const { title, contents } = req.body;

  if (!title || !contents)
    return next(createCustomError("All fields are required", 400));

  await Note.create({ title, contents }, { transaction: t });

  return res.status(201).json({ message: "Note has been created" });
}, true);

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateNote = tryCatchWrapper(async function (req, res, next, t) {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!id || !title || !contents)
    return next(createCustomError("All fields are required", 400));

  const note = await Note.findByPk(id, { transaction: t });
  if (!note) return next(createCustomError("Note not found", 404));

  await note.update({ title, contents }, { transaction: t });

  return res.status(201).json({ message: "Note has been updated" });
}, true);

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteNote = tryCatchWrapper(async function (req, res, next, t) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await Note.findByPk(id, { transaction: t });
  if (!note) return next(createCustomError("Note not found", 404));

  await note.destroy({ transaction: t });

  return res.status(200).json({ message: "Note has been deleted" });
}, true);
