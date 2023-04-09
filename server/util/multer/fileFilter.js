const fileFilter = (req, file, cb) => {
    cb(null, ['audio/mpeg'].includes(file.mimetype));
};

export default fileFilter;
