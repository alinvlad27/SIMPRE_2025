export const sendOk = (res, data) => res.status(200).json(data);
export const sendCreated = (res, data) => res.status(201).json(data);
export const sendNoContent = (res) => res.status(204).end();
export const sendBadRequest = (res, message) => res.status(400).json({ message });
export const sendNotFound = (res, message) => res.status(404).json({ message });
export const sendServerError = (res, message) => res.status(500).json({ message });