const puppeteer = require('puppeteer'); 
const Product = require('../models/Product');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 

    
        const mostRecentProducts = products.slice(-4).reverse();

        const mostVisitedProducts = products
            .sort((a, b) => b.priceHistory.length - a.priceHistory.length)
            .slice(0, 4);

        const mostRatedProducts = products
            .sort((a, b) => parseFloat(b.overallReview) - parseFloat(a.overallReview))
            .slice(0, 4);

        res.json({
            mostRecent: mostRecentProducts,
            mostVisited: mostVisitedProducts,
            mostRated: mostRatedProducts,
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Error fetching products' });
    }
};
const getProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
        try {
            const product = await Product.findById(id);
    
            if (!product) {
                return res.status(404).json({ error: 'Product not found.' });
            }
    
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch product.' });
        }

    
};
const getProductByTitle = async (req, res) => {
    const { title } = req.query;
    try {
        const products = await Product.find({ title: { $regex: title, $options: 'i' } }); 
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};



const fetchFlipkartProduct = async (url) => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const navigationPromise = page.waitForNavigation();

        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        );
        
        const response = await page.goto(url, {
          waitUntil: "networkidle2",
        });
        
        await navigationPromise;
        
        if (!response) {
          await page.close();
          return { status: 400, content: "" };
        }
        
        await page.waitForSelector("span.VU-ZEz");

        const title = await page.$eval('span.VU-ZEz', el => el.innerText);
        const price = await page.$eval('div.Nx9bqj.CxhGGd', el => el.innerText.replaceAll('₹', '').replaceAll(',', ''));
        const description = await page.$eval('div.Xbd0Sd', el => el.innerText);
        const imageUrl = await page.$eval('img.DByuf4.IZexXJ.jLEJ7H', el => el.src);
        const overallReview = await page.$eval('div.XQDdHH', el => el.innerText);

        return {
            title,
            price: parseFloat(price),
            description,
            imageUrl,
            overallReview,
        };
    } catch (error) {
        console.error('Error fetching product data:', error.message);
        throw new Error('Unable to fetch product data. Please check the provided URL.');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

const getProductDetails = async (req, res) => {
    const { url } = req.body;

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
        return res.status(400).json({ error: 'Invalid URL provided.' });
    }

    try {
        const productData = await fetchFlipkartProduct(url);
        let product = await Product.findOne({ url });

        if (!product) {
            product = new Product({
                url,
                title: productData.title,
                description: productData.description,
                imageUrl: productData.imageUrl,
                currentPrice: productData.price,
                priceHistory: [{ price: productData.price, date: new Date() }],
                overallReview: productData.overallReview,
            });
        } else {
            product.priceHistory.push({ price: productData.price, date: new Date() });
            product.overallReview = productData.overallReview;
        }

        await product.save();
        res.json(product);
    } catch (error) {
        console.error('Error in getProductDetails:', error.message);
        res.status(500).json({ error: error.message });
    }
   
    
    
};


module.exports = {
    getAllProducts,
    getProductDetails,
    getProduct,
    getProductByTitle
};
