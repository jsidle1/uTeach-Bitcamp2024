// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';

// Set up storage using multer's diskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this folder exists in your project directory.
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
});

const upload = multer({ storage: storage });

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.fields([{ name: 'pptFile', maxCount: 1 }, { name: 'audioFile', maxCount: 1 }]));

apiRoute.post((req, res) => {
    console.log(req.files); // You'll see the file details logged here.
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
});

export default apiRoute;
export const config = {
    api: {
        bodyParser: false, // Disabling body parsing because we're handling it with multer
    },
};

