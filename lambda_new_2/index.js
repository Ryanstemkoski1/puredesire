// Import the MongoDB driver
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

// Define our connection string. Info on where to get this will be described below. In a real world application you'd want to get this string from a key vault like AWS Key Management, but for brevity, we'll hardcode it in our serverless function here.
const MONGODB_URI =
    "mongodb+srv://puredesire:HjPTTQuiGIjPa8Ol@puredesire.aaufor2.mongodb.net/dev?retryWrites=true&w=majority";

// Once we connect to the database once, we'll store that connection and reuse it so that we don't have to connect to the database on every request.
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    // Connect to our MongoDB database hosted on MongoDB Atlas
    const client = await MongoClient.connect(MONGODB_URI);

    // Specify which database we want to use
    const db = await client.db("dev");

    cachedDb = db;
    return db;
}

exports.handler = async (event, context, callback) => {

    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
    context.callbackWaitsForEmptyEventLoop = false;

    // Get an instance of our database
    const db = await connectToDatabase();

    const email = event.request.userAttributes.email;

    // Make a MongoDB MQL Query to go into the movies collection and return the first 20 movies.
    // const movies = await db.collection("movies").find({}).limit(20).toArray();

    const existingUser = await db.collection("users").findOne({ email });
    if (!existingUser){
        console.log('User does not exist');

        const userSchema = new mongoose.Schema({
            email: { type: String, required: true },
            role: { type: String },
            name: { type: String },
            orders: [{
                order_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Order"},
            }],
            groups: [{
                group_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Group"},
                is_admin: { type: Boolean, default: false },
            }],
            organizations: [{
                organization_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Organization"},
                is_admin: { type: Boolean, default: false },
            }],
            workbooks: [{
                workbook_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Workbook"},
                overall_progress: { type: Number },
                items: [{
                    item_id:  {type: mongoose.Schema.Types.ObjectId, ref:"WorkbookItem"},
                    user_item_id:  {type: mongoose.Schema.Types.ObjectId, ref:"UserWorkbookItem"},
                    title: { type: String }, //redundant title to speed up calls
                }],
            }]
        }, { timestamps: true });
        const User = mongoose.model("user", userSchema);

        const newUser = new User({
            email,
            role: 'user'
        });
        const result = await db.collection("users").insertOne(newUser);
        // const response = {
        //     statusCode: 200,
        //     body: JSON.stringify(result),
        // };
    }
    else{
        console.log('User exist');
    }



    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify(movies),
    // };

    callback(null, event);
};