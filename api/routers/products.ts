import express from 'express';
import {imagesUpload} from "../middleware/multer";
import {Error} from "mongoose";
import Product from "../models/Product";
import auth, {RequestWithUser} from "../middleware/auth";

const productRouter = express.Router();

productRouter.put('/:id', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Product id must be in req params'});
            return;
        }

        const updateProduct = {...req.body};

        if (req.file) {
            updateProduct.image = 'images/' + req.file.filename;
        }

        const product = await Product.findOneAndReplace({_id: id}, updateProduct, {runValidators: true, new: true});

        if (!product) {
            res.status(404).send({error: 'Product not found'});
            return;
        }

        await product.save();
        res.send(product);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
})

productRouter.patch('/:id', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Product id must be in req params'});
            return;
        }

        const updateProduct = {...req.body};

        if (req.file) {
            updateProduct.image = 'images/' + req.file.filename;
        }

        const product = await Product.findByIdAndUpdate(id, updateProduct, {new: true, runValidators: true});

        if (!product) {
            res.status(404).send({error: 'Product not found'});
            return;
        }

        await product.save();
        res.send(product);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

productRouter.get('/', async (req, res, next) => {
    try {
        const category_id = req.query.category as string;
        const filter: {category?: string} = {};

        if (category_id) filter.category = category_id;

        const products = await Product.find(filter).populate("category", "title");
        res.send(products);
    } catch (e) {
        next(e);
    }
});


productRouter.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'title description')
            .populate('seller', 'displayName phoneNumber');

        if (!product) {
            res.status(404).send({message: 'Product not found'});
            return;
        }

        res.send(product);
    } catch (e) {
        next(e);
    }
});

productRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).send({ error: 'Image is required.' });
        return;
    }

    try {
        const user = (req as RequestWithUser).user;

        const newProduct = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: 'images/' + req.file.filename,
            seller: user._id,
        };

        const product = new Product(newProduct);
        await product.save();
        res.send(product);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

productRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }

        if (product.seller.toString() !== user._id.toString()) {
            res.status(403).send({ message: 'Forbidden: not the owner of product' });
            return;
        }

        await Product.deleteOne({ _id: req.params.id });
        res.send({ message: 'Product deleted successfully' });
    } catch (e) {
        next(e);
    }
});

export default productRouter;