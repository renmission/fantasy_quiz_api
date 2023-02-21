const mongoose = require('mongoose');
// const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
    },
    rating: [{
        rate: Number,
        count: Number,
    }],
    price:  Number,
    image: String,
    category: String,
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// increase read performace
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });
productSchema.index({ startLocation: '2dsphere' });

productSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});


// virtual populate
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});

// document middleware: run before .save() and .create()
// slugify
// productSchema.pre('save', function(next) {
//     this.slug = slugify(this.title, { lower: true });
//     next();
// });

// query middleware
// productSchema.pre(/^find/, function(next) {
//     this.find({ secretTour: { $ne: true } });

//     this.start = Date.now();
//     next();
// });

// productSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'guides',
//         select: '-__v -passwordChangedAt'
//     });

//     next();
// });

// embedded data
// productSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// productSchema.post(/^find/, function(next) {
//     console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//     next();
// });

// productSchema.pre('aggregate', function(next) {
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//     console.log(this.pipeline());
//     next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;