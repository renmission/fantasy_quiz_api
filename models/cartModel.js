const mongoose = require('mongoose');
// const slugify = require('slugify');

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, 'A title must have a title'],
        unique: true,
        trim: true,
        // maxlength: [40, 'A title title must have less or equal then 40 characters'],
        // minlength: [10, 'A title title must have more or equal then 10 characters']
    },
    rating: [{
        rate: Number,
        count: Number,
    }],
    price: {
        type: Number,
        // required: [true, 'A cart must have a price']
    },
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
cartSchema.index({ price: 1, ratingsAverage: -1 });
cartSchema.index({ slug: 1 });
cartSchema.index({ startLocation: '2dsphere' });

cartSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});


// virtual populate
cartSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'cart',
    localField: '_id'
});

// document middleware: run before .save() and .create()
// slugify
// cartSchema.pre('save', function(next) {
//     this.slug = slugify(this.title, { lower: true });
//     next();
// });

// query middleware
// cartSchema.pre(/^find/, function(next) {
//     this.find({ secretTour: { $ne: true } });

//     this.start = Date.now();
//     next();
// });

// cartSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'guides',
//         select: '-__v -passwordChangedAt'
//     });

//     next();
// });

// embedded data
// cartSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// cartSchema.post(/^find/, function(next) {
//     console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//     next();
// });

// cartSchema.pre('aggregate', function(next) {
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//     console.log(this.pipeline());
//     next();
// });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;