const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://puredesire:HjPTTQuiGIjPa8Ol@puredesire.aaufor2.mongodb.net/dev?retryWrites=true&w=majority';

exports.handler = async function(event, context) {
    console.log(event);
    console.log(event.callerContext.clientId);
    console.log(event.userName);
    const email = event.request.userAttributes.email;
    // Make sure to add this so you can re-use `conn` between function calls.
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    context.callbackWaitsForEmptyEventLoop = false;

    // Because `conn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (conn == null) {
        conn = mongoose.createConnection(uri, {
            // and tell the MongoDB driver to not wait more than 5 seconds
            // before erroring out if it isn't connected
            serverSelectionTimeoutMS: 5000
        });

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await conn.asPromise();

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

        console.log(email);
        const User = mongoose.model("user", userSchema);

        console.log(User);


        conn.model('User', userSchema);

        const M = conn.model('User');
        const existingUser = await M.findOne({ email });
        if (!existingUser){
            console.log('User does not exist');
            const newUser = new User({
                email,
                role: 'user',
            });
            const savedUser = await newUser.save();
            console.log('here 321');
        }
        else{
            console.log('User exist');
        }

        console.log('here 123');



        // callback(null, event);
    }
    // const M = conn.model('Test');
    //
    // const doc = await M.findOne();
    // console.log(doc);
    //
    return true;
};
